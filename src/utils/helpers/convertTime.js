import { format } from "date-fns";
import { ru } from "date-fns/locale";

const convertTime = (time) =>
  format(new Date(time), "dd MMMM yyyy", {
    locale: ru,
  });

export default convertTime;
