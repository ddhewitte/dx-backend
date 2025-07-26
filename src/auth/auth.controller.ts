import { Body, Controller, Get, Post, Req, Patch, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterMap } from './map/register.map';
import { LoginMap } from './map/login.map';
import { AuthGuard } from './auth.guard';
import { UpdateMap } from './map/update.map';

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

    //Detail user
    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Req() req){
        return await this.authService.profile(req.user.id)
    }

    //Show All user
    @UseGuards(AuthGuard)
    @Get('users')
    async users(){
        return await this.authService.showAllUser()
    }

    //Update user
    @UseGuards(AuthGuard)
    @Patch('users/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateMap){
        const userId = parseInt(id)
        return await this.authService.updateUser(userId, data)
    }

}