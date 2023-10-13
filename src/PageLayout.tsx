import React from 'react';

interface Props {
  children: React.ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      {children}
    </div>
  );
};

export default PageLayout;
