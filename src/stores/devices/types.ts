import { deviceTypes } from "@/utils/helpers";

export type Device = {
  id: number;
  pn: string;
  type: string;
  specification: {
    [key: string]: string;
  };
  created_at: string;
};

export type deviceDTOParams = {
  pn: string;
  device: {
    specification: Specification;
    type: string;
  };
  item: {
    name: string;
  };
  attr: Attr;
};

export type DeviceState = {
  data: Array<Device>;
  links?: {
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string;
    prev_page_url?: string;
  };
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type deviceEditParams = {
  id: number;
  pn: string;
  specification: Specification;
  type: string;
};

export type deviceSaveParams = {
  id: number;
  pn: string;
  specification: Specification;
  type: string;
};

export type Specification = { [key: string]: string };
export type Attr = {
  [key: number]: {
    value: string;
  };
};

export type UpdateAttr = {
  attrId: number;
  value: string;
};

export type fetchDevicesParams = {
  limit: number;
  page: number;
  type?: string;
  search?: string;
};
