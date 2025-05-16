import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

import { useAppDispatch } from '../../redux/store';
import { fetchITableData } from '../../redux/itableSlice';
import './itable.css'
interface Props {
  filters: any[]
}
interface Filter {
  node_id: number;
  label: string;
  type: 'radio button' | 'check box';
  values: number[];
}

const TableToolBar: React.FC<Props> = ({ filters }) => {
  const dispatch = useAppDispatch();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const updateSelectedFilters = (nodeId: number, value: number, isRadio: boolean) => {
    setSelectedFilters(prev => {
      const existing = prev.find(f => f.node_id === nodeId);
      if (isRadio) {
        if (existing) {
          return prev.map(f =>
            f.node_id === nodeId
              ? { ...f, values: [value] }
              : f
          );
        } else {
          const original = filters.find(f => f.node_id === nodeId)!;
          return [...prev, { ...original, values: [value] }];
        }
      } else {
        if (existing) {
          const exists = existing.values.includes(value);
          const newValues = exists
            ? existing.values.filter(v => v !== value)
            : [...existing.values, value];

          if (newValues.length === 0) {
            return prev.filter(f => f.node_id !== nodeId);
          }

          return prev.map(f =>
            f.node_id === nodeId
              ? { ...f, values: newValues }
              : f
          );
        } else {
          const original = filters.find(f => f.node_id === nodeId)!;
          return [...prev, { ...original, values: [value] }];
        }
      }
    });
  };

  useEffect(() => {
    dispatch(fetchITableData({ filters: selectedFilters }));
  }, [selectedFilters]);

  return (
    <>
      <div className="table-toolbar d-flex  justify-content-between align-items-center m-2 p-2">
        <div className="d-flex  gap-3 align-items-center">
          {selectedFilters.map(filter => (
            <div key={filter.node_id} className="badge bg-secondary me-2">
              {filter.label}: {filter.values.length}
            </div>
          ))}
        </div>


        {!showFiltersPanel ?
          (<Button
            variant='btn-primary'
            className="btn btn-primary ms-2"
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
          >
            Filters
          </Button>)
          : (<div className="d-flex align-items-end gap-2 ms-2">
            <Button
            variant="outline-danger"
            onClick={() => setSelectedFilters([])}
          >
            Clear Filters
          </Button> 
          <Button
            variant="secondary"
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
          >
         <i className="fa-solid fa-minimize"></i>
          </Button> 
          </div>)
        }
      </div>



      {showFiltersPanel && (
        <div
          className="filters-panel d-flex align-items-start justify-content-between p-2 mb-2 bg-light"
          style={{ whiteSpace: 'nowrap' }}
        >
          {/* Filter Cards */}
          <div className="d-flex gap-3  overflow-auto  flex-nowrap">
            {filters.map((filter) => (
             <Card
             key={filter.node_id}
             style={{ minWidth: '200px', maxHeight: '250px', flex: '0 0 auto' }}
           >
             <Card.Header className="text-center fw-bold">
               {filter.label}
             </Card.Header>
           
             <Card.Body className="p-2">
               <div className="d-flex flex-wrap" style={{ columnGap: '10px' }}>
                 {(() => {
                   const valuesPerColumn = 6; 
                   const chunks = [];
           
                   for (let i = 0; i < filter.values.length; i += valuesPerColumn) {
                     chunks.push(filter.values.slice(i, i + valuesPerColumn));
                   }
           
                   return chunks.map((chunk, idx) => (
                     <div key={idx} className="d-flex flex-column">
                       {chunk.map((value: number) => {
                         const selectedFilter = selectedFilters.find(f => f.node_id === filter.node_id);
                         const selected =
                           filter.type === 'radio button'
                             ? selectedFilter?.values[0] === value
                             : selectedFilter?.values.includes(value);
           
                         return (
                           <Form.Check
                             key={value}
                             type={filter.type === 'radio button' ? 'radio' : 'checkbox'}
                             name={`filter-${filter.node_id}`}
                             label={value}
                             checked={!!selected}
                             onChange={() =>
                               updateSelectedFilters(filter.node_id, value, filter.type === 'radio button')
                             }
                             className="mb-1"
                           />
                         );
                       })}
                     </div>
                   ));
                 })()}
               </div>
             </Card.Body>
           </Card>
           
            ))}
          </div>


        </div>
      )}



    </>
  )
}

export default TableToolBar
