import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepo.find();
  }

  create(employee: Partial<Employee>): Promise<Employee> {
    const newEmp = this.employeeRepo.create(employee);
    return this.employeeRepo.save(newEmp);
  }
}