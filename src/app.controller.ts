import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return {
      app: 'Neebys Backend',
      version: '0.0.1',
      status: 'Running 🚀',
      message: 'Welcome to Neebys API',
    };
  }
}