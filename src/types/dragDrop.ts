import type React from 'react';

export interface CardBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CardRegistration {
  id: string;
  boundsRef: React.MutableRefObject<CardBounds | null>;
  onReceive: (value: number) => void;
}

export interface DragDropContextValue {
  registerCard: (reg: CardRegistration) => void;
  unregisterCard: (id: string) => void;
  findCardAt: (x: number, y: number) => CardRegistration | null;
}
