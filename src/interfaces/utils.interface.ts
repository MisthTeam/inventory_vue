export enum DeviceSpecificationValue {
  text,
  dropdown,
  volume,
  integer,
}

type DeviceSpecification = {
  name: string;
  value: keyof typeof DeviceSpecificationValue;
  list?: string[];
};

export type DeviceTypes = {
  type: string;
  specification: DeviceSpecification[];
};
