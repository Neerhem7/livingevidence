import React, { useState, useEffect } from 'react';
import { Table, Modal, Card, Pagination } from 'react-bootstrap';
import { ExtractionNode, Item } from './type';
import "./itable.css"
import { useAppDispatch } from '../../redux/store';
import { fetchITableData } from '../../redux/itableSlice';


type Pagination = {
  total: number;
  page: number;
  size: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

interface Props {
  pagination: Pagination | null;
  items: Item[];
  headerRows: any[][];
  selectedHeaderKeys: Set<number>;
  getLeafNodesFromItem: (item: Item) => ExtractionNode[];
  headerRoots: ExtractionNode[];
}


const ITableFromItems: React.FC<Props> = ({ pagination, items, headerRows, selectedHeaderKeys, getLeafNodesFromItem, headerRoots }) => {
  const dispatch = useAppDispatch();
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

  const changePage = (page: number) => {

    if (pagination) {
      if (page === 1) {
        dispatch(fetchITableData({ page: 1, size: pagination.size }));
      } else if (page === pagination.total_pages) {
        dispatch(fetchITableData({ page: pagination.total_pages, size: pagination.size }));
      } else {
        dispatch(fetchITableData({ page, size: pagination.size }));
      }
    }
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
  }, [selectedHeaderKeys]);

  return (
    <>
<Card.Body className="p-0">
  <div className="table-wrapper">
    <table className="table table-bordered table-striped custom-table mb-0">
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
            <tr
              key={`${item.paper_id}-${index}`}
              onClick={() => setActivePaper(item.paper_id)}
            >
              {leafNodes.map((leaf, index) => (
                <td key={`${item.paper_id}-${leaf.id}-${index}`}>
                  {leaf.extraction_result?.result?.[0]?.value.toString() ?? ''}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</Card.Body>



      <Card.Footer>
        {pagination && (
          <Pagination className='mb-0'>
            <Pagination.First disabled={!pagination.has_previous} onClick={() => changePage(1)} />
            <Pagination.Prev disabled={!pagination.has_previous} onClick={() => changePage(pagination.page - 1)} />
            <Pagination.Item disabled>Page</Pagination.Item>
            <Pagination.Item disabled>{pagination.total_pages > 0 ? pagination.page : 0}</Pagination.Item>
            <Pagination.Item disabled> of</Pagination.Item>
            <Pagination.Item disabled>{pagination.total_pages}</Pagination.Item>
            <Pagination.Next disabled={!pagination.has_next} onClick={() => changePage(pagination.page + 1)} />
            <Pagination.Last disabled={!pagination.has_next} onClick={() => changePage(pagination.total_pages)} />
          </Pagination>)}
      </Card.Footer>
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
