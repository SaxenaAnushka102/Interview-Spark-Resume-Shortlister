import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0d141c]">
        <LogoIcon />
        <h1 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">
          Interview Spark
        </h1>
      </div>
    </header>
  );
};
