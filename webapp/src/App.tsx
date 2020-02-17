import * as React from 'react';
import { useEffect, useState } from 'react';
import EnergyBarChart from './components/EnergyBarChart/EnergyBarChart';
import MeterReadings from './components/MeterReadings/MeterReadings';
import { MeterReading, EnergyUsage } from './types';
import * as api from './utils/api';

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

  return (
    <div>
      {energyUsageData && <EnergyBarChart energyUsageData={energyUsageData} />}
      {meterReadings && <MeterReadings meterReadings={meterReadings} />}
      {error && <div> {error.message}</div>}
    </div>
  );
};

export default App;
