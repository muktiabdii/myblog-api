import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateById(
    id: string,
    data: { name?: string; email?: string; password?: string },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
