import * as React from 'react';
import { MeterReading } from '../../types';
import './MeterReading.css';
import styled from 'styled-components';
import { css } from 'styled-components';

const commonTableStyle = css`
  border: grey solid 1px;
`;

const Table = styled.table`
  margin: 0 auto;
  width: 100%;
  border-radius: 25px;
  border-style: hidden;
  box-shadow: 0 0 0 1px grey;
  border-collapse: collapse;
`;

const Tbody = styled.tbody`
  margin: 0 auto;
  width: 100%;
  ${commonTableStyle};
`;

const Th = styled.th`
  text-align: center;
  ${commonTableStyle};
`;

const Tr = styled.tr`
  text-align: center;
  height: 50px;
`;

const Td = styled.td`
  ${commonTableStyle};
`;
const MeterReadings = (props: {
  [key: string]: any;
  meterReadings: MeterReading[];
}) => {
  const meterReadings = props.meterReadings;
  return (
    <div className="meter-reading">
      <h2>Meter Readings</h2>
      <Table>
        <Tbody>
          <Tr>
            <Th>Date</Th>
            <Th>Reading</Th>
            <Th>Unit</Th>
          </Tr>
          {meterReadings.map(reading => (
            <Tr key={reading.readingDate}>
              <Td>{new Date(reading.readingDate).toLocaleDateString()}</Td>
              <Td>{reading.cumulative}</Td>
              <Td>{reading.unit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default MeterReadings;
