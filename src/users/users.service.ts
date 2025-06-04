import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Ethan Ramirez',
      email: 'ethan.ramirez@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Julian Parker',
      email: 'julian.parker@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Sofia Nguyen',
      email: 'sofia.nguyen@example.com',
      role: 'DEVELOPER',
    },
    {
      id: 5,
      name: 'Liam Patel',
      email: 'liam.patel@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'DEVELOPER') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);

      if (roleArray.length === 0) {
        throw new NotFoundException(`No users found with role: ${role}`);
      }
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUserDto,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
