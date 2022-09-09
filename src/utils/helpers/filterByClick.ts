import convertedValues from "./convertedBytes";
import { infoItem } from "./getItemInfo";
import { Item } from "@/stores/items/types";

type sortedType = {
  filterObject?: {
    [key: string]: string | number;
  };
  type: string | number;
  search?: string;
};

export const filterByClick = (
  item: Item,
  type: string,
  info: string | number,
  customSpecificaton?: string,
): Partial<sortedType> => {
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

    case "PN":
      return {
        type: "",
        filterObject: {
          status: "",
        },
        search: String(info),
      };

    case "info":
      const getInfoByType = infoItem(item, String(info));
      if (customSpecificaton) {
        const specification = item.device.specification[customSpecificaton];
        if (!specification) {
          return {
            filterObject: {
              status: "",
            },
            type: "",
          };
        }
        return {
          filterObject: {
            [customSpecificaton]: specification,
            status: "",
          },
          type: info,
        };
      }
      if (["HDD", "SSD", "NVMe", "DRAM"].includes(String(info))) {
        const splitingInfo = getInfoByType.split(" ");
        const unit = splitingInfo[1];
        const volume = Number(splitingInfo[0]);
        const howMuchMultiply = convertedValues[unit as keyof typeof convertedValues];
        const capacity = volume * howMuchMultiply; // Значение в байтах

        const filterObject = {
          volume: capacity,
          unit,
          status: "",
        };

        return {
          filterObject,
          type: info,
        };
      }
      if (["CPU", "GPU", "raidController"].includes(String(info))) {
        const filterObject = {
          model: getInfoByType,
          status: "",
        };

        return {
          filterObject,
          type: info,
        };
      }
      if (["networkCard"].includes(String(info))) {
        const filterObject = {
          connector: getInfoByType,
          status: "",
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
