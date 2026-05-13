import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C2A',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#2E2E4A',
    paddingVertical: 24,
    paddingHorizontal: 32,
    minWidth: 160,
    minHeight: 130,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6060A0',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  total: {
    fontSize: 52,
    fontWeight: '800',
    color: '#FF3355',
    lineHeight: 56,
  },
});
