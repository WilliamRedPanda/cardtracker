import { useContext } from 'react';

import type { DragDropContextValue } from '@/types/dragDrop';
import { DragDropContext } from './dragDropContext';

export function useDragDrop(): DragDropContextValue {
  const ctx = useContext(DragDropContext);
  if (!ctx) throw new Error('useDragDrop must be used within DragDropProvider');
  return ctx;
}
