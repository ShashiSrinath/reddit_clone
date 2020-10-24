import {Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateGroupDto} from "./dto/create-group.dto";
import {GroupService} from "./group.service";

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


}
