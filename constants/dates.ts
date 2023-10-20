export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const day = days[new Date().getDay()];
export const month = months[new Date().getMonth()];

export const monthYearString = `${new Date().getDate()} ${month}, ${new Date().getFullYear()}`;
