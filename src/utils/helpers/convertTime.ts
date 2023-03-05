const convertTime = (time: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("ru-RU", options).format(new Date(time));

export default convertTime;
