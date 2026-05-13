import type { ViewStyle } from 'react-native';

export interface CardProps {
  id: string;
  label?: string;
  compact?: boolean;
  style?: ViewStyle;
}
