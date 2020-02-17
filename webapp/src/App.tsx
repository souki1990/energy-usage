import * as React from 'react';
import { useEffect, useState } from 'react';
import EnergyBarChart from './components/EnergyBarChart/EnergyBarChart';
import MeterReadings from './components/MeterReadings/MeterReadings';
import { MeterReading, EnergyUsage } from './types';
import * as api from './utils/api';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family:graphik, -apple-system, helvetica, futura, sans-serif;
    color: #003366;
    background-color: rgb(242, 242, 242);
  }
`;
const App = () => {
  const [meterReadings, setMeterReadings] = useState<MeterReading[]>();
  const [energyUsageData, setEnergyUsageData] = useState<EnergyUsage[]>();
  const [error, SetError] = useState<any>();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await api.getEnergyUsage();
    if (!data.error) {
      setMeterReadings(data.meterReadings);
      setEnergyUsageData(data.energyUsageData);
    } else {
      SetError(data.error);
    }
  }
  return React.useMemo(() => {
    return (
      <>
        <GlobalStyle />
        <div>
          {energyUsageData && (
            <EnergyBarChart energyUsageData={energyUsageData} />
          )}
          {meterReadings && <MeterReadings meterReadings={meterReadings} />}
          {error && <div> {error.message}</div>}
        </div>
      </>
    );
  }, [energyUsageData, meterReadings, error]);
};
export default App;
