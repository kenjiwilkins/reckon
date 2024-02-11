import React from 'react';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div id="container" className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
};

export default AppContainer;
