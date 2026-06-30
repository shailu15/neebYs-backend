import { Injectable } from '@nestjs/common';

@Injectable()
export class RecentService {
  private recent: string[] = [];

  add(product: string) {
    this.recent = this.recent.filter(
      (p) => p !== product,
    );

    this.recent.unshift(product);

    if (this.recent.length > 10) {
      this.recent.pop();
    }
  }

  getRecent() {
    return this.recent;
  }
}