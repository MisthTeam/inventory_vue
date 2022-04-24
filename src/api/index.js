import axios from "@/core/axios";
import authModel from "./auth";
import itemsModel from "./items";

export default {
  auth: authModel(axios),
  items: itemsModel(axios),
};
