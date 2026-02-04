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
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
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
          id: 'abc123',
          title: 'My First Blog',
          content: 'This is the content of my first blog.',
          authorId: 1,
          createdAt: '2024-01-01T00:00:00.000Z',
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
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Blogs retrieved successfully',
        data: [
          {
            id: 'abc123',
            title: 'My First Blog',
            content: 'This is the content of my first blog.',
            authorId: {
              id: 1,
              name: 'Mukti Abdi Syukur',
            },
            createdAt: '2024-01-01T00:00:00.000Z',
          },
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
          id: 'abc123',
          title: 'My First Blog',
          content: 'This is the content of my first blog.',
          authorId: {
            id: 1,
            name: 'Mukti Abdi Syukur',
            email: 'muktiabdi@example.com',
          },
          createdAt: '2024-01-01T00:00:00.000Z',
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
          id: 'abc123',
          title: 'My Updated Blog',
          content: 'Updated content of the blog',
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
