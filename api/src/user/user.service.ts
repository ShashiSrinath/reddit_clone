import {Injectable, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from "../prisma/prisma.service";
import {FindOneUserArgs, User, UserRole} from '@prisma/client';
import {RegisterLocalDto} from "./dto/register.local.dto";
import {ConfirmPasswordMismatchException, InvalidPasswordException} from "./exceptions/exceptions";
import {UniqueConstraintFailedException} from "../prisma/exceptions/exceptions";
import {UserWithoutPassword} from "./interfaces/user-without-password";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {ChangeEmailDto} from "./dto/change-email.dto";
import {UpdateUserDto} from "./dto/update-user.dto";


@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {
    }

    private async _createUser(args: RegisterLocalDto, role: UserRole): Promise<UserWithoutPassword> {

        if (args.password !== args.password2) {
            throw new ConfirmPasswordMismatchException();
        }

        //hash the password
        const hash = await bcrypt.hash(args.password, 10);

        try {
            const {password, ...user} = await this.prisma.user.create({
                data: {
                    username: args.username,
                    email: args.email,
                    password: hash,
                    role: role,
                    karma: 0,
                }
            });
            return user as UserWithoutPassword;
        } catch (e) {
            if (e.code === 'P2002') {
                throw new UniqueConstraintFailedException(e.message, e.meta);
            } else {
                throw e;
            }
        }
    }

    async createLocalUser(args: RegisterLocalDto): Promise<UserWithoutPassword> {
        return this._createUser(args, UserRole.user);
    }

    async createLocalAdmin(args: RegisterLocalDto): Promise<UserWithoutPassword> {
        return this._createUser(args, UserRole.administrator);
    }

    async findOne(args: FindOneUserArgs): Promise<User | undefined> {
        const user = await this.prisma.user.findOne(args);
        if (user) {
            return user;
        } else {
            throw new NotFoundException('User not found');
        }
    }

    async changePassword(id: number, args: ChangePasswordDto): Promise<{ message: string }> {

        //check if passwords are matching
        if (args.password !== args.password2) {
            throw new ConfirmPasswordMismatchException();
        }

        const user = await this.prisma.user.findOne({
            where: {
                id: id
            }
        })

        //compare password with hash
        const isValid = await bcrypt.compare(args.oldPassword, user.password);

        if (isValid) {
            //hash the new password
            const hash = await bcrypt.hash(args.password, 10);

            await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    password: hash
                }
            });

            return {message: 'Password changed successfully'}
        } else {
            throw new InvalidPasswordException();
        }
    }

    async changeEmail(id: number, args: ChangeEmailDto): Promise<{ message: string }> {
        const user = await this.prisma.user.findOne({
            where: {
                id: id
            }
        })

        //compare password with hash
        const isValid = await bcrypt.compare(args.password, user.password);

        if (isValid) {
            try {
                await this.prisma.user.update({
                    where: {
                        id: id
                    },
                    data: {
                        email: args.email,
                        emailVerified: false
                    }
                });

                return {message: 'Email changed successfully'}
            }catch (e) {
                if (e.code === 'P2002') {
                    throw new UniqueConstraintFailedException(e.message, e.meta);
                } else {
                    throw e;
                }
            }
        } else {
            throw new InvalidPasswordException();
        }
    }


    async updateUser(args: UpdateUserDto): Promise<UserWithoutPassword> {
        const {id, ...newData} = args;
        try {
            const {password, ...user} = await this.prisma.user.update({
                where: {
                    id: id,
                },
                data: newData
            });
            return user as UserWithoutPassword;
        } catch (e) {
            if (e.code === 'P2002') {
                throw new UniqueConstraintFailedException(e.message, e.meta);
            } else {
                throw e;
            }
        }
    }

    async deleteUser(id: number): Promise<{ message: string }> {
        //todo: delete posts
        //todo: delete comments
        await this.prisma.user.delete({
            where: {
                id: id
            }
        });
        return {message: `User with id: ${id} deleted successfully`}
    }

}
