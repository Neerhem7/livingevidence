import React, { useState } from 'react'
import { Card, Form, Button, Dropdown } from 'react-bootstrap';
import './itable.css'

interface Props {
  filters: any[];
  onFiltersChange: (filters: Filter[]) => void;
}

interface Filter {
  node_id: number;
  label: string;
  type: 'radio button' | 'check box';
  values: number[];
}

const TableToolBar: React.FC<Props> = ({ filters, onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [searchTerms, setSearchTerms] = useState<{ [key: number]: string }>({});
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const updateSelectedFilters = (nodeId: number, value: number, isRadio: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = (() => {
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
      })();

      // Call the callback with the new filters
      onFiltersChange(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchTerms({});
    onFiltersChange([]);
  };

  return (
    <>
      <div className="table-toolbar d-flex justify-content-between align-items-center m-2 p-2">
        <div className="row w-100 g-2">
          {filters.map((filter) => {
            const searchTerm = searchTerms[filter.node_id] || '';
            const filteredValues = filter.values.filter((value: number) =>
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );

            return (
              <div className="col-2" key={filter.node_id}>
                <Dropdown className="w-100 dropdown-hover">
                  <Dropdown.Toggle
                    className="w-100 text-truncate"
                    variant="info"
                    id={`dropdown-${filter.node_id}`}
                  >
                    {filter.label}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="p-2"
                    style={{ maxHeight: '250px', overflowY: 'auto', minWidth: '100%' }}
                  >
                    {/* Search Input */}
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      className="mb-2"
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerms((prev) => ({
                          ...prev,
                          [filter.node_id]: e.target.value
                        }))
                      }
                    />

                    {/* Render options */}
                    {filter.type === 'radio button' ? (
                      filteredValues.map((value: number) => {
                        const selected =
                          selectedFilters.find((f) => f.node_id === filter.node_id)?.values[0] === value;
                        return (
                          <Form.Check
                            key={value}
                            type="radio"
                            label={value.toString()}
                            name={`radio-${filter.node_id}`}
                            checked={selected}
                            onChange={() => updateSelectedFilters(filter.node_id, value, true)}
                            className="mb-1"
                          />
                        );
                      })
                    ) : (
                      filteredValues.map((value: number) => {
                        const selected =
                          selectedFilters.find((f) => f.node_id === filter.node_id)?.values.includes(value);
                        return (
                          <Form.Check
                            key={value}
                            type="checkbox"
                            label={value.toString()}
                            checked={selected}
                            onChange={() => updateSelectedFilters(filter.node_id, value, false)}
                            className="mb-1"
                          />
                        );
                      })
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            );
          })}

          <div className="col-2">
            <Button
              variant="outline-danger"
              onClick={clearFilters}
              className="w-100"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableToolBar;
