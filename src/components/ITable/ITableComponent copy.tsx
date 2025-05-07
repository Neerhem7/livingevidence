import React, { useEffect, useState } from 'react';

interface ExtractionResultValue {
  value: string | number | boolean;
}

interface ExtractionResult {
  result: ExtractionResultValue[];
}

export interface ExtractionNode {
  id: number;
  name: string;
  parent_id: number | null;
  is_parent: boolean;
  level: number;
  field_type: string | null;
  validation: string | null;
  options: string[] | null;
  extraction_result: ExtractionResult | null;
  children?: ExtractionNode[];
}

interface Item {
  paper_id: number;
  pdf_path: string | null;
  extraction_results: ExtractionNode[];
}

interface Props {
  items: Item[];
}

const buildTree = (nodes: ExtractionNode[]): ExtractionNode[] => {
  const map = new Map<number, ExtractionNode>();
  const roots: ExtractionNode[] = [];

  nodes.forEach((node) => {
    map.set(node.id, { ...node, children: [] });
  });

  map.forEach((node) => {
    if (node.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(node.parent_id);
      if (parent) parent.children!.push(node);
    }
  });

  return roots;
};

const getMaxDepth = (node: ExtractionNode): number => {
  if (!node.children?.length) return 1;
  return 1 + Math.max(...node.children.map(getMaxDepth));
};

const countVisibleLeafNodes = (node: ExtractionNode, selectedKeys: Set<number>): number => {
  if (!node.children?.length) return selectedKeys.has(node.id) ? 1 : 0;
  return node.children.reduce((sum, child) => sum + countVisibleLeafNodes(child, selectedKeys), 0);
};

const collectFilteredHeaderRows = (
  node: ExtractionNode,
  selectedKeys: Set<number>,
  depth = 0,
  rows: any[][] = [],
  maxDepth: number
): any[][] => {
  if (!rows[depth]) rows[depth] = [];

  const isLeaf = !node.children?.length;
  const visibleLeafCount = countVisibleLeafNodes(node, selectedKeys);

  const isVisible = isLeaf ? selectedKeys.has(node.id) : visibleLeafCount > 0;
  if (!isVisible) return rows;

  const colSpan = isLeaf ? 1 : visibleLeafCount;
  const rowSpan = isLeaf ? maxDepth - depth : 1;

  rows[depth].push(
    <th
      key={node.id}
      colSpan={colSpan}
      rowSpan={rowSpan}
      data-node-id={node.id}
    >
      {node.name}
    </th>
  );

  if (!isLeaf) {
    node.children!.forEach((child) => collectFilteredHeaderRows(child, selectedKeys, depth + 1, rows, maxDepth));
  }

  return rows;
};

const getLeafNodes = (node: ExtractionNode): ExtractionNode[] => {
  if (!node.children?.length) return [node];
  return node.children.flatMap(getLeafNodes);
};

const getLeafNodesFromItem = (item: Item): ExtractionNode[] => {
  const tree = buildTree(item.extraction_results);
  return tree.flatMap(getLeafNodes);
};

const ITableFromItems: React.FC<Props> = ({ items }) => {
  const [selectedHeaderKeys, setSelectedHeaderKeys] = useState<Set<number>>(new Set());
  const [headerRoots, setHeaderRoots] = useState<ExtractionNode[]>([]);
  const [headerRows, setHeaderRows] = useState<any[][]>([]);

  useEffect(() => {
    if (!items.length) return;

    const roots = buildTree(items[0].extraction_results);
    setHeaderRoots(roots);
    const allLeafs = roots.flatMap(getLeafNodes);
    setSelectedHeaderKeys(new Set(allLeafs.map(node => node.id)));
  }, [items]);

  useEffect(() => {
    if (!headerRoots.length) return;
    const maxDepth = Math.max(...headerRoots.map(getMaxDepth));
    const filteredRows: any[][] = [];

    headerRoots.forEach((node) => {
      collectFilteredHeaderRows(node, selectedHeaderKeys, 0, filteredRows, maxDepth);
    });

    setHeaderRows(filteredRows);
  }, [selectedHeaderKeys, headerRoots]);

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
  
  const isParentFullyChecked = (node: ExtractionNode): boolean => {
    if (!node.children?.length) return selectedHeaderKeys.has(node.id);
    return node.children.every((child) => isParentFullyChecked(child));
  };
  
  const isParentPartiallyChecked = (node: ExtractionNode): boolean => {
    if (!node.children?.length) return false;
    const childrenStatus = node.children.map(isParentFullyChecked);
    return childrenStatus.some(Boolean) && !childrenStatus.every(Boolean);
  };
  const isParentChecked = (node: ExtractionNode): boolean => {
    if (!node.children?.length) {
      return selectedHeaderKeys.has(node.id);
    }
    // Check if at least one child is selected
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
  
  
  const renderCheckboxTree = (nodes: ExtractionNode[]) => {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            {node.children?.length ? (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={isParentChecked(node)}
                    onChange={(e) => toggleParent(node, e.target.checked)}
                  />
                  {node.name}
                </label>
                {renderCheckboxTree(node.children)}
              </>
            ) : (
              <label>
                <input
                  type="checkbox"
                  checked={selectedHeaderKeys.has(node.id)}
                  onChange={() => toggleHeaderKey(node.id)}
                />
                {node.name}
              </label>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Select Columns:</strong>
        {renderCheckboxTree(headerRoots)}
      </div>

      <table border={1} cellPadding={6} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerRows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell) => (
                <th
                  key={cell.key}
                  colSpan={cell.props.colSpan}
                  rowSpan={cell.props.rowSpan}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px 15px',
                    textAlign: 'center',
                    backgroundColor: idx === 0 ? '#f2f2f2' : '#e6e6e6',
                    fontWeight: 600,
                    color: '#333',
                    verticalAlign: 'bottom'
                  }}
                >
                  {cell.props.children}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
        {items.map((item) => {
            const leafNodes = getLeafNodesFromItem(item).filter(node => selectedHeaderKeys.has(node.id));
            return (
              <tr key={item.paper_id}>
                {selectedHeaderKeys.size > 0 ? (
                  leafNodes.map((leaf) => (
                    <td
                      key={leaf.id}
                      style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}
                    >
                      {leaf.extraction_result?.result?.[0]?.value ?? ''}
                    </td>
                  ))
                ) : (
                  <td colSpan={headerRows[headerRows.length - 1]?.length || 1} style={{ textAlign: 'center' }}>
                    {/* No data to display */}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ITableFromItems;