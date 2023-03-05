import { DeviceTypes } from "@/interfaces/utils.interface";

const types: DeviceTypes[] = [
  {
    type: "HDD",
    specification: [
      {
        name: "speed",
        value: "text",
      },
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "rotation",
        value: "text",
      },
      {
        name: "volume",
        value: "volume",
      },
    ],
  },
  {
    type: "SSD",
    specification: [
      {
        name: "speed",
        value: "text",
      },
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "volume",
        value: "volume",
      },
    ],
  },
  {
    type: "CPU",
    specification: [
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "hhz",
        value: "text",
      },
      {
        name: "ddr",
        value: "text",
      },
      {
        name: "socket",
        value: "text",
      },
      {
        name: "cores",
        value: "text",
      },
    ],
  },
  {
    type: "GPU",
    specification: [
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "volume",
        value: "volume",
      },
      {
        name: "hhz",
        value: "text",
      },
    ],
  },
  {
    type: "NVMe",
    specification: [
      {
        name: "speed",
        value: "text",
      },
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "volume",
        value: "volume",
      },
    ],
  },
  {
    type: "networkCard",
    specification: [
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "connector",
        value: "text",
      },
      {
        name: "countPorts",
        value: "integer",
      },
      {
        name: "speed",
        value: "text",
      },
    ],
  },
  {
    type: "raidController",
    specification: [
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "BBU",
        value: "text",
      },
      {
        name: "cash",
        value: "text",
      },
      {
        name: "maxDrivers",
        value: "text",
      },
    ],
  },
  {
    type: "DRAM",
    specification: [
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "volume",
        value: "volume",
      },
      {
        name: "hhz",
        value: "text",
      },
      {
        name: "reg",
        value: "dropdown",
        list: ["reg", "non-reg"],
      },
    ],
  },
  {
    type: "SFP",
    specification: [
      {
        name: "modes",
        value: "dropdown",
        list: ["Multimod", "Singlemod"],
      },
      {
        name: "freq",
        value: "text",
      },
      {
        name: "distance",
        value: "text",
      },
      {
        name: "connector",
        value: "text",
      },
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "form_factor",
        value: "text",
      },
    ],
  },
  {
    type: "Monitor",
    specification: [
      {
        name: "company",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "screen_resolution",
        value: "text",
      },
    ],
  },
  {
    type: "Laptop",
    specification: [
      {
        name: "account_number",
        value: "text",
      },
      {
        name: "position",
        value: "text",
      },
      {
        name: "owner",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "company",
        value: "text",
      },
      {
        name: "CPU",
        value: "text",
      },
    ],
  },
  {
    type: "Computer",
    specification: [
      {
        name: "account_number",
        value: "text",
      },
      {
        name: "position",
        value: "text",
      },
      {
        name: "owner",
        value: "text",
      },
      {
        name: "model",
        value: "text",
      },
      {
        name: "company",
        value: "text",
      },
      {
        name: "CPU",
        value: "text",
      },
    ],
  },
];

export default types;
