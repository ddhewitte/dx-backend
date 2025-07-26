import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterMap } from './map/register.map';
import { LoginMap } from './map/login.map';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //register
    @Post('register')
    async register(@Body() data: RegisterMap) {
        return await this.authService.register(data);
    }

    //login
    @Post('login')
    async login(@Body() data: LoginMap){
        return await this.authService.login(data)
    }
}