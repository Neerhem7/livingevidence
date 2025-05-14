import React from 'react'
import {Dropdown } from 'react-bootstrap';

const TableToolBar = () => {
  return (
    <div>
          <div className="table-toolbar d-flex  gap-3 align-items-center mb-3 p-2 border rounded">
       
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
    </div>
  )
}

export default TableToolBar
