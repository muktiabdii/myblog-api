import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog';
import { UpdateBlogDto } from './dto/update-blog';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Blogs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        status: 'success',
        message: 'Blog created successfully',
        data: {
          id: 'blog_id',
          title: 'blog_title',
          content: 'blog_content',
          authorId: 'blog_author_id',
          createdAt: 'blog_creation_date',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        status: 'error',
        message: 'Validation failed',
      },
    },
  })
  async createBlog(
    @CurrentUser() user: any,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this.blogsService.createBlog(user.userId, createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blogs with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Blogs retrieved successfully',
        data: [
          {
            id: 'blog_id_1',
            title: 'blog_title_1',
            content: 'blog_content_1',
            authorId: {
              id: 'blog_author_id_1',
              name: 'blog_author_name_1',
            },
            createdAt: 'blog_creation_date_1',
          },
          {
            id: 'blog_id_2',
            title: 'blog_title_2',
            content: 'blog_content_2',
            authorId: {
              id: 'blog_author_id_2',
              name: 'blog_author_name_2',
            },
            createdAt: 'blog_creation_date_2',
          }
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 35,
          totalPages: 4,
          hasNext: true,
          hasPrev: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        status: 'error',
        message: 'Invalid pagination parameters',
      },
    },
  })
  async getAllBlogs(@Query('page', ParseIntPipe) page = 1) {
    return this.blogsService.getAllBlogs(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single blog by ID' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Blog retrieved successfully',
        data: {
          id: 'blog_id',
          title: 'blog_title',
          content: 'blog_content',
          authorId: {
            id: 'blog_author_id',
            name: 'blog_author_name',
            email: 'blog_author_email@example.com',
          },
          createdAt: 'blog_creation_date',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        status: 'error',
        message: 'Blog not found',
      },
    },
  })
  async getBlogById(@Param('id') id: string) {
    return this.blogsService.getBlogById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog by ID' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Blog updated successfully',
        data: {
          id: 'blog_id',
          title: 'blog_title',
          content: 'blog_content',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        status: 'error',
        message: 'Blog not found',
      },
    },
  })
  async updateBlog(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogsService.updateBlog(user.userId, id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Blog deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        status: 'error',
        message: 'Blog not found',
      },
    },
  })
  async deleteBlog(@CurrentUser() user: any, @Param('id') id: string) {
    return this.blogsService.deleteBlog(user.userId, id);
  }
}
