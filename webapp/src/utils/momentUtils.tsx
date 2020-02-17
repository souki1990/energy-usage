import * as moment from 'moment';

/**
 * Check whether a moment object is the end of the month.
 * Ignore the time part.
 * @param {moment} mmt
 */
export const isEndOfMonth = date => {
  // startOf allows to ignore the time component
  // we call moment(mmt) because startOf and endOf mutate the momentj object.
  return moment
    .utc(moment(date))
    .startOf('day')
    .isSame(
      moment
        .utc(moment(date))
        .endOf('month')
        .startOf('day')
    );
};

/**
 * Returns the difference between two moment objects in number of days.
 * @param {moment} mmt1
 * @param {moment} mmt2
 */
export const getDiffInDays = (date1, date2) => {
  return moment(date1).diff(moment(date2), 'days');
};

/**
 * Return the number of days between the given moment object
 * and the end of the month of this moment object.
 * @param {moment} mmt
 */
export const getDaysUntilMonthEnd = date => {
  return getDiffInDays(moment.utc(moment(date)).endOf('month'), moment(date));
};

/**
 * @param {moment} mmt
 */
export const getEndOfTheMonth = dateValue => {
  const date = new Date(dateValue);
  return moment
    .utc(moment(date))
    .endOf('month')
    .format('YYYY-MM-DD')
    .toString();
};
