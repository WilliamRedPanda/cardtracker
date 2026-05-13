import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  section: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  farRow: {
    flexDirection: 'row',
    gap: 4,
  },
  closeRow: {
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    zIndex: 10,
  },
  dotsColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  compactCard: {
    flex: 1,
  },
});
