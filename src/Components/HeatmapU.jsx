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

const HeatmapU = ({infos}) => {
  return (
    <HeatMap
      value={infos}
      width={600}
      style={{ color: 'green', '--rhm-rect-active': 'green',width:"50vw" }}
      rectProps={{
        rx: 3.5
      }}
      startDate={new Date('2024/01/01')}
      rectRender={(props, infos) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip placement="top" content={`${infos.count || 0} device(s) used on ${infos.date || 0}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  )
};
export default HeatmapU