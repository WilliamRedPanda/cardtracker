import type React from 'react';
import type { SharedValue } from 'react-native-reanimated';

import type { CardBounds } from './dragDrop';

export type CardSide = 'top' | 'bottom';

export interface SwapCardRegistration {
  id: string;
  side: CardSide;
  boundsRef: React.MutableRefObject<CardBounds | null>;
}

export interface CardSwapContextValue {
  registerSwapCard: (reg: SwapCardRegistration) => void;
  unregisterSwapCard: (id: string) => void;
  draggedIdShared: SharedValue<string | null>;
  hoveredIdShared: SharedValue<string | null>;
  startDrag: (id: string, side: CardSide) => void;
  updateDrag: (x: number, y: number) => void;
  endDrag: () => string | null;
  cancelDrag: () => void;
}
