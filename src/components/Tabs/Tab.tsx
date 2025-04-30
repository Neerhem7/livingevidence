// components/Tabs.tsx
import React, { useState, ReactNode } from "react";
import './Tab.css'
type Tab = {
  label: string;
  content: ReactNode;
  onClick?: () => void; 
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    tabs[index].onClick?.();
  };

  return (
    <div className="w-full">
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-header-btn ${
                index === activeIndex && "active-btn"
              }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-body p-4 border border-t-0 rounded-b-lg shadow-sm">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
