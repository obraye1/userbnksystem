import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';


// dotenv.config({ path: `../${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.env.NODE_ENV}.env`],
     
    }),
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        useNullAsDefault: true,
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          port: Number(process.env.PORT),
        },
      },
    }),
    AuthModule,
    UsersModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}