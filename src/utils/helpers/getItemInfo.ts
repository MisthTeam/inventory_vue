import { Item } from "@/stores/items/types";
import formatBytes from "./formatBytes";

export const infoItem = (item: Item, type: string) => {
  const infoObj = {
    HDD: formatBytes(Number(item.device.specification.volume)).join(" "),
    SSD: formatBytes(Number(item.device.specification.volume)).join(" "),
    CPU: item.device.specification.model,
    GPU: item.device.specification.model,
    NVMe: formatBytes(Number(item.device.specification.volume)).join(" "),
    networkCard: item.device.specification.connector,
    raidController: item.device.specification.model,
    DRAM: formatBytes(Number(item.device.specification.volume)).join(" "),
  };
  return infoObj[type as keyof typeof infoObj].toString();
};
