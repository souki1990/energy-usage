import { MeterReading, EnergyUsage } from '../types';
import * as meterReadingUtils from './meterReadingUtils';

export async function getEnergyUsage(): Promise<{
  meterReadings?: MeterReading[];
  energyUsageData?: EnergyUsage[];
  error?: any;
}> {
  try {
    const response = await fetch(
      'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json'
    );
    if (!response.ok) {
      throw { error: response.statusText };
    }
    const data = await response.json();
    const meterReadings = meterReadingUtils.calculateMeterReadings(
      data.electricity
    );
    const energyUsageData = meterReadingUtils.calculateEnergyUsage(
      meterReadings
    );
    return {
      meterReadings,
      energyUsageData
    };
  } catch (err) {
    return { error: err };
  }
}
