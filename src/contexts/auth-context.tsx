'use client';

import { createContext } from 'react';
import { AuthContextValue } from 'src/app/(private)/auth/utils/auth.types';

// import type { AuthContextValue } from '../types';

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthConsumer = AuthContext.Consumer;
