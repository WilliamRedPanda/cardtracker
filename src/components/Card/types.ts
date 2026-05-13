import type { ViewStyle } from 'react-native';

import type { CardSide } from '@/types/cardSwap';

export interface CardProps {
  id: string;
  label?: string;
  compact?: boolean;
  style?: ViewStyle;
  side: CardSide;
  total: number;
  onTotalChange: (id: string, newTotal: number) => void;
  onSwap?: (draggedId: string, targetId: string) => void;
}
