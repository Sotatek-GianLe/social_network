import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { JWT_CONST } from 'src/common/constant';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signIn(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where : {
        email: dto.email
      }
    });

    if (!user) throw new ForbiddenException('Email not exist');

    const pwdMatches = await argon.verify(user.password, dto.password);

    if (!pwdMatches) {
      throw new ForbiddenException('Your password was wrong');
    }

    return this.signToken(user.id, user.email);
  }

  async signUp(dto: AuthDto) {
    const pwdHash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: pwdHash
        },
      });
      return user;
    } catch (error) {
      if ( error instanceof Prisma.PrismaClientKnownRequestError ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'There is a unique constraint violation, a new user cannot be created with this email'
          );
        }
      }
      throw error;
    }
  }
  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    };

    const secret = JWT_CONST.secret;

    const accessToken = await this.jwt.signAsync(
      payload,
      {
        secret: JWT_CONST.secret,
        expiresIn: JWT_CONST.expired
      }
    );
      
    return {
      access_token: accessToken
    };
  }
}
