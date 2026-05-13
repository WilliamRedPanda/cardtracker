import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#2A2A3E',
    borderColor: '#3A3A5E',
  },
  defaultPressed: {
    backgroundColor: '#3A3A5E',
    borderColor: '#5050A0',
  },
  danger: {
    backgroundColor: '#3A1A1A',
    borderColor: '#8B0000',
  },
  dangerPressed: {
    backgroundColor: '#5A2020',
    borderColor: '#CC2222',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  labelDefault: {
    color: '#C0C0E0',
  },
  labelDanger: {
    color: '#FF6060',
  },
});
