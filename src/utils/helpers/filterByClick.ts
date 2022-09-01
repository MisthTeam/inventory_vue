import convertedValues from "./convertedBytes";
import { infoItem } from "./getItemInfo";
import { Item } from "@/stores/items/types";

type sortedType = {
  filterObject?: {
    [key: string]: string | number;
  };
  type: string | number;
};

export const filterByClick = (item: Item, type: string, info: string | number): Partial<sortedType> => {
  switch (type) {
    case "status":
      return {
        filterObject: {
          status: info,
        },
        type: "",
      };

    case "type":
      return {
        filterObject: {
          status: "",
        },
        type: info,
      };

    case "info":
      const getInfoByType = infoItem(item, String(info));
      if (["HDD", "SSD", "NVMe", "DRAM"].includes(String(info))) {
        const splitingInfo = getInfoByType.split(" ");
        const unit = splitingInfo[1];
        const volume = Number(splitingInfo[0]);
        const howMuchMultiply = convertedValues[unit as keyof typeof convertedValues];
        const capacity = volume * howMuchMultiply; // Значение в байтах

        const filterObject = {
          volume: capacity,
          unit,
        };

        return {
          filterObject,
          type: info,
        };
      }
      if (["CPU", "GPU", "raidController"].includes(String(info))) {
        const filterObject = {
          model: getInfoByType,
        };

        return {
          filterObject,
          type: info,
        };
      }
      if (["networkCard"].includes(String(info))) {
        const filterObject = {
          connector: getInfoByType,
        };

        return {
          filterObject,
          type: info,
        };
      }
    default:
      return {
        filterObject: {
          status: "",
        },
        type: "",
      };
  }
};
