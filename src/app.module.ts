import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { UserAuthGuard } from "./auth/userAuth.guard";
import { AdminModule } from './admin/admin.module';
import { RolesGuard } from "./iam/role/roles.guard";
import { AdminAuthGuard } from "./auth/adminAuth.guard";
import { QuestionModule } from './question/question.module';
import { AttemptModule } from './attempt/attempt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
    QuestionModule,
    AttemptModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ]
})
export class AppModule {
}
