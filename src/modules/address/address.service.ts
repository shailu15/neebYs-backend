import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
  private address: string | null = null;

  setAddress(address: string) {
    this.address = address;
  }

  getAddress() {
    return this.address;
  }

  clear() {
    this.address = null;
  }
}