import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  test(): string {
    return 'Testing the webhook';
  }
}
