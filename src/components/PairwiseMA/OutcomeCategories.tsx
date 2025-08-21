import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  fetchOutcomeCategories,
  toggleOutcome,
} from "../../redux/outcomeCategoriesSlice";

interface OutcomeNode {
  name: string;
  type: "root" | "category" | "outcome";
  outcome_id: number | null;
  children: OutcomeNode[];
}

interface OutcomeCategoriesProps {
  clinicalQuestionId: string;
  projectId: string;
  onCategoriesChange: (categories: string[]) => void;
}

const OutcomeCategories: React.FC<OutcomeCategoriesProps> = ({
  clinicalQuestionId,
  projectId,
  onCategoriesChange,
}) => {
  const dispatch = useAppDispatch();
  const { categorization, loading, error, selectedOutcomes } = useAppSelector(
    (state) => state.outcomeCategories
  );
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(fetchOutcomeCategories({ clinicalQuestionId, projectId }));
  }, [dispatch, clinicalQuestionId, projectId]);

  // Auto-expand only specific nodes when data loads (primary and sensitivity)
  useEffect(() => {
    if (categorization?.pwma_category) {
      const specificNodePaths = new Set<string>();
      const collectSpecificPaths = (node: OutcomeNode, path: string = "") => {
        const currentPath = path ? `${path}/${node.name}` : node.name;

        // Add root node to always show top level
        if (node.type === "root") {
          specificNodePaths.add(currentPath);
        }

        // Add specific category nodes we want expanded by default
        if (
          node.type === "category" &&
          (node.name.toLowerCase() === "primary" ||
            node.name.toLowerCase() === "sensitivity")
        ) {
          specificNodePaths.add(currentPath);
        }

        if (node.children) {
          node.children.forEach((child) =>
            collectSpecificPaths(child, currentPath)
          );
        }
      };
      collectSpecificPaths(categorization.pwma_category);
      setExpandedNodes(specificNodePaths);
    }
  }, [categorization]);

  const toggleNode = (nodePath: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodePath)) {
      newExpanded.delete(nodePath);
    } else {
      newExpanded.add(nodePath);
    }
    setExpandedNodes(newExpanded);
  };

  const handleOutcomeSelection = (
    clinicalQuestionId: number,
    isSelected: boolean
  ) => {
    dispatch(toggleOutcome(clinicalQuestionId));

    // Update the parent component with the new selection
    const newSelected = isSelected
      ? [...selectedOutcomes, clinicalQuestionId]
      : selectedOutcomes.filter((id) => id !== clinicalQuestionId);
    onCategoriesChange(newSelected.map((id) => id.toString()));
  };

  const searchNodeRecursively = (
    node: OutcomeNode,
    searchTerm: string
  ): boolean => {
    if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return (
      node.children &&
      node.children.some((child) => searchNodeRecursively(child, searchTerm))
    );
  };

  const renderNode = (
    node: OutcomeNode,
    path: string = "",
    level: number = 0
  ): React.ReactNode => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedNodes.has(currentPath);
    const hasChildren = node.children && node.children.length > 0;
    const isOutcome = node.type === "outcome";
    const isSelected = node.outcome_id
      ? selectedOutcomes.includes(node.outcome_id)
      : false;

    // Filter based on search term
    const matchesSearch =
      searchTerm === "" ||
      node.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if any children match the search
    const hasMatchingChildren =
      node.children &&
      node.children.some(
        (child) => searchTerm === "" || searchNodeRecursively(child, searchTerm)
      );

    // Don't render if this node doesn't match and has no matching children
    if (!matchesSearch && !hasMatchingChildren) {
      return null;
    }

    return (
      <div
        key={`${currentPath}-${level}-${node.outcome_id || node.name}`}
        style={{ marginLeft: level * 12 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 8px",
            cursor: hasChildren || isOutcome ? "pointer" : "default",
            backgroundColor: isSelected ? "#205781" : "transparent",
            borderRadius: "0px",
            borderLeft: node.type === "outcome" ? "1px dotted #000" : "none",
            boxShadow:
              node.type === "outcome"
                ? "0px 2px 4px rgba(0, 0, 0, 0.1)"
                : "none",
            marginBottom: "2px",
          }}
          onClick={() => {
            if (isOutcome && node.outcome_id) {
              handleOutcomeSelection(node.outcome_id, !isSelected);
            } else if (hasChildren) {
              toggleNode(currentPath);
            }
          }}
        >
          {hasChildren && (
            <span
              style={{
                marginRight: "8px",
                fontSize: "12px",
                color: "#666",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              <i className="bi bi-caret-right"></i>
            </span>
          )}

          <span
            style={{
              fontSize: "14px",
              color: isSelected ? "#fff" : isOutcome ? "#205781" : "#333",
              fontWeight: node.type === "category" ? "500" : "normal",
              boxShadow:
                node.type === "category"
                  ? "0 0px 2px rgba(8, 55, 165, 0.5)"
                  : "none",
              padding: node.type === "category" ? "4px" : "2px",
              marginTop: node.type === "category" ? "6px" : "0px",
              border: node.type === "category" ? "1px outset #205781" : "",
              borderRadius: node.type === "category" ? "5px" : "",
              userSelect: "none",
              width: "100%",
            }}
            onClick={(e) => {
              if (node.outcome_id) {
                e.stopPropagation();
                handleOutcomeSelection(node.outcome_id, true);
              }
            }}
          >
            {node?.type === "root" ? "All" : node.name}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child, index) =>
              renderNode(child, currentPath, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading === "pending") {
    return (
      <div
        style={{
          width: "400px",
          padding: "16px",
          borderRight: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          placeholder="Search outcome categories..."
          disabled
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
            color: "#666",
          }}
        >
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (loading === "failed" || error) {
    return (
      <div
        style={{
          width: "400px",
          padding: "16px",
          borderRight: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          placeholder="Search outcome categories..."
          disabled
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            color: "#d32f2f",
            backgroundColor: "#ffebee",
            padding: "12px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          Error: {error || "Failed to load outcome categories"}
        </div>
      </div>
    );
  }

  const rootNode = categorization?.pwma_category;

  return (
    <div
      style={{
        width: "400px",
        padding: "16px",
        borderRight: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
        height: "100vh",
        overflowY: "auto",
        boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
      }}
    >
      <input
        type="text"
        placeholder="Search outcome categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          marginBottom: "16px",
          marginTop: "3px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
          backgroundColor: "#fff",
          boxSizing: "border-box",
        }}
      />

      <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
        {rootNode ? (
          renderNode(rootNode)
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#666",
              fontStyle: "italic",
              padding: "20px",
            }}
          >
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default OutcomeCategories;
