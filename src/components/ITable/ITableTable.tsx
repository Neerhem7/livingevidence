import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { ExtractionNode, Item } from './type';
import "./itable.css"


interface Props {
  items: Item[];
  headerRows: any[][];
  selectedHeaderKeys: Set<number>;
  getLeafNodesFromItem: (item: Item) => ExtractionNode[];
  headerRoots: ExtractionNode[];
}

const ITableFromItems: React.FC<Props> = ({ items, headerRows, selectedHeaderKeys, getLeafNodesFromItem, headerRoots }) => {
  const [selectedLeafNode, setSelectedLeafNode] = useState<Map<number, any[]>>(new Map());
  const [allLeafNode, setAllLeafNode] = useState<Map<number, any[]>>(new Map());
  const [activePaper, setActivePaper] = useState(Number);

  const renderHeaderTree = (
    headers: any[],
    leafNode: any[],
    level = 0
  ): any => {
    return (
      <ul style={{ paddingLeft: `${level * 26}px` }}>
        {headers.map((header) => {
          const value =
            leafNode.find((leaf) => leaf.id === header.id)?.extraction_result?.result?.[0]?.value ?? '';

          return (
            <li key={header.id} className={`mb-2 d-flex align-items-center gap-2 list-level-${level}`}>
              <div className="d-flex align-items-center justify-content-between">
                <strong>{header.name}:</strong> {value}
              </div>
              {header.children?.length > 0 &&
                renderHeaderTree(header.children, leafNode, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };


  useEffect(() => {
    const selectedLeafMap = new Map();
    const allLeafMap = new Map();

    items.forEach((item) => {
      const allLeafs = getLeafNodesFromItem(item);
      const filteredLeafs = allLeafs.filter((node) => selectedHeaderKeys.has(node.id));
      selectedLeafMap.set(item.paper_id, filteredLeafs);
      allLeafMap.set(item.paper_id, allLeafs);
    });

    setSelectedLeafNode(selectedLeafMap);
    setAllLeafNode(allLeafMap);
  }, [items, selectedHeaderKeys]);

  return (
    <>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <Table bordered hover responsive className="custom-table">
          <thead>
            {headerRows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell) => (
                  <th
                    key={`${idx}-${cell.key}`}
                    colSpan={cell.props.colSpan}
                    rowSpan={cell.props.rowSpan}
                  >
                    {cell.props.children}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {items.map((item, index) => {
              const leafNodes = selectedLeafNode.get(item.paper_id) || [];
              return (
                <tr key={`${item.paper_id}-${index}`} onClick={() => { setActivePaper(item.paper_id) }}>
                  {leafNodes.map((leaf, index) => (
                    <td
                      key={`${item.paper_id}-${leaf.id}-${index}`}
                      style={{ padding: '10px', textAlign: 'left' }}
                    >
                      {leaf.extraction_result?.result?.[0]?.value ?? ''}
                    </td>
                  ))
                  }
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal
        show={!!activePaper}
        onHide={() => setActivePaper(0)}
        dialogClassName="custom-modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>Paper ID: {activePaper}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto', padding: '1rem' }}>
          {activePaper ? (
            renderHeaderTree(
              headerRoots,
              allLeafNode.get(activePaper) || []
            )
          ) : (
            <p>No paper selected.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ITableFromItems;
