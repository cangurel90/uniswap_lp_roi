import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface Token {
  address: string;
  symbol: string;
  decimal: number;
  img?: string;
  type?: string;
  chainId?: number;
  priceUSD: number;
}

export interface PoolState {
  address: string;
  token0: Token;
  token1: Token;
  roi: Record<string, number>;
  liquidity: number;
  volumeUSD: number;
  isConnected: boolean;
}

const initPoolState: PoolState = {
  address: '',
  token0: {
    address: '',
    decimal: 0,
    symbol: '',
    priceUSD: 0
  },
  token1: {
    address: '',
    decimal: 0,
    symbol: '',
    priceUSD: 0
  },
  roi: {},
  liquidity: 0,
  volumeUSD: 0,
  isConnected: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pool', resettable: true })
export class PoolStore extends Store<PoolState> {
  constructor() {
    super(initPoolState);
  }
}
