export function dateCompare(date1, date2) {
  const date1Arr = date1.split("/");
  const date1Obj = {
    month: parseInt(date1Arr[0], 10),
    day: parseInt(date1Arr[1], 10),
    year: parseInt(date1Arr[2], 10),
  };
  const date2Arr = date2.split("/");
  const date2Obj = {
    month: parseInt(date2Arr[0], 10),
    day: parseInt(date2Arr[1], 10),
    year: parseInt(date2Arr[2], 10),
  };

  const totalDays1 = date1Obj.year * 365 + date1Obj.month * 30 + date1Obj.day;
  const totalDays2 = date2Obj.year * 365 + date2Obj.month * 30 + date2Obj.day;
  var difference = totalDays1 - totalDays2;

  return difference;
}
