import { Body, Controller, Headers, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    // private readonly episodeService: EpisodesService,
  ) {}
  //   @Get()
  //   findAll(): string {
  //     return this.webhooksService.test();
  //   }
  @Post()
  handleWebhook(@Body() payload: any, @Headers() headers: any) {
    console.log('Headers:', headers);
    console.log('Payload:', payload);

    return {
      status: 'received',
    };
  }
}
