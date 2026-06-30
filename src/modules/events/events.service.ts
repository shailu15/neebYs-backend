import { Injectable } from '@nestjs/common';

type EventHandler = (payload: any) => void | Promise<void>;

@Injectable()
export class EventsService {
  private handlers = new Map<string, EventHandler[]>();

  subscribe(event: string, handler: EventHandler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }

    this.handlers.get(event)!.push(handler);
  }

  async publish(event: string, payload: any) {
    console.log('EVENT:', event);
console.log(payload);
    const listeners = this.handlers.get(event);

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      await listener(payload);
    }
  }
}