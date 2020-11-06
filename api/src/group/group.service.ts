import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { Group, GroupUserRole, GroupWhereUniqueInput, GroupUser } from '@prisma/client';
import {UniqueConstraintFailedException} from "../prisma/exceptions/exceptions";
import {CreateGroupDto, UpdateGroupDto} from "./group.dto";

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

    async getGroupUser(groupId: number, userId: number) : Promise<GroupUser> {
        return this.prisma.groupUser.findOne({
            where: {
                groupId_userId: {
                    groupId: groupId,
                    userId: userId
                }
            }
        })
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

    async findGroupsByQuery(searchQuery: string) : Promise<Group[]>{
        return  this.prisma.group.findMany({
            where: {
                OR: {
                    title: {
                        contains: searchQuery
                    },
                    description: {
                        contains: searchQuery
                    },
                    name: {
                        contains: searchQuery
                    }
                }
            }
        })
    }

    async updateGroup({id, ...args}: UpdateGroupDto): Promise<Group> {
        return this.prisma.group.update({
            where: {
                id: id
            },
            data: {
                ...args
            }

        })
    }

    async deleteGroup(id: number): Promise<Group>{
        //todo: delete all group posts


        return this.prisma.group.delete({
            where: {
                id: id
            }
        })
    }
}
