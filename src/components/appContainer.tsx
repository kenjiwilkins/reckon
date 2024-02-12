import React from 'react';
import { AppFooter } from './appFooter';
import { AppImage } from './appImage';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div id="container" className="relative flex h-screen w-screen items-center justify-center">
      <div className="px-auto flex w-500px shadow-lg">
        <div className="h-max w-full grow">
          <AppImage />
          {children}
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export { AppContainer };
