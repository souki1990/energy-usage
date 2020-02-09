import { MeterReading, EnergyUsage } from '../types';

export async function getEnergyUsage(): Promise<{
  meterReading: MeterReading[];
  energyUsageData: EnergyUsage[];
}> {
  try {
    const response = await fetch(
      'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json'
    );
    if (!response.ok) {
      throw response;
    }
    const data = await response.json();
    return {
      meterReading: data.electricity,
      energyUsageData: transformData(data.electricity)
    };
  } catch (err) {}
}

const transformData = (meterReadings: MeterReading[]): EnergyUsage[] => {
  const energyUsageData: EnergyUsage[] = [];
  for (let i = 0; i < meterReadings.length - 2; i++) {
    const energyUsage =
      meterReadings[i + 1].cumulative - meterReadings[i].cumulative;
    energyUsageData.push({
      date: getDate(meterReadings[i + 1].readingDate),
      energyUsage
    });
  }
  debugger;
  return energyUsageData;
};
const getDate = (date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit'
  }).format(new Date(date));
};
