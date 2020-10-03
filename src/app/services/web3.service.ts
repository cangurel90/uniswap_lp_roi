import { Injectable } from '@angular/core';
import { Contract, providers } from 'ethers';
import { DBService } from './db.service';
import { PoolStore, Token } from './state/pool.store';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private provider: providers.Web3Provider;

  constructor(private db: DBService, private poolStore: PoolStore) { }

  get ethereum(): any {
    return (window as any).ethereum;
  }

  async init(): Promise<void> {
    if (this.ethereum) {
      await this.ethereum.enable();
      this.provider = new providers.Web3Provider(this.ethereum);
      this.poolStore.update({ isConnected: true });
      const address = await this.getAddress();
      const exists = await this.db.keyExists(address);
      if (!exists) {
        await this.db.addKey(address);
      }
    }
  }

  disconnect(): void {
    delete this.provider;
    this.poolStore.update({ isConnected: false });
  }

  private async getAddress(): Promise<string> {
    return this.provider.getSigner().getAddress();
  }
}
