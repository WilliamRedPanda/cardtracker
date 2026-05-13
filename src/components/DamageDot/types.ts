export type DotMode = 'damage' | 'heal';

export interface DamageDotProps {
  value: number;
  mode?: DotMode;
  onDropped?: (value: number, cardId: string) => void;
}
