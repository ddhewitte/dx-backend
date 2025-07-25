import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterMap } from './map/register.map';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')
    async register(@Body() data: RegisterMap) {
        return await this.authService.register(data);
    }
}