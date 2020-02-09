import * as React from 'react';
import { MeterReading } from '../../types';
import './MeterReading.css';

const MeterReadings = (props: {
  [key: string]: any;
  meterReadings: MeterReading[];
}) => {
  const meterReadings = props.meterReadings;
  return (
    <div className="meter-reading">
      <h2>Meter Readings</h2>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Reading</th>
            <th>Unit</th>
          </tr>
          {meterReadings.map(reading => (
            <tr key={reading.readingDate}>
              <td>{new Date(reading.readingDate).toLocaleDateString()}</td>
              <td>{reading.cumulative}</td>
              <td>{reading.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeterReadings;
