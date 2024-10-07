import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response-interceptor/response.interceptor';
import { AllExceptionsFilter } from './errors/all-exceptions/all-exceptions.filter';
import { UsersModule } from 'src/users/users.module';
import { PlayersModule } from 'src/players/players.module';

@Module({
    imports: [
        UsersModule,
        PlayersModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        },
        {
            provide: 'AllExceptionsFilter',
            useClass: AllExceptionsFilter
        }
    ]
})
export class CommonModule {}
