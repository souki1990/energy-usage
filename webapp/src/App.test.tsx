import { render, waitForElement } from '@testing-library/react';
import App from './App';
import React = require('react');
import * as api from './utils/api';

describe('App', () => {
  it('handles async useEffect', async () => {
    spyOn(api, 'getEnergyUsage').and.returnValue(
      Promise.resolve({
        meterReadings: [
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
        ],
        energyUsageData: [
          { date: '04/17', energyUsage: 179 },
          { date: '05/17', energyUsage: 243 },
          { date: '06/17', energyUsage: 268 },
          { date: '07/17', energyUsage: 183 },
          { date: '08/17', energyUsage: 167 }
        ]
      })
    );
    const { container } = render(<App />);
    const elements = await waitForElement(() =>
      container.getElementsByTagName('tr')
    );
    console.log(elements);
    expect(elements.length).toBe(4);
  });
});
