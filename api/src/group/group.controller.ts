import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {GroupService} from "./group.service";
import {CreateGroupDto, UpdateGroupDto} from "./group.dto";
import {GroupRoleGuard} from "./guards/group-role.guard";
import {GroupRoles} from "./group-role.decorator";
import { GroupUserRole } from '@prisma/client';

@Controller('groups')
export class GroupController {
    constructor(private readonly groupService: GroupService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createGroup(@Request() req, @Body() args: CreateGroupDto) {
        return this.groupService.createGroup(req.user.userId, args);
    }

    @Get('id/:id')
    async findGroupById(@Param('id', new ParseIntPipe()) id) {
        return this.groupService.findOneGroup({
            id: id
        });
    }

    @Get('name/:name')
    async findGroupByName(@Param('name') name) {
        return this.groupService.findOneGroup({
            name: name
        });
    }

    @Put()
    @GroupRoles(GroupUserRole.admin)
    @UseGuards(JwtAuthGuard, GroupRoleGuard)
    async updateGroup(@Body() args: UpdateGroupDto) {
        return this.groupService.updateGroup(args);
    }

    @Delete(':id')
    @GroupRoles(GroupUserRole.admin)
    @UseGuards(JwtAuthGuard, GroupRoleGuard)
    async deleteGroup(@Param('id', new ParseIntPipe()) id: number) {
        return this.groupService.deleteGroup(id);
    }

}
