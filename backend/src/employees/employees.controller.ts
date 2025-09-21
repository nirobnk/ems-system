import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeesService } from './employees.services';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; role: string }) {
    return this.employeesService.create(body);
  }
}