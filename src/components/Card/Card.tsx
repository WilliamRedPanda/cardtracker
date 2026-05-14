import { useCallback, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { CardBounds } from '@/types/dragDrop';
import { useDragDrop } from '@/utils/useDragDrop';
import { useCardSwap } from '@/utils/useCardSwap';
import { styles } from './styles';
import type { CardProps } from './types';

export function Card({ id, label = 'Card', compact = false, style, side, total, onTotalChange, onSwap }: CardProps) {
  const { registerCard, unregisterCard } = useDragDrop();
  const { registerSwapCard, unregisterSwapCard, draggedIdShared, hoveredIdShared, startDrag, updateDrag, endDrag, cancelDrag } =
    useCardSwap();

  const boundsRef = useRef<CardBounds | null>(null);
  const viewRef = useRef<View>(null);
  const totalRef = useRef(total);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  const onReceive = useCallback(
    (value: number) => {
      onTotalChange(id, Math.max(0, totalRef.current + value));
    },
    [id, onTotalChange],
  );

  useEffect(() => {
    registerCard({ id, boundsRef, onReceive });
    return () => unregisterCard(id);
  }, [id, registerCard, unregisterCard, onReceive]);

  useEffect(() => {
    registerSwapCard({ id, side, boundsRef });
    return () => unregisterSwapCard(id);
  }, [id, side, registerSwapCard, unregisterSwapCard]);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleSwapDrop = useCallback(() => {
    const targetId = endDrag();
    if (targetId && onSwap) {
      onSwap(id, targetId);
    }
  }, [endDrag, id, onSwap]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.06);
      opacity.value = withTiming(0.85);
      startDrag(id, side);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      updateDrag(event.absoluteX, event.absoluteY);
    })
    .onEnd(() => {
      handleSwapDrop();
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      cancelDrag();
    });

  const animatedStyle = useAnimatedStyle(() => {
    const dragging = draggedIdShared.value === id;
    const hovered = hoveredIdShared.value === id;
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
      opacity: opacity.value,
      zIndex: dragging ? 10 : 1,
      borderColor: hovered ? '#9090C0' : '#2E2E4A',
      borderWidth: hovered ? 2.5 : 1.5,
      shadowColor: dragging ? '#9090C0' : '#000',
      shadowOpacity: dragging ? 0.9 : 0.5,
      shadowRadius: dragging ? 18 : 10,
      elevation: dragging ? 20 : 10,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        ref={viewRef}
        onLayout={() => {
          viewRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
            boundsRef.current = { x: pageX, y: pageY, width, height };
          });
        }}
        style={[styles.card, compact && styles.cardCompact, style, animatedStyle]}
      >
        <Text style={[styles.label, compact && styles.labelCompact]}>{label}</Text>
        <Text style={[styles.total, compact && styles.totalCompact]}>{total}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
