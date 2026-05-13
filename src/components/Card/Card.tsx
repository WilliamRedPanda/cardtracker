import { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import type { CardBounds } from '@/types/dragDrop';
import { useDragDrop } from '@/utils/useDragDrop';
import { styles } from './styles';
import type { CardProps } from './types';

export function Card({ id, label = 'Card' }: CardProps) {
  const { registerCard, unregisterCard } = useDragDrop();
  const [total, setTotal] = useState(0);
  const viewRef = useRef<View>(null);
  const boundsRef = useRef<CardBounds | null>(null);

  const onReceive = useCallback((value: number) => {
    setTotal((prev) => prev + value);
  }, []);

  useEffect(() => {
    registerCard({ id, boundsRef, onReceive });
    return () => unregisterCard(id);
  }, [id, registerCard, unregisterCard, onReceive]);

  return (
    <View
      ref={viewRef}
      onLayout={() => {
        viewRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
          boundsRef.current = { x: pageX, y: pageY, width, height };
        });
      }}
      style={styles.card}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.total}>{total}</Text>
    </View>
  );
}
