import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('http://localhost:6789/login')
  getHello(): string {
    return this.appService.getHello();
  }
}
