import { MeterReading, EnergyUsage } from '../types';
import * as momentUtils from './momentUtils';

/**
 * Get energy usage
 * @param meterReadings
 */
export const calculateEnergyUsage = (
  meterReadings: MeterReading[]
): EnergyUsage[] => {
  const energyUsageData: EnergyUsage[] = [];
  for (let i = 1; i < meterReadings.length; i++) {
    const energyUsage =
      meterReadings[i].cumulative - meterReadings[i - 1].cumulative;
    energyUsageData.push({
      date: getDate(meterReadings[i].readingDate),
      energyUsage
    });
  }
  return energyUsageData;
};

/**
 * Estimate end of the month meter reading
 * @param meterReading1
 * @param meterReading2
 * @param month
 */
export const calculateMonthlyUsage = (meterReading1, meterReading2) => {
  //if is end of the month return the value
  return Math.trunc(
    meterReading1.cumulative +
      (momentUtils.getDaysUntilMonthEnd(meterReading1.readingDate) /
        momentUtils.getDiffInDays(
          meterReading2.readingDate,
          meterReading1.readingDate
        )) *
        (meterReading2.cumulative - meterReading1.cumulative)
  );
};

/**
 * Calculate Meter Readings
 * @param electricityData
 */
export const calculateMeterReadings = electricityData => {
  const meterReadings: MeterReading[] = [];
  for (let i = 1; i < electricityData.length - 1; i++) {
    checkValidData(electricityData[i]);
    checkValidData(electricityData[i + 1]);
    meterReadings.push({
      cumulative: calculateMonthlyUsage(
        electricityData[i],
        electricityData[i + 1]
      ),
      readingDate: momentUtils
        .getEndOfTheMonth(electricityData[i].readingDate)
        .toString(),
      unit: 'kWh'
    });
  }
  return [
    electricityData[0],
    ...meterReadings,
    electricityData[electricityData.length - 1]
  ];
};

/**
 * Format the date
 * @param date
 */
const getDate = (date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit'
  }).format(new Date(date));
};

/**
 * Check if a meter reading is valid data
 * @param meterReading
 */
const checkValidData = (meterReading: MeterReading) => {
  const dateRegex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
  const cumulativeRegex = /^\d{5}$/;

  if (!meterReading.readingDate) throw Error('Undefined date');

  if (!RegExp(dateRegex).test(meterReading.readingDate.split('T')[0])) {
    throw new Error('Wrong date format');
  }

  if (!meterReading.cumulative) {
    throw Error('Undefined cumulative');
  }

  if (!meterReading.cumulative.toString().match(cumulativeRegex)) {
    throw new Error(`${meterReading.cumulative} Cumulative is not a 5 digit`);
  }
};
