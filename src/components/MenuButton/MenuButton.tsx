import { Pressable, Text } from 'react-native';

import { styles } from './styles';
import type { MenuButtonProps } from './types';

export function MenuButton({ label, onPress, variant = 'default' }: MenuButtonProps) {
  const isDanger = variant === 'danger';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isDanger
          ? pressed ? styles.dangerPressed : styles.danger
          : pressed ? styles.defaultPressed : styles.default,
      ]}
    >
      <Text style={[styles.label, isDanger ? styles.labelDanger : styles.labelDefault]}>
        {label}
      </Text>
    </Pressable>
  );
}
