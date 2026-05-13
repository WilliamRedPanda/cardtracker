import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useDragDrop } from '@/utils/useDragDrop';
import { styles } from './styles';
import type { DamageDotProps } from './types';

export function DamageDot({ value, onDropped }: DamageDotProps) {
  const { findCardAt } = useDragDrop();
  const [isDragging, setIsDragging] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const handleDrop = useCallback(
    (x: number, y: number) => {
      const card = findCardAt(x, y);
      if (card) {
        card.onReceive(value);
        onDropped?.(value, card.id);
      }
    },
    [findCardAt, value, onDropped],
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.2);
      runOnJS(setIsDragging)(true);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(setIsDragging)(false);
      runOnJS(handleDrop)(event.absoluteX, event.absoluteY);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.dot, isDragging && styles.dotDragging, animatedStyle]}
      >
        <Text style={styles.value}>{value}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
