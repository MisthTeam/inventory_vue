export type Device = {
  id: number;
  pn: string;
  type: string;
  specification: Specification;
  created_at: string;
};

export interface updateSpecification {
  value: string | number;
  target: string;
}

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

export type VolumeSpecification = {
  [key: string]: string;
};

export type Specification = {
  [key: string]: string | number;
};
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
