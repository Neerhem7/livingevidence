import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Card } from 'react-bootstrap';
import { useAppDispatch, RootState } from "../redux/store";
import ITableTable from '../components/ITable/ITableTable';
import { ExtractionNode, Item } from '../components/ITable/type';
import ColumnSelectorPanel from '../components/ITable/ColumnSelectorPanel';
import TableToolBar from '../components/ITable/TableToolBar';
import {
  fetchITableData
} from "../redux/itableSlice";

const ITable = () => {
  const dispatch = useAppDispatch();

  const { items, filters, pageInfo } = useSelector((state: RootState) => state.itable);
  const [selectedHeaderKeys, setSelectedHeaderKeys] = useState<Set<number>>(new Set());
  const [headerRoots, setHeaderRoots] = useState<ExtractionNode[]>([]);
  const [headerRows, setHeaderRows] = useState<any[][]>([]);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [parentAbbreviations, setParentAbbreviations] = useState<string[]>([]);


  const buildTree = (nodes: ExtractionNode[]): ExtractionNode[] => {
    const map = new Map<number, ExtractionNode>();
    const roots: ExtractionNode[] = [];

    nodes.forEach((node) => {
      map.set(node.id, { ...node, children: [], isExpand: true, });
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
      <th key={node.id} colSpan={colSpan} rowSpan={rowSpan}>{node.name}</th>
    );

    if (!isLeaf) {
      node.children?.forEach((child) =>
        collectFilteredHeaderRows(child, selectedKeys, depth + 1, rows, maxDepth)
      );

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

  useEffect(() => {
    dispatch(fetchITableData({}));
  }, []);

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

  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <h1>Interactive Table</h1>
        </Col>
      </Row>
      <Row className="m-4" style={{ height: '800px' }}>
        <Col sm={3} className="overflow-auto" style={{ height: '100%' }}>
          <ColumnSelectorPanel
            nodes={headerRoots}
            selectedHeaderKeys={selectedHeaderKeys}
            setSelectedHeaderKeys={setSelectedHeaderKeys}
            togglePanel={() => setPanelCollapsed(!panelCollapsed)}
            panelCollapsed={panelCollapsed}
            parentAbbreviations={parentAbbreviations}
          />
        </Col>
        <Col sm={9} className="d-flex flex-column gap-4 overflow-auto" style={{ height: '100%' }}>
          <Card><TableToolBar filters={filters} /></Card>
          <Card className=" flex-grow-1 overflow-auto">
            <ITableTable
              items={items}
              getLeafNodesFromItem={getLeafNodesFromItem}
              selectedHeaderKeys={selectedHeaderKeys}
              headerRows={headerRows}
              headerRoots={headerRoots}
              pagination={pageInfo}
            />
          </Card>
        </Col>
      </Row>

    </>
  );
}

export default ITable
