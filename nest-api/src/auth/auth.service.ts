import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {

    signIn () {
        return 'Signed in';
    }

    signUp () {
        return 'Signed in';
    }
}