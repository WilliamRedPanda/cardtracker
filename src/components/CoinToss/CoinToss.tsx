import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import type { CoinSide, CoinTossProps } from './types';
import { createStyles } from './styles';

const FLIP_HALF_DURATION = 90;
const TOSS_HEIGHT = 110;
const TOSS_UP_DURATION = 680;

// State updates are scheduled at the same offsets as the original withTiming callbacks
const MID_FLIP_DELAY = 13 * FLIP_HALF_DURATION;
const FLIP_COMPLETE_DELAY = 14 * FLIP_HALF_DURATION;

export function CoinToss({ size = 120, onResult }: CoinTossProps) {
  const styles = useMemo(() => createStyles(size), [size]);

  const [displaySide, setDisplaySide] = useState<CoinSide>('heads');
  const [result, setResult] = useState<CoinSide | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const scaleX = useSharedValue(1);
  const translateY = useSharedValue(0);
  const midTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (midTimerRef.current) clearTimeout(midTimerRef.current);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  }, []);

  const handlePress = useCallback(() => {
    if (isFlipping) return;

    const outcome: CoinSide = Math.random() < 0.5 ? 'heads' : 'tails';
    setIsFlipping(true);
    setResult(null);

    midTimerRef.current = setTimeout(() => {
      setDisplaySide(outcome);
    }, MID_FLIP_DELAY);

    endTimerRef.current = setTimeout(() => {
      setResult(outcome);
      setIsFlipping(false);
      onResult?.(outcome);
    }, FLIP_COMPLETE_DELAY);

    translateY.value = withSequence(
      withTiming(-TOSS_HEIGHT, { duration: TOSS_UP_DURATION, easing: Easing.out(Easing.quad) }),
      withSpring(0, { damping: 10, stiffness: 120 }),
    );

    // 6 full flips then a final flip — no completion callbacks needed
    scaleX.value = withSequence(
      withTiming(0, { duration: FLIP_HALF_DURATION }),
      withTiming(1, { duration: FLIP_HALF_DURATION }),
      withTiming(0, { duration: FLIP_HALF_DURATION }),
      withTiming(1, { duration: FLIP_HALF_DURATION }),
      withTiming(0, { duration: FLIP_HALF_DURATION }),
      withTiming(1, { duration: FLIP_HALF_DURATION }),
      withTiming(0, { duration: FLIP_HALF_DURATION }),
      withTiming(1, { duration: FLIP_HALF_DURATION }),
      withTiming(0, { duration: FLIP_HALF_DURATION }),
      withTiming(1, { duration: FLIP_HALF_DURATION }),
      withTiming(0, { duration: FLIP_HALF_DURATION }),
      withTiming(1, { duration: FLIP_HALF_DURATION }),
      withTiming(0, { duration: FLIP_HALF_DURATION }),
      withTiming(1, { duration: FLIP_HALF_DURATION }),
    );
  }, [isFlipping, onResult, scaleX, translateY]);

  const animatedCoinStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scaleX: scaleX.value }],
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} disabled={isFlipping}>
        <Animated.View style={[styles.coin, animatedCoinStyle]}>
          <Text style={styles.label}>{displaySide === 'heads' ? 'H' : 'T'}</Text>
        </Animated.View>
      </Pressable>
      {result !== null && (
        <Text style={styles.resultText}>{result === 'heads' ? 'Heads!' : 'Tails!'}</Text>
      )}
    </View>
  );
}
