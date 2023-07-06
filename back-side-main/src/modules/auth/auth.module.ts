import { Admin, AdminSchema } from 'src/entities/admin.entity';
import { Moderator, ModeratorSchema } from 'src/entities/moderator.entity';
import { Client, ClientSchema } from 'src/entities/client.entity';
import { Expert, ExpertSchema } from 'src/entities/expert.entity';
import { Token, TokenSchema } from 'src/entities/token.entity';
import { User, UserSchema } from 'src/entities/user.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExpertModule } from '../expert/expert.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { MailerService } from 'src/config/mailer/mailer.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    ExpertModule,
    JwtModule.register({
      secret: 'KLDMMMD12333',
      signOptions: {
        expiresIn: 1296000
      }
    }),
      MongooseModule.forFeature([
          {name: User.name, schema: UserSchema},
          {name: Client.name, schema: ClientSchema},
          {name: Expert.name, schema: ExpertSchema},
          {name: Admin.name, schema: AdminSchema},
          {name: Moderator.name, schema: ModeratorSchema},
          {name: Token.name, schema: TokenSchema}
      ])
  ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, MailerService],
    exports: [AuthService, JwtStrategy, PassportModule]
})
export class AuthModule {}
