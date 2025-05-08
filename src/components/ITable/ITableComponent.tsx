import React, { useEffect, useState } from 'react';
import { Container, Table, Dropdown } from 'react-bootstrap';
import ColumnSelectorPanel from './ColumnSelectorPanel';
import "./itable.css"

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
  headerRows: any[][];
  selectedHeaderKeys: Set<number>;
  getLeafNodesFromItem: (item: Item) => ExtractionNode[];
}



const ITableFromItems: React.FC<Props> = ({ items,headerRows,selectedHeaderKeys, getLeafNodesFromItem }) => {
  
  return (
    <>
      <div className="table-toolbar d-flex  gap-3 align-items-center mb-3 p-2 bg-light border rounded">
       
        <div>
        <Dropdown drop="down">
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Select Filters
            </Dropdown.Toggle>

            <Dropdown.Menu as="div" className="p-3 column-selector-dropdown" popperConfig={{ modifiers: [{ name: 'flip', enabled: false }] }}>
              {/* <ColumnSelectorPanel
                nodes={headerRoots}
                selectedHeaderKeys={selectedHeaderKeys}
                setSelectedHeaderKeys={setSelectedHeaderKeys}
                toggleHeaderKey={toggleHeaderKey}
                toggleParent={toggleParent}
                isParentChecked={isParentChecked}
              /> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
        <Dropdown drop="down">
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Select Filters
            </Dropdown.Toggle>

            <Dropdown.Menu as="div" className="p-3 column-selector-dropdown" popperConfig={{ modifiers: [{ name: 'flip', enabled: false }] }}>
              {/* <ColumnSelectorPanel
                nodes={headerRoots}
                selectedHeaderKeys={selectedHeaderKeys}
                setSelectedHeaderKeys={setSelectedHeaderKeys}
                toggleHeaderKey={toggleHeaderKey}
                toggleParent={toggleParent}
                isParentChecked={isParentChecked}
              /> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
        <Dropdown drop="down">
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Select Filters
            </Dropdown.Toggle>

            <Dropdown.Menu as="div" className="p-3 column-selector-dropdown" popperConfig={{ modifiers: [{ name: 'flip', enabled: false }] }}>
              {/* <ColumnSelectorPanel
                nodes={headerRoots}
                selectedHeaderKeys={selectedHeaderKeys}
                setSelectedHeaderKeys={setSelectedHeaderKeys}
                toggleHeaderKey={toggleHeaderKey}
                toggleParent={toggleParent}
                isParentChecked={isParentChecked}
              /> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>


      <div style={{ overflowX: 'auto', width: '100%' }}>
        <Table bordered hover responsive className="custom-table">
          <thead>
            {headerRows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell) => (
                  <th
                    key={cell.key}
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
            {items.map((item) => {
              const leafNodes = getLeafNodesFromItem(item).filter(
                (node) => selectedHeaderKeys.has(node.id)
              );
              return (
                <tr key={item.paper_id} onClick={()=>{console.info("items", item.paper_id)}}>
                  {selectedHeaderKeys.size > 0 ? (
                    leafNodes.map((leaf) => (
                      <td
                        key={leaf.id}
                        style={{ padding: '10px', textAlign: 'left' }}
                      >
                        {leaf.extraction_result?.result?.[0]?.value ?? ''}
                      </td>
                    ))
                  ) : (
                    <td
                      colSpan={headerRows[headerRows.length - 1]?.length || 1}
                      style={{ textAlign: 'center' }}
                    >
                      {/* No data to display */}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

    </>
  );
};

export default ITableFromItems;
