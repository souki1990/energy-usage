import * as React from 'react';
import { useState } from 'react';
import { EnergyUsage } from '../../types';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const EnergyBarChart = (props: {
  [key: string]: any;
  energyUsageData: EnergyUsage[];
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  return (
    <div className="meter-chart">
      <h2>Energy Usage</h2>
      <BarChart width={width} height={400} data={props.energyUsageData}>
        <XAxis dataKey="date" />
        <YAxis dataKey="energyUsage" />
        <CartesianGrid horizontal={false} />
        <Tooltip />
        <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
      </BarChart>
    </div>
  );
};

export default EnergyBarChart;
