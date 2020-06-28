export const toLowerCase = s => String(s || '').toLowerCase();
export const toUpperCase = s => String(s || '').toUpperCase();
export const padZero = num => (num.toString().length < 2 ? `0${num}` : num);
// 2017-9-10 10:10 => 1505009400000
export const parseDateStr2Timestamp = (datestr='') => {
  const regex = /^(\d+)[-/](\d+)[-/](\d+)(?:[T\s](\d+):(\d+)(?::(\d+))?)?$/;
  const matched = datestr.toString().match(regex);
  if (matched) {
    const [, YYYY, MM, DD, HH = '00', mm = '00', ss = '00'] = matched;
    const timeString = `${YYYY}-${padZero(MM)}-${padZero(DD)}T${padZero(HH)}:${padZero(mm)}:${padZero(ss)}.000+08:00`;
    return Date.parse(timeString);
  }
  return Number.NaN;
}
