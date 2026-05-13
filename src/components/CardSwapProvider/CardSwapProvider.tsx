import React, { useCallback, useRef, useState } from 'react';

import type { CardSide, SwapCardRegistration } from '@/types/cardSwap';
import { CardSwapContext } from '@/utils/cardSwapContext';

export function CardSwapProvider({ children }: { children: React.ReactNode }) {
  const cardsRef = useRef(new Map<string, SwapCardRegistration>());
  const dragStateRef = useRef<{ id: string | null; side: CardSide | null }>({ id: null, side: null });
  const hoveredIdRef = useRef<string | null>(null);

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const registerSwapCard = useCallback((reg: SwapCardRegistration) => {
    cardsRef.current.set(reg.id, reg);
  }, []);

  const unregisterSwapCard = useCallback((id: string) => {
    cardsRef.current.delete(id);
  }, []);

  const startDrag = useCallback((id: string, side: CardSide) => {
    dragStateRef.current = { id, side };
    hoveredIdRef.current = null;
    setDraggedId(id);
    setHoveredId(null);
  }, []);

  const updateDrag = useCallback((x: number, y: number) => {
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
    if (found !== hoveredIdRef.current) {
      hoveredIdRef.current = found;
      setHoveredId(found);
    }
  }, []);

  const endDrag = useCallback((): string | null => {
    const target = hoveredIdRef.current;
    dragStateRef.current = { id: null, side: null };
    hoveredIdRef.current = null;
    setDraggedId(null);
    setHoveredId(null);
    return target;
  }, []);

  const cancelDrag = useCallback(() => {
    dragStateRef.current = { id: null, side: null };
    hoveredIdRef.current = null;
    setDraggedId(null);
    setHoveredId(null);
  }, []);

  return (
    <CardSwapContext.Provider
      value={{ registerSwapCard, unregisterSwapCard, draggedId, hoveredId, startDrag, updateDrag, endDrag, cancelDrag }}
    >
      {children}
    </CardSwapContext.Provider>
  );
}
