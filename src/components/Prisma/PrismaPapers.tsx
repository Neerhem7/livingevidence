import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Card, Container, Row, Col, Modal, Button, Spinner, Badge } from 'react-bootstrap';
import './prisma.css'
import {
  fetchCurrentPapers,
  fetchInitialPapers,
  fetchLivingPapers,
} from "../../redux/prismaPaperSlice";

type Paper = {
  id: number;
  title: string;
  authors: string;
  publish_date: string;
  abstract: string;
  decision: string;
  is_duplicate: string;
  upload_source: string;
};

type Pagination = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

interface PrismaPapersProps {
  activeTab: string;
  selectedMonth: string;
  activeState: string;
  activeStateText: string;
}

const PrismaPapers: React.FC<PrismaPapersProps> = ({ activeTab, selectedMonth, activeState , activeStateText}) => {
  const dispatch = useAppDispatch();

  const { current, initial, living, loading } = useSelector((state: RootState) => state.prismaPaper);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYearMonth = `${currentYear}-${currentMonth}`;

  const handleOpenModal = (paper: any) => {
    setSelectedPaper(paper);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaper(null);
  };

  const changePage = (page: number) => {

    if (pagination) {
      if (page === 1) {
        if (activeTab === "Current State") {
          dispatch(fetchCurrentPapers({ stage: activeState, page: 1, size: pagination.pageSize }));
        } else if (activeTab === "Initial Search") {
          dispatch(fetchInitialPapers({ stage: activeState, page: 1, size: pagination.pageSize }));
        } else if (activeTab === "Living Search") {
          dispatch(fetchLivingPapers({ stage: activeState, month: selectedMonth, page: 1, size: pagination.pageSize }));
        }
      } else if (page === pagination.totalPages) {
        if (activeTab === "Current State") {
          dispatch(fetchCurrentPapers({ stage: activeState, page: pagination.totalPages, size: pagination.pageSize }));
        } else if (activeTab === "Initial Search") {
          console.info("state initial search ", papers, pagination);
          dispatch(fetchInitialPapers({ stage: activeState, page: pagination.totalPages, size: pagination.pageSize }));
        } else if (activeTab === "Living Search") {
          dispatch(fetchLivingPapers({ stage: activeState, month: selectedMonth, page: pagination.totalPages, size: pagination.pageSize }));
        }
      } else {
        if (activeTab === "Current State") {
          dispatch(fetchCurrentPapers({ stage: activeState, page, size: pagination.pageSize }));
        } else if (activeTab === "Initial Search") {
          dispatch(fetchInitialPapers({ stage: activeState, page, size: pagination.pageSize }));
        } else if (activeTab === "Living Search") {
          dispatch(fetchLivingPapers({ stage: activeState, month: selectedMonth, page, size: pagination.pageSize }));
        }
      }
    }
  };

  const searchPaper =()=>{
    const pageSize = pagination?.pageSize || 10;
    if (activeTab === "Current State") {
      dispatch(fetchCurrentPapers({ stage: activeState, page: 1, size: pageSize , searchKey:searchText}));
    } else if (activeTab === "Initial Search") {
      dispatch(fetchInitialPapers({ stage: activeState, page: 1, size: pageSize, searchKey:searchText }));
    } else if (activeTab === "Living Search") {
      dispatch(fetchLivingPapers({ stage: activeState, month: selectedMonth, page: 1, size: pageSize, searchKey:searchText }));
    }
  }
  const closeSearch=()=>{
    const pageSize = pagination?.pageSize || 10;
    if (activeTab === "Current State") {
      dispatch(fetchCurrentPapers({ stage: activeState, page: 1, size: pageSize}));
    } else if (activeTab === "Initial Search") {
      dispatch(fetchInitialPapers({ stage: activeState, page: 1, size: pageSize }));
    } else if (activeTab === "Living Search") {
      dispatch(fetchLivingPapers({ stage: activeState, month: selectedMonth, page: 1, size: pageSize }));
    }
  }

  useEffect(() => {
    if (activeTab === "Current State") {
      setPapers(current.papers);
      setPagination(current.pagination);
    } else if (activeTab === "Initial Search") {
      setPagination(initial.pagination);
      setPapers(initial.papers);
    } else if (activeTab === "Living Search") {
      setPagination(living.pagination);
      setPapers(living.papers);
    }


  }, [activeTab, current, initial, living]);




  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="d-flex align-items-center">
              <strong>Study List | </strong>
              <span className="ms-2">{activeStateText}</span>

              <div className="ms-auto d-flex align-items-center">
                {showSearch && (
                  <div className="input-group me-2" style={{ width: '220px' }}>
                    <span className="input-group-text" style={{cursor:'pointer'}}>
                      <i className="fa-solid fa-magnifying-glass"  onClick={()=>{
                        searchPaper()
                      }}></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                )}

                <i
                  className={`fa-solid ${showSearch ? 'fa-xmark' : 'fa-magnifying-glass'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (showSearch) {
                      setSearchText('');
                      setShowSearch(false);
                      closeSearch();
                    } else {
                      setShowSearch(true);
                    }
                  }}
                ></i>
              </div>
            </Card.Header>
            <Card.Body className="papers-body">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '700px' }}>
                  <Spinner
                    animation="border"
                    style={{ width: '100px', height: '100px', color: '#4F959D' }}
                  />
                </div>
              ) : papers && papers.length > 0 ? (
                Array.isArray(papers) && papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="d-flex justify-content-between align-items-center border-bottom py-3 paper-row"
                  >

                    <div >
                      <small className="date-circle text-center">{paper.publish_date.split(' ')[0]}</small>
                    </div>

                    <div className="flex-grow-1 mx-3 ">
                      <span className="paper-title text-truncate-2">{paper.title}</span>
                      <Badge bg="secondary">Full text publications</Badge> <Badge bg="success">Abstracts presentations</Badge>

                    </div>

                    <div className='btn btn-primary'>
                      <i
                        className="fa-solid fa-ellipsis"
                        onClick={() => handleOpenModal(paper)}
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <div className="p-4 border rounded shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                    {/* <i className="bi bi-info-circle" style={{ fontSize: '2rem', color: '#6c757d' }}></i> */}
                    <h5 className="mt-3" style={{ color: '#6c757d' }}>No papers found</h5>
                    {/* <p className="text-muted">Try changing filters or check back later.</p> */}
                  </div>
                </div>
              )}
            </Card.Body>

            <Card.Footer className="d-flex align-items-center justify-content-between papers-footer">
              <div className="">
                {pagination && (
                  <>
                    <Button
                      variant="link"
                      disabled={!pagination.hasPrevious}
                      onClick={() => changePage(1)}
                    >
                      First
                    </Button>
                    <Button
                      variant="link"
                      disabled={!pagination.hasPrevious}
                      onClick={() => changePage(pagination.currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {pagination.totalPages > 0 ? pagination.currentPage : 0} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="link"
                      disabled={!pagination.hasNext}
                      onClick={() => changePage(pagination.currentPage + 1)}
                    >
                      Next
                    </Button>
                    <Button
                      variant="link"
                      disabled={!pagination.hasNext}
                      onClick={() => changePage(pagination.totalPages)}
                    >
                      Last
                    </Button>
                  </>
                )}
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Paper Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPaper && (
            <>
              <h5>{selectedPaper.title}</h5>
              <p className=" small"><strong>Authors:</strong> {selectedPaper.authors}</p>
              <p className="small"><strong>Publish Date:</strong> {selectedPaper.publish_date}</p>
              <p className=" small"><strong>Decision:</strong> {selectedPaper.decision}</p>
              <p className="small"><strong>Source:</strong> {selectedPaper.upload_source}</p>
              <p className=""><strong>Abstract:</strong><br /> {selectedPaper.abstract}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PrismaPapers;
