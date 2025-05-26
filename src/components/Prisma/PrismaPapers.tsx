import React, { useState, useCallback } from 'react';
import { Card, Row, Col, Spinner, Pagination, InputGroup, Form } from 'react-bootstrap';
import { usePrismaPapers } from './hooks/usePrismaPapers';
import useMediaQuery from '../../hooks/useMediaQuery';
import PaperCard from './components/PaperCard';
import PaperDetailsModal from './components/PaperDetailsModal';
import { PrismaPapersProps, Paper } from './types';
import './prisma.css';

const PrismaPapers: React.FC<PrismaPapersProps> = ({
  activeTab,
  selectedMonth,
  activeState,
  activeStateText,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    papers,
    pagination,
    loading,
    changePage,
    searchPapers,
  } = usePrismaPapers(activeTab, selectedMonth, activeState);

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const handleOpenModal = useCallback((paper: Paper) => {
    setSelectedPaper(paper);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedPaper(null);
  }, []);

  const handleSearch = useCallback(() => {
    searchPapers(searchText);
  }, [searchText, searchPapers]);

  const handleCloseSearch = useCallback(() => {
    setSearchText('');
    setShowSearch(false);
    searchPapers('');
  }, [searchPapers]);

  return (
    <>

          <Card className="shadow-sm h-100 d-flex flex-column prisma-card">
            <Card.Header className="d-flex align-items-center py-3 prisma-header">
              <div className={`d-flex ${isMobile ? 'flex-column justify-content-end' : ''}`}>
                <span className={`d-flex align-items-center justify-content-between ${!isMobile && 'study-list-header'}`}>{activeStateText ? 'Study List' : ''}
                {isMobile && (
                  <div className="position-relative">
                    <button
                      className="btn btn-link prisma-text"
                      onClick={() => setShowSearch(!showSearch)}
                    >
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                    {showSearch && (
                      <div className="search-dropdown-mobile">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Search papers..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="prisma-input"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSearch();
                              }
                            }}
                            autoFocus
                          />
                          <InputGroup.Text 
                            role="button" 
                            onClick={handleSearch}
                            style={{ cursor: 'pointer' }}
                            className="prisma-input-text"
                          >
                            <i className="fa-solid fa-magnifying-glass" />
                          </InputGroup.Text>
                          <InputGroup.Text 
                            role="button" 
                            onClick={handleCloseSearch}
                            style={{ cursor: 'pointer' }}
                            className="prisma-input-text"
                          >
                            <i className="fa-solid fa-xmark" />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                    )}
                  </div>
                )}
                </span>
                <span className="prisma-text">{activeStateText}</span>
              </div>
              {!isMobile && <div className="ms-auto">
                {showSearch ? (
                  <div className="d-flex align-items-center">
                    <InputGroup style={{ width: '250px' }}>
                      <InputGroup.Text 
                        role="button" 
                        onClick={handleSearch}
                        style={{ cursor: 'pointer' }}
                        className="prisma-input-text"
                      >
                        <i className="fa-solid fa-magnifying-glass" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="prisma-input"
                      />
                    </InputGroup>
                    <button
                      className="btn btn-link prisma-text ms-2"
                      onClick={handleCloseSearch}
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-link prisma-text"
                    onClick={() => setShowSearch(true)}
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </button>
                )}
              </div>}
            </Card.Header>

            <Card.Body className="papers-body flex-grow-1 prisma-body">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <Spinner
                    animation="border"
                    className="text-primary"
                    style={{ width: '4rem', height: '4rem' }}
                  />
                </div>
              ) : papers && papers.length > 0 ? (
                papers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onViewDetails={handleOpenModal}
                  />
                ))
              ) : (
                <div className="text-center py-5">
                  <div className="p-4 border rounded prisma-empty-state">
                    <h5 className="prisma-text mb-0">No papers found</h5>
                  </div>
                </div>
              )}
            </Card.Body>

            <Card.Footer className="papers-footer prisma-footer">
              {pagination && (
                <Pagination className="mb-0 prisma-pagination">
                  <Pagination.First
                    disabled={!pagination.hasPrevious}
                    onClick={() => changePage(1)}
                  />
                  <Pagination.Prev
                    disabled={!pagination.hasPrevious}
                    onClick={() => changePage(pagination.currentPage - 1)}
                  />
                  <Pagination.Item disabled>
                    Page {pagination.totalPages > 0 ? pagination.currentPage : 0} of {pagination.totalPages}
                  </Pagination.Item>
                  <Pagination.Next
                    disabled={!pagination.hasNext}
                    onClick={() => changePage(pagination.currentPage + 1)}
                  />
                  <Pagination.Last
                    disabled={!pagination.hasNext}
                    onClick={() => changePage(pagination.totalPages)}
                  />
                </Pagination>
              )}
            </Card.Footer>
          </Card>
 
      <PaperDetailsModal
        paper={selectedPaper}
        show={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default React.memo(PrismaPapers);
