export type Attribute = {
  id: number;
  name: string;
  device_type: string;
  meta: {
    type: string;
    list?: string[];
  };
  value: string;
  created_at: string;
  updated_at: string;
};

export type AddAttributeDTO = {
  name: string;
  device_type: string;
  meta: {
    type: string;
    list?: string[];
  };
};

export type editAttributeDTO = {
  name: string;
  device_type: string;
  meta: {
    type: string;
    list?: string[];
  };
};

export type UpdateAttr = {
  attrId: number;
  value: string;
};
