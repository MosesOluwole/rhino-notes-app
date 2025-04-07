import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('cache-test')
  async testCache(): Promise<string> {
    const testKey = 'my_test_key';
    // Try to get the key from cache
    let value = await this.cacheManager.get<string>(testKey);
    if (!value) {
      // If not in cache, set it
      await this.cacheManager.set(testKey, 'Hello from Redis!', 30);
      value = await this.cacheManager.get<string>(testKey);
      return `Cache miss: set and retrieved value: ${value}`;
    }
    // If found in cache, return it
    return `Cache hit: retrieved value: ${value}`;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
