import { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useDragDrop } from '@/utils/useDragDrop';
import { styles } from './styles';
import type { DamageDotProps } from './types';

export function DamageDot({ value, mode = 'damage', onDropped }: DamageDotProps) {
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
        // Heal passes a negative value so the card subtracts (clamped to 0 in Card)
        const signedValue = mode === 'heal' ? -value : value;
        card.onReceive(signedValue);
        onDropped?.(value, card.id);
      }
    },
    [findCardAt, value, mode, onDropped],
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.2);
      setIsDragging(true);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      setIsDragging(false);
      handleDrop(event.absoluteX, event.absoluteY);
    });

  const isHeal = mode === 'heal';

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.dot,
          isHeal && styles.dotHeal,
          isDragging && styles.dotDragging,
          animatedStyle,
        ]}
      >
        <Text style={styles.value}>{value}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
