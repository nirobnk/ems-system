import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.services';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './employee.entity';

describe('EmployeesService', () => {
  let service: EmployeesService;

  const mockEmployeeRepo = {
    find: jest.fn().mockResolvedValue([
      { id: 1, name: 'Alice', role: 'Developer' },
      { id: 2, name: 'Bob', role: 'Tester' },
    ]),
    create: jest.fn((dto) => dto),
    save: jest.fn((employee) => Promise.resolve({ id: 1, ...employee })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: getRepositoryToken(Employee), useValue: mockEmployeeRepo },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should return all employees', async () => {
    const employees = await service.findAll();
    expect(employees.length).toBe(2);
    expect(employees[0].name).toBe('Alice');
  });

  it('should create a new employee', async () => {
    const newEmp = await service.create({ name: 'Charlie', role: 'Manager' });
    expect(newEmp).toHaveProperty('id', 1);
    expect(newEmp.name).toBe('Charlie');
  });
});