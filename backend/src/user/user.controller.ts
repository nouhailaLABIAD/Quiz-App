// src/user/user.controller.ts
import {
    Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request
  } from '@nestjs/common';
  import { UserService } from './user.service';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }
  
    @Post()
    create(@Body() body: any) {
      return this.userService.create(body);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
      return this.userService.update(id, body);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(id);
    }
  }
  