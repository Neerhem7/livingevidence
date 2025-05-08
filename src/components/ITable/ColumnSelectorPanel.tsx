import React, { useState } from 'react';
import { ExtractionNode } from './ITableComponent';
import { Col, Button } from 'react-bootstrap';

interface Props {
  nodes: ExtractionNode[];
  selectedHeaderKeys: Set<number>;
  setSelectedHeaderKeys: React.Dispatch<React.SetStateAction<Set<number>>>;
  togglePanel: () => void;
  panelCollapsed: Boolean;
  parentAbbreviations: string[];
}

const ColumnSelectorPanel: React.FC<Props> = ({
  nodes,
  selectedHeaderKeys,
  setSelectedHeaderKeys,
  togglePanel, panelCollapsed,
  parentAbbreviations

}) => {

  const [expandMap, setExpandMap] = useState<Record<number, boolean>>({});

  const isParentChecked = (node: ExtractionNode): boolean => {
    if (!node.children?.length) {
      return selectedHeaderKeys.has(node.id);
    }
    return node.children.some(child => isParentChecked(child));
  };

  const toggleParent = (node: ExtractionNode, checked: boolean) => {
    setSelectedHeaderKeys(prev => {
      const updated = new Set(prev);
      const updateChildren = (n: ExtractionNode) => {
        if (!n.children?.length) {
          checked ? updated.add(n.id) : updated.delete(n.id);
        } else {
          n.children.forEach(updateChildren);
        }
      };
      updateChildren(node);
      return updated;
    });
  };

  const toggleHeaderKey = (id: number) => {
    setSelectedHeaderKeys(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const getFontStylesByLevel = (level: number): string => {
    switch (level) {
      case 0:
        return 'fw-semibold';
      case 1:
        return 'fw-normal fst-italic'; // Font-weight 400 (normal)
      case 2:
        return 'fw-light'; // Font-weight 300 (light)
      case 3:
        return 'fw-bold'; // Font-weight 700 (bold)
      case 4:
        return 'fw-normal'; // Font-weight 400 (normal) and italic
      default:
        return 'fw-normal'; // Font-weight 400 for other levels
    }
  };

  const renderCheckboxTree = (
    nodes: ExtractionNode[],
    level = 0,
    expandMap: Record<number, boolean>,
    setExpandMap: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
  ) => {
    return (
      <ul style={{ listStyle: 'none', paddingLeft: level * 16 }}>
        {nodes.map((node) => {
          const isExpanded = expandMap[node.id] ?? true;

          const handleToggleExpand = () => {
            setExpandMap((prev) => ({
              ...prev,
              [node.id]: !isExpanded,
            }));
          };

          const isParent = node.children && node.children.length > 0;

          return (
            <li key={node.id} className="mb-2">
              <div className={`d-flex align-items-center ps-${Math.min(level + 1, 5)} gap-2`}>
                <label
                  className={`checkbox-level-${level} d-flex align-items-center gap-2 m-0 ${getFontStylesByLevel(level)}`}
                >
                  <input
                    type="checkbox"
                    checked={
                      node.children?.length ? isParentChecked(node) : selectedHeaderKeys.has(node.id)
                    }
                    onChange={(e) =>
                      node.children?.length
                        ? toggleParent(node, e.target.checked)
                        : toggleHeaderKey(node.id)
                    }
                  />
                  {node.name}
                </label>

                {isParent && (
                  <span
                    onClick={handleToggleExpand}
                    style={{ cursor: 'pointer', color: '#666' }}
                  >
                    {isExpanded ? (
                      <i className="fa-solid fa-angle-up"></i>
                    ) : (
                      <i className="fa-solid fa-angle-down"></i>
                    )}
                  </span>
                )}
              </div>

              {isParent && isExpanded && renderCheckboxTree(node.children!, level + 1, expandMap, setExpandMap)}
            </li>

          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={`column-selector  ${panelCollapsed ? 'collapsed-panel' : ''}`}
    >
      {panelCollapsed ?
        <div className="d-flex flex-column gap-4 justify-content-center align-items-center p-2">
          <Button
            variant="secondary"
            onClick={togglePanel}
          >
            <i className="fa-solid fa-table-list"></i>
          </Button>

          <i
            className="fa-solid fa-person-military-to-person icon-30"
          ></i>
          {/* {parentAbbreviations.map((value, index) => (
            <span key={index}>{value}</span>
          ))} */}
        </div>

        : < >
          <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
            <h5> Column Selector</h5>
            <i className="fa-solid fa-angles-left icon-20 cursor-pointer" style={{ cursor: 'pointer', color: '#666' }} onClick={togglePanel}></i>
          </div>

          {renderCheckboxTree(nodes, 0, expandMap, setExpandMap)}
        </>}

    </div>);
};

export default ColumnSelectorPanel;
