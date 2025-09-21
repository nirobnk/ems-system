import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Dimuthu14!',
      database: 'ems_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    EmployeesModule,
  ],
})
export class AppModule {}