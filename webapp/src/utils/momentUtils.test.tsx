import * as momentUtils from './momentUtils';

describe('Moment utils tests', () => {
  it('Test if it is the end of the month', () => {
    expect(momentUtils.isEndOfMonth('2017-03-31T00:00:00.000Z')).toBe(true);
  });

  it('Test difference between to dates', () => {
    expect(
      momentUtils.getDiffInDays(
        '2017-03-28T00:00:00.000Z',
        '2017-03-18T00:00:00.000Z'
      )
    ).toEqual(10);
  });

  it('Test if its the end of the month', () => {
    expect(momentUtils.getEndOfTheMonth('2017-05-26T00:00:00.000Z')).toEqual(
      '2017-05-31'
    );
    expect(momentUtils.getEndOfTheMonth('2017-04-26T00:00:00.000Z')).toEqual(
      '2017-04-30'
    );
    expect(momentUtils.getEndOfTheMonth('2017-02-26T00:00:00.000Z')).toEqual(
      '2017-02-28'
    );
  });
});
