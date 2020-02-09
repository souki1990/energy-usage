import * as React from 'react';
import { useEffect, useState } from 'react';
import EnergyBarChart from './components/EnergyBarChart/EnergyBarChart';
import MeterReadings from './components/MeterReadings/MeterReadings';
import { MeterReading, EnergyUsage } from './types';
import * as api from './utils/api';

const App = () => {
  const [meterReadings, setMeterReadings] = useState<MeterReading[]>();
  const [energyUsageData, setEnergyUsageData] = useState<EnergyUsage[]>();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await api.getEnergyUsage();
    setMeterReadings(data.meterReading);
    setEnergyUsageData(data.energyUsageData);
  }

  return (
    <div>
      {energyUsageData && <EnergyBarChart energyUsageData={energyUsageData} />}
      {meterReadings && <MeterReadings meterReadings={meterReadings} />}
    </div>
  );
};

export default App;
