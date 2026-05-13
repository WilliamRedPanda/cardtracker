import { createContext } from 'react';

import type { DragDropContextValue } from '@/types/dragDrop';

export const DragDropContext = createContext<DragDropContextValue | null>(null);
