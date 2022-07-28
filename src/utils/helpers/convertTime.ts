import dayjs from "dayjs";

const convertTime = (time: string) => dayjs(time).format("DD.MM.YY");

export default convertTime;
