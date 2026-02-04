import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog';
import { UpdateBlogDto } from './dto/update-blog';

@Injectable()
export class BlogsService {
  constructor(private blogsRepository: BlogsRepository) {}

  // Create a new blog
  async createBlog(userId: string, createblogDto: CreateBlogDto) {
    const blog = await this.blogsRepository.createBlog(userId, createblogDto);
    return {
      status: 'success',
      message: 'Blog created successfully',
      data: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        authorId: blog.authorId,
        createdAt: blog.createdAt,
      },
    };
  }

  // Get all blogs with pagination
  async getAllBlogs(page = 1) {
    const limit = 10;

    const skip = (page - 1) * limit;

    const { blogs, total } = await this.blogsRepository.findAllBlogs(
      skip,
      limit,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      status: 'success',
      message: 'Blogs retrieved successfully',
      data: blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        author: {
          id: blog.author.id,
          name: blog.author.name,
        },
        createdAt: blog.createdAt,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  // Get a single blog by ID
  async getBlogById(id: string) {
    const blog = await this.blogsRepository.findBlogById(id);

    if (!blog) throw new NotFoundException('Blog not found');

    return {
      status: 'success',
      message: 'Blog retrieved successfully',
      data: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        authorId: {
          id: blog.author.id,
          name: blog.author.name,
          email: blog.author.email,
        },
        createdAt: blog.createdAt,
      },
    };
  }

  // Update a blog by ID
  async updateBlog(userId: string, blogId: string, data: UpdateBlogDto) {
    const blog = await this.blogsRepository.findBlogById(blogId);

    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.authorId !== userId)
      throw new ForbiddenException('You are not allowed to update this blog');

    const updated = await this.blogsRepository.updateBlogById(blogId, data);
    return {
      status: 'success',
      message: 'Blog updated successfully',
      data: {
        id: updated.id,
        title: updated.title,
        content: updated.content,
      },
    };
  }

  // Delete a blog by ID
  async deleteBlog(userId: string, blogId: string) {
    const blog = await this.blogsRepository.findBlogById(blogId);

    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.authorId !== userId)
      throw new ForbiddenException('You are not allowed to delete this blog');

    await this.blogsRepository.deleteBlogById(blogId);
    return {
      status: 'success',
      message: 'Blog deleted successfully',
    };
  }
}
