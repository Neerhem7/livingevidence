import React, { useState } from 'react';
import { ExtractionNode } from './type';
import { Col, Button, Card } from 'react-bootstrap';

interface Props {
  nodes: ExtractionNode[];
  selectedHeaderKeys: Set<number>;
  setSelectedHeaderKeys: React.Dispatch<React.SetStateAction<Set<number>>>;
  togglePanel: () => void;
  panelCollapsed: Boolean;
}

const ColumnSelectorPanel: React.FC<Props> = ({
  nodes,
  selectedHeaderKeys,
  setSelectedHeaderKeys,
  togglePanel, panelCollapsed,

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
        return 'fw-normal fst-italic';
      case 2:
        return 'fw-light';
      case 3:
        return 'fw-bold';
      case 4:
        return 'fw-normal';
      default:
        return 'fw-normal';
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
          const isParent = node.children && node.children.length > 0;
  
          const handleToggleExpand = () => {
            setExpandMap((prev) => ({
              ...prev,
              [node.id]: !isExpanded,
            }));
          };
  
          const labelContent =
            level === 0 ? (
              <div className="form-check form-switch m-0 d-flex align-items-center gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`switch-${node.id}`}
                  checked={
                    node.children?.length
                      ? isParentChecked(node)
                      : selectedHeaderKeys.has(node.id)
                  }
                  onChange={(e) =>
                    node.children?.length
                      ? toggleParent(node, e.target.checked)
                      : toggleHeaderKey(node.id)
                  }
                />
                <label
                  className={`form-check-label mb-0 ${getFontStylesByLevel(level)}`}
                  htmlFor={`switch-${node.id}`}
                  style={{ userSelect: 'none', cursor: 'pointer' }}
                >
                  {node.name}
                </label>
              </div>
            ) : (
              <label
                className={`checkbox-level-${level} d-flex align-items-center gap-2 m-0 ${getFontStylesByLevel(level)}`}
              >
                <input
                  type="checkbox"
                  checked={
                    node.children?.length
                      ? isParentChecked(node)
                      : selectedHeaderKeys.has(node.id)
                  }
                  onChange={(e) =>
                    node.children?.length
                      ? toggleParent(node, e.target.checked)
                      : toggleHeaderKey(node.id)
                  }
                />
                {node.name}
              </label>
            );
  
          return (
            <li key={node.id} className="">
              {level === 0 ? (
                <div className="border-bottom px-2 py-4 back-primary-lg  d-flex align-items-center justify-content-between">
                  {labelContent}
  
                  {isParent && (
                    <span
                      onClick={handleToggleExpand}
                      style={{ cursor: 'pointer', color: '#666' }}
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </span>
                  )}
                </div>
              ) : (
                <div className={`d-flex align-items-center ps-${Math.min(level + 1, 5)} gap-2`}>
                  {labelContent}
                </div>
              )}
  
              {isParent && isExpanded && renderCheckboxTree(node.children!, level + 1, expandMap, setExpandMap)}
            </li>
          );
        })}
      </ul>
    );
  };
  
  

  return (
    <Card className='h-100' >
      <Card.Header className='p-3 py-4 back-secondary border-secondary'>
        <Card.Title>   <i className="fa-solid fa-table-list"></i> COLUMN SELECTOR
        </Card.Title>
      </Card.Header>
      <Card.Body className='mb-2 p-0 pb-3'>
        {renderCheckboxTree(nodes, 0, expandMap, setExpandMap)}

      </Card.Body>
    </Card>
  )
    ;
};

export default ColumnSelectorPanel;
