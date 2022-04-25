import { format } from "date-fns";
import { ru } from "date-fns/locale";

const convertTime = (time) =>
  format(new Date(time), "Q MMMM yyyy", {
    locale: ru,
  });

export default convertTime;
