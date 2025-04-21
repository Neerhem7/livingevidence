import React from 'react';
import ReactECharts from 'echarts-for-react';

const PrismaGraph: React.FC = () => {
  const option = {
    tooltip: {},
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: [250, 40],
        roam: false,
        label: {
          show: true,
          formatter: '{b}',
          fontSize: 10,
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 10,
        edgeLabel: {
          fontSize: 12,
        },
        data: [
          { name: 'Initial search from databases\n(26,595 references)', x: 0, y: 0 },
          { name: 'Records identified through automatic update\n(6,185 references)', x: 300, y: 0 },
          { name: 'Records identified through manual update\n(37 references)', x: 600, y: 0 },
          { name: 'Total Records Identified\n(32,817 references)', x: 300, y: 100 },
          { name: 'Duplicates Records(4,717 references)', x: 600, y: 100 },
          { name: 'Records after removing duplicates\n (28,100 references)', x: 300, y: 200 },
          { name: 'Currently screening \n(280 references)', x: 600, y: 200 },
          { name: 'Records screened (27,820 references)', x: 300, y: 300 },
          { name: 'Excluded by title\n(24,628 references)', x: 600, y: 280 },
          { name: 'Excluded by abstract \n(1,280 references)', x: 600, y: 340 },
          { name: 'Full-text assessed for eligibility \n(1,912 references)', x: 300, y: 400 },
          { name: 'Excluded by full text review \n(1,880 references)', x: 600, y: 420 },
          { name: 'Studies included in systematic \n(n=10) \n(32 references)', x: 300, y: 480 },
          { name: 'Studies included in meta-analysis \n(n=10) \n(23 references)', x: 300, y: 580 },
        ],
        links: [
          { source: 'Initial search from databases\n(26,595 references)', target: 'Total Records Identified\n(32,817 references)' },
          { source: 'Records identified through automatic update\n(6,185 references)', target: 'Total Records Identified\n(32,817 references)' },
          { source: 'Records identified through manual update\n(37 references)', target: 'Total Records Identified\n(32,817 references)' },
          { source: 'Total Records Identified\n(32,817 references)', target: 'Duplicates Records(4,717 references)' },
          { source: 'Total Records Identified\n(32,817 references)', target: 'Records after removing duplicates\n (28,100 references)' },
          { source: 'Records after removing duplicates\n (28,100 references)', target: 'Records screened (27,820 references)' },
          { source: 'Records after removing duplicates\n (28,100 references)', target: 'Currently screening \n(280 references)' },
          { source: 'Records screened (27,820 references)', target: 'Excluded by title\n(24,628 references)' },
          { source: 'Records screened (27,820 references)', target: 'Excluded by abstract \n(1,280 references)' },
          { source: 'Records screened (27,820 references)', target: 'Excluded by abstract \n(1,280 references)' },
          { source: 'Records screened (27,820 references)', target: 'Full-text assessed for eligibility \n(1,912 references)' },
          { source: 'Full-text assessed for eligibility \n(1,912 references)', target: 'Excluded by full text review \n(1,880 references)' },
          { source: 'Full-text assessed for eligibility \n(1,912 references)', target: 'Studies included in systematic \n(n=10) \n(32 references)' },
          { source: 'Studies included in systematic \n(n=10) \n(32 references)', target: 'Studies included in meta-analysis \n(n=10) \n(23 references)' },
        ],
        lineStyle: {
          color: '#000',
          width: 2,
          curveness: 0.2,
        },
      },
    ],
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>PRISMA Merge Step</h3>
      <ReactECharts option={option} style={{ height: '1000px', width: '100%' }} />
    </div>
  );
};

export default PrismaGraph;
