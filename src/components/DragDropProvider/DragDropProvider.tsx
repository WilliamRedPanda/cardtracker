import { useCallback, useRef } from 'react';

import type { CardRegistration } from '@/types/dragDrop';
import { DragDropContext } from '@/utils/dragDropContext';
import type { DragDropProviderProps } from './types';

export function DragDropProvider({ children }: DragDropProviderProps) {
  const cardsRef = useRef<Map<string, CardRegistration>>(new Map());

  const registerCard = useCallback((reg: CardRegistration) => {
    cardsRef.current.set(reg.id, reg);
  }, []);

  const unregisterCard = useCallback((id: string) => {
    cardsRef.current.delete(id);
  }, []);

  const findCardAt = useCallback((x: number, y: number): CardRegistration | null => {
    for (const card of cardsRef.current.values()) {
      const b = card.boundsRef.current;
      if (b && x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) {
        return card;
      }
    }
    return null;
  }, []);

  return (
    <DragDropContext.Provider value={{ registerCard, unregisterCard, findCardAt }}>
      {children}
    </DragDropContext.Provider>
  );
}
