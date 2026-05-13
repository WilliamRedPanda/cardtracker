import { useContext } from 'react';

import { CardSwapContext } from './cardSwapContext';

export function useCardSwap() {
  const ctx = useContext(CardSwapContext);
  if (!ctx) throw new Error('useCardSwap must be used within CardSwapProvider');
  return ctx;
}
