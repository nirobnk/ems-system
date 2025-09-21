import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    signup: jest.fn((email, password) =>
      Promise.resolve({ id: 1, email, password })
    ),
    login: jest.fn((email, password) =>
      Promise.resolve({ id: 1, email })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should call signup and return a user', async () => {
    const result = await controller.signup({ email: 'new@gmail.com', password: 'test' });
    expect(service.signup).toHaveBeenCalledWith('new@gmail.com', 'test');
    expect(result).toHaveProperty('email', 'new@gmail.com');
  });

  it('should call login and return a user', async () => {
    const result = await controller.login({ email: 'test@gmail.com', password: 'test' });
    expect(service.login).toHaveBeenCalledWith('test@gmail.com', 'test');
    expect(result).toHaveProperty('email', 'test@gmail.com');
  });
});