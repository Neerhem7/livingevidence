import { useState } from "react";
import OutcomeCategories from "./OutcomeCategories";
import { useSearchParams } from "react-router-dom";

const PairwiseMa = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [searchParams] = useSearchParams();

  const projectId = searchParams.get("projectId");
  const cqId = searchParams.get("cqId");

  const handleCategoriesChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Sidebar - Outcome Categories (Sticky) */}
      <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 100 }}>
        {cqId && projectId && (
          <OutcomeCategories
            clinicalQuestionId={cqId}
            projectId={projectId}
            onCategoriesChange={handleCategoriesChange}
          />
        )}
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
        }}
      ></div>
    </div>
  );
};

export default PairwiseMa;
