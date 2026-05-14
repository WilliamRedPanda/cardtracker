import React, { useCallback, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import type { CardSide, SwapCardRegistration } from '@/types/cardSwap';
import { CardSwapContext } from '@/utils/cardSwapContext';

export function CardSwapProvider({ children }: { children: React.ReactNode }) {
  const cardsRef = useRef(new Map<string, SwapCardRegistration>());
  const dragStateRef = useRef<{ id: string | null; side: CardSide | null }>({ id: null, side: null });

  const draggedIdShared = useSharedValue<string | null>(null);
  const hoveredIdShared = useSharedValue<string | null>(null);

  const registerSwapCard = useCallback((reg: SwapCardRegistration) => {
    cardsRef.current.set(reg.id, reg);
  }, []);

  const unregisterSwapCard = useCallback((id: string) => {
    cardsRef.current.delete(id);
  }, []);

  const startDrag = useCallback(
    (id: string, side: CardSide) => {
      dragStateRef.current = { id, side };
      draggedIdShared.value = id;
      hoveredIdShared.value = null;
    },
    [draggedIdShared, hoveredIdShared],
  );

  const updateDrag = useCallback(
    (x: number, y: number) => {
      const { id, side } = dragStateRef.current;
      if (!id || !side) return;
      let found: string | null = null;
      for (const [cardId, card] of cardsRef.current) {
        if (cardId === id || card.side !== side) continue;
        const b = card.boundsRef.current;
        if (b && x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) {
          found = cardId;
          break;
        }
      }
      if (found !== hoveredIdShared.value) {
        hoveredIdShared.value = found;
      }
    },
    [hoveredIdShared],
  );

  const endDrag = useCallback((): string | null => {
    const target = hoveredIdShared.value;
    dragStateRef.current = { id: null, side: null };
    draggedIdShared.value = null;
    hoveredIdShared.value = null;
    return target;
  }, [draggedIdShared, hoveredIdShared]);

  const cancelDrag = useCallback(() => {
    dragStateRef.current = { id: null, side: null };
    draggedIdShared.value = null;
    hoveredIdShared.value = null;
  }, [draggedIdShared, hoveredIdShared]);

  return (
    <CardSwapContext.Provider
      value={{ registerSwapCard, unregisterSwapCard, draggedIdShared, hoveredIdShared, startDrag, updateDrag, endDrag, cancelDrag }}
    >
      {children}
    </CardSwapContext.Provider>
  );
}
