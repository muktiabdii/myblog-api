import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getProfile(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: 'success',
      message: 'Profile retrieved successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.usersRepository.updateById(
      userId,
      updateUserDto,
    );

    return {
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
      },
    };
  }

  async deleteProfile(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.deleteById(userId);

    return {
      status: 'success',
      message: 'Profile deleted successfully',
    };
  }
}
