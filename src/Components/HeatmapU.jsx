import React from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
const value = [
  { date: '2024/01/11', count:2 },
  { date: '2024/04/12', count:2 },
  { date: '2024/05/01', count:5 },
  { date: '2024/05/02', count:5 },
  { date: '2024/05/03', count:1 },
  { date: '2024/05/04', count:11 },
  { date: '2024/05/08', count:32 },
  { date: '2024/08/25', count:32 },
];

const HeatmapU = () => {
  return (
    <HeatMap
      value={value}
      width={600}
      style={{ color: 'green', '--rhm-rect-active': 'green',width:"50vw" }}

      startDate={new Date('2024/01/01')}
      rectRender={(props, data) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip placement="top" content={`count: ${data.count || 0}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  )
};
export default HeatmapU