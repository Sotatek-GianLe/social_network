import { Module } from '@nestjs/common';
// import { UserModule } from './user-module/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    BookmarkModule,
    AuthModule,
  ],
})
export class AppModule {}
