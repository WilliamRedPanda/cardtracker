import { StyleSheet } from 'react-native';

const DOT_SIZE = 64;

export const styles = StyleSheet.create({
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#8B0000',
    borderWidth: 2,
    borderColor: '#FF3355',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  dotHeal: {
    backgroundColor: '#003D00',
    borderColor: '#00CC44',
    shadowColor: '#00FF44',
  },
  dotDragging: {
    shadowOpacity: 0.9,
    shadowRadius: 18,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
