import { format } from "date-fns";
import { ru } from "date-fns/locale";

const convertTime = (time: string) =>
  format(new Date(time), "dd.mm.yy", {
    locale: ru,
  });

export default convertTime;
