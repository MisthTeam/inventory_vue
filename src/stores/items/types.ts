import { Attribute } from "../attrubutes/types";
import { Device, Specification } from "../devices/types";

export type fetchItemsParams = {
  limit?: number;
  page?: number;
  type?: string;
  search?: string;
  filter?: ItemsFilterParams;
};

export type DashboardInfo = {
  clear: number;
  used: number;
  danger: number;
  unknown: number;
  devices: number;
};

export type DRAMReg = "reg" | "non-reg";

export type FilterProps = {
  volume: string | number;
  unit: string;
  socket: string;
  firstHhz: string | number;
  secondHhz: string | number;
  reg: DRAMReg | string;
  model: string;
  company: string;
  screen_resolution: string;
};

export type ItemsFilterParams = {
  [key: string]: string | number | string[];
};

export type fetchItemParams = {
  id: number;
};

export type addItemParams = {
  pn: string;
  device: {
    type: string;
    specification: Specification;
  };
  item: {
    name: string;
  };
  status?: number;
  attr: {
    [key: number]: { value: string };
  };
};

export type editItemParams = {
  id: number;
  meta: {
    [key: string]: string;
  };
  status: {
    id: number;
  };
  attributes?: {
    [key: number]: { value: string };
  };
};

export type deleteItemParams = {
  id: number;
};

export type fetchAttributeByTypeParams = {
  type: string;
};

export type Item = {
  id: number;
  attributes: Attribute[];
  user: {
    id: number;
    login: number;
  };
  status: {
    id: number;
    name: string;
    badge: string;
  };
  device: Device;
  meta: {
    name: string;
  };
  created_at: string;
};

export type Status = {
  id: number;
  name: string;
  badge: string;
};

export type ItemState = {
  data: Array<Item>;
  links?: {
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string;
    prev_page_url?: string;
  };
  specification?: any;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};
