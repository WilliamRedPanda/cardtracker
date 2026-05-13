import { createContext } from 'react';

import type { CardSwapContextValue } from '@/types/cardSwap';

export const CardSwapContext = createContext<CardSwapContextValue | null>(null);
