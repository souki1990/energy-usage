import * as meterReadingUtils from './meterReadingUtils';

const meterReadings = [
  {
    cumulative: 17580,
    readingDate: '2017-03-28T00:00:00.000Z',
    unit: 'kWh'
  },
  {
    cumulative: 17759,
    readingDate: '2017-04-15T00:00:00.000Z',
    unit: 'kWh'
  },
  {
    cumulative: 18002,
    readingDate: '2017-05-08T00:00:00.000Z',
    unit: 'kWh'
  }
];
const output = [
  {
    cumulative: 17580,
    readingDate: '2017-03-28T00:00:00.000Z',
    unit: 'kWh'
  },
  { cumulative: 17917, readingDate: '2017-04-30', unit: 'kWh' },
  {
    cumulative: 18002,
    readingDate: '2017-05-08T00:00:00.000Z',
    unit: 'kWh'
  }
];

describe('Api test', () => {
  it('Test calculation of meter readings', () => {
    expect(
      meterReadingUtils.calculateMeterReadings(meterReadings)
    ).toStrictEqual(output);
  });

  it('Test calculation of Monthly Energy Usage', () => {
    expect(
      meterReadingUtils.calculateMonthlyUsage(output[0], output[1])
    ).toEqual(17611);
  });

  it('Test calculation of energy usage', () => {
    expect(meterReadingUtils.calculateEnergyUsage(meterReadings)).toEqual([
      { date: '04/17', energyUsage: 179 },
      { date: '05/17', energyUsage: 243 }
    ]);
  });
});
