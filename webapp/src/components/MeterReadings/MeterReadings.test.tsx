import 'jest';
import { render } from '@testing-library/react';
import React = require('react');
import MeterReadings from './MeterReadings';

describe('App', () => {
  const data = [
    {
      cumulative: 17600,
      readingDate: '2017-03-31T00:00:00.000Z',
      unit: 'kWh'
    },
    {
      cumulative: 17859,
      readingDate: '2017-04-30T00:00:00.000Z',
      unit: 'kWh'
    },
    {
      cumulative: 18102,
      readingDate: '2017-05-31T00:00:00.000Z',
      unit: 'kWh'
    }
  ];
  it('MeterReadings is rendered', () => {
    const { container, getByText } = render(
      <MeterReadings meterReadings={data} />
    );
    expect(container.getElementsByTagName('tr').length).toBe(4);
  });
});
