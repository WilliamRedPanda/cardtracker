export type CoinSide = 'heads' | 'tails';

export interface CoinTossProps {
  size?: number;
  onResult?: (result: CoinSide) => void;
}
