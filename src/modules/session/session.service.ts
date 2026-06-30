import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  private currentUserId:
    string | null = null;

  setUser(id: string) {
    this.currentUserId = id;
  }

  getUser() {
    return this.currentUserId;
  }

  clear() {
    this.currentUserId = null;
  }
}