import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {
}
