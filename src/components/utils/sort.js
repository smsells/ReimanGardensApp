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

  if (date1Obj.year !== date2Obj.year) {
    return date1Obj.year - date2Obj.year;
  } else if (date1Obj.month !== date2Obj.month) {
    return date1Obj.month - date2Obj.month;
  } else if (date1Obj.day !== date2Obj.day) {
    return date1Obj.day - date2Obj.day;
  }
  return 0;
}