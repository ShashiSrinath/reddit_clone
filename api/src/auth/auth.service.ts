import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserWithoutPassword } from '../user/interfaces/user-without-password';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserWithoutPassword | null> {
    try {
      const user = await this.usersService.findOne({
        where: {
          username: username,
        },
      });

      //validating
      if (user) {
        const { password: hashedPassword, ...result } = user;
        const isValid = await bcrypt.compare(password, hashedPassword);
        if (isValid) {
          return result as UserWithoutPassword;
        }
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      id: user.id,
      karma: user.karma,
    };
  }
}
