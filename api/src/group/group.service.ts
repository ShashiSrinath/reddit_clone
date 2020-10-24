import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateGroupDto} from "./dto/create-group.dto";
import { Group, GroupUserRole, GroupWhereUniqueInput } from '@prisma/client';
import {UniqueConstraintFailedException} from "../prisma/exceptions/exceptions";

@Injectable()
export class GroupService {
    constructor(private readonly prisma: PrismaService) {
    }

    async createGroup(userId: number, args: CreateGroupDto) : Promise<Group>{
        try {
            return await this.prisma.group.create({
                data: {
                    ...args,
                    users: {
                        create: {
                            role: GroupUserRole.admin,
                            user: {
                                connect: {
                                    id: userId
                                }
                            }
                        }
                    }
                }
            });
        }catch (e) {
            if (e.code === 'P2002') {
                throw new UniqueConstraintFailedException(e.message, e.meta);
            } else {
                throw e;
            }
        }
    }

    async findOneGroup(args: GroupWhereUniqueInput): Promise<Group> {
        const group = await this.prisma.group.findOne({
            where: args
        });
        if (!group){
            throw new NotFoundException('Group not found');
        }
        return group;
    }
}
