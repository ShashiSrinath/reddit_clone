import {
    Body,
    Controller, Delete,
    Get,
    Param,
    ParseIntPipe,
    Post, Put,
    Request,
    UseGuards
} from '@nestjs/common';
import {UserRole} from '@prisma/client';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {UserService} from './user.service';
import {RegisterLocalDto} from "./dto/register.local.dto";
import {RoleGuard} from "../auth/guards/role.guard";
import {Roles} from "../auth/auth-role.decorator";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {ChangeEmailDto} from "./dto/change-email.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {
    }

    @Post('register')
    async registerLocalUser(@Body() args: RegisterLocalDto) {
        return await this.usersService.createLocalUser(args);
    }

    @Post('register-admin')
    @Roles(UserRole.administrator)
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    async registerLocalAdmin(@Body() args: RegisterLocalDto) {
        return await this.usersService.createLocalAdmin(args);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.usersService.findOne({
            where: {
                id: req.user.userId
            },
            select: {
                id: true,
                username: true,
                karma: true,
                role: true,
                posts: true
            }
        });

    }

    @Get('id/:id')
    async getUser(@Param('id', new ParseIntPipe()) id: number) {
        return await this.usersService.findOne({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                karma: true,
                posts: true
            }
        });

    }

    @Put('change_password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Request() req, @Body() args: ChangePasswordDto) {
            return await this.usersService.changePassword(req.user.userId, args);
    }

    @Put('change_email')
    @UseGuards(JwtAuthGuard)
    async changeEmail(@Request() req, @Body() args: ChangeEmailDto) {
        return this.usersService.changeEmail(req.user.userId, args);
    }


    @Put()
    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.administrator)
    async updateUser(@Body() args: UpdateUserDto) {
        return this.usersService.updateUser(args);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    async deleteCurrentUser(@Request() req) {
        return this.usersService.deleteUser(req.user.userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.administrator)
    async deleteUserById(@Param('id',new ParseIntPipe()) id) {
        return this.usersService.deleteUser(id);
    }
}
