import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog';
import { UpdateBlogDto } from './dto/update-blog';

@Injectable()
export class BlogsRepository {
  constructor(private prisma: PrismaService) {}

  async createBlog(userId: string, data: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
      },
    });
  }

  async findAllBlogs(skip: number, take: number) {
    const [blogs, total] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.blog.count(),
    ]);

    return {
      blogs,
      total,
    };
  }

  async findBlogById(id: string) {
    return this.prisma.blog.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async updateBlogById(id: string, data: { title?: string; content?: string }) {
    return this.prisma.blog.update({
      where: { id },
      data,
    });
  }

  async deleteBlogById(id: string) {
    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
