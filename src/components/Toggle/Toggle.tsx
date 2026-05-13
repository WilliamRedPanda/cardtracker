import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { styles } from './styles';
import type { ToggleProps } from './types';

export function Toggle<T extends string>({ options, value, onChange }: ToggleProps<T>) {
  const [optionWidth, setOptionWidth] = useState(0);
  const indicatorX = useSharedValue(0);

  const selectedIndex = options[0].value === value ? 0 : 1;

  // Animate indicator whenever the selected option or measured width changes
  useEffect(() => {
    if (optionWidth > 0) {
      indicatorX.value = withSpring(selectedIndex * optionWidth, {
        damping: 14,
        stiffness: 180,
      });
    }
  }, [selectedIndex, optionWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <View
      style={styles.container}
      onLayout={(e) => setOptionWidth(e.nativeEvent.layout.width / 2)}
    >
      <Animated.View style={[styles.indicator, { width: optionWidth }, indicatorStyle]} />
      {options.map((option, index) => (
        <Pressable
          key={option.value}
          style={styles.option}
          onPress={() => onChange(option.value)}
        >
          <Text style={[styles.label, value === option.value && styles.labelActive]}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
