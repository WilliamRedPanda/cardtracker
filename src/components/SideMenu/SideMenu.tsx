import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { MENU_WIDTH, styles } from "./styles";
import type { SideMenuProps } from "./types";

export function SideMenu({ children, side = "right" }: SideMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isRight = side === "right";

  const translateX = useSharedValue(isRight ? MENU_WIDTH : -MENU_WIDTH);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const toggle = useCallback(() => {
    const next = !isOpen;
    translateX.value = withTiming(
      next ? 0 : isRight ? MENU_WIDTH : -MENU_WIDTH,
      { duration: 250 },
    );
    setIsOpen(next);
  }, [isOpen, isRight, translateX]);

  const tab = (
    <Pressable
      style={isRight ? styles.tabRight : styles.tabLeft}
      onPress={toggle}
    >
      <Text style={styles.tabIcon}>
        {isRight ? (isOpen ? "›" : "‹") : isOpen ? "‹" : "›"}
      </Text>
    </Pressable>
  );

  const panel = (
    <View style={styles.clip} pointerEvents="box-none">
      <Animated.View
        style={[isRight ? styles.menuRight : styles.menuLeft, animatedStyle]}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        {children}
      </Animated.View>
    </View>
  );

  return (
    <View
      style={isRight ? styles.containerRight : styles.containerLeft}
      pointerEvents="box-none"
    >
      {isRight ? (
        <>
          {panel}
          {tab}
        </>
      ) : (
        <>
          {tab}
          {panel}
        </>
      )}
    </View>
  );
}
