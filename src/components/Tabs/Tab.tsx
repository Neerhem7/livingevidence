// components/Tabs.tsx
import React, { useState, ReactNode } from "react";
import './Tab.css'
import { Button, Card } from "react-bootstrap";
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
    <>
      <div className="d-flex">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            className={`btn ${index === activeIndex ? "btn-secondary" : "btn-primary"}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <Card className="tab-body p-4 rounded-b-lg shadow-sm">
        {tabs[activeIndex].content}
      </Card>
    </>
  );
};

export default Tabs;
