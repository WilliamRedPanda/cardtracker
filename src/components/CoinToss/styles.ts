import { StyleSheet } from 'react-native';

export const createStyles = (size: number) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    coin: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#F4C430',
      borderWidth: 4,
      borderColor: '#B8860B',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#F4C430',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 12,
    },
    label: {
      fontSize: size * 0.38,
      fontWeight: '800',
      color: '#7B5900',
      letterSpacing: 1,
    },
    resultText: {
      marginTop: 24,
      fontSize: 18,
      fontWeight: '700',
      color: '#E0E0E0',
      letterSpacing: 0.5,
    },
  });
