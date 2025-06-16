import React, { useState } from 'react';
import { Card, Row, Col, Spinner, Pagination, InputGroup, Form, Button } from 'react-bootstrap';
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

  const handleOpenModal = (paper: Paper) => {
    setSelectedPaper(paper);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaper(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPapers(searchText);
  };

  const handleCloseSearch = () => {
    setSearchText('');
    setShowSearch(false);
    searchPapers('');
  };

  return (
    <Card className="shadow-sm h-100 d-flex flex-column prisma-card">
      <Card.Header className="d-flex align-items-center py-3 prisma-header">
        <div className="d-flex align-items-center flex-grow-1">
          {activeStateText && (
            <span className="ms-2 prisma-subtitle">{activeStateText}</span>
          )}
        </div>
        {!isMobile && (
          <div className="d-flex align-items-center">
            {showSearch ? (
              <div className="d-flex align-items-center">
                <Form onSubmit={handleSearch} className="me-2">
                  <InputGroup size="sm">
                    <Form.Control
                      type="text"
                      placeholder="Search papers..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(e);
                        }
                      }}
                    />
                    <Button type="submit" variant="primary">
                      <i className="fa-solid fa-magnifying-glass" />
                    </Button>
                  </InputGroup>
                </Form>
                <button
                  className="btn btn-link prisma-text"
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
          </div>
        )}
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
              <h5 className="mb-3">No papers found</h5>
              {/* <p className="text-muted mb-0">
                Try adjusting your search criteria or check back later for updates.
              </p> */}
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

      <PaperDetailsModal
        paper={selectedPaper}
        show={showModal}
        onClose={handleCloseModal}
      />
    </Card>
  );
};

export default PrismaPapers;
