import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0D0D1A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E2E4A',
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    borderRadius: 6,
    backgroundColor: '#2A2A4E',
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#50507A',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: '#D0D0FF',
  },
});
