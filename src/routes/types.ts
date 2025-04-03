import { ReactNode } from 'react';

export interface RouteProps {
  path: string;
  element: ReactNode;
  requiresUser: boolean;
  layout?: React.ComponentType<{ children: ReactNode }>;
}