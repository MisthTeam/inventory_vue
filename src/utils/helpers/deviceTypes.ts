const types = [
  {
    id: 1,
    type: "HDD",
    specification: ["speed", "company", "model", "rotation", "volume"],
  },
  {
    id: 2,
    type: "SSD",
    specification: ["speed", "company", "model", "volume"],
  },
  {
    id: 3,
    type: "CPU",
    specification: ["company", "model", "hhz", "ddr", "socket", "cores"],
  },
  {
    id: 4,
    type: "GPU",
    specification: ["company", "model", "volume", "hhz"],
  },
  {
    id: 5,
    type: "NVMe",
    specification: ["speed", "company", "model", "volume"],
  },
  {
    id: 6,
    type: "networkCard",
    specification: ["company", "model", "connector", "countPorts", "speed"],
  },
  {
    id: 7,
    type: "raidController",
    specification: ["company", "model", "BBU", "cash", "maxDrivers"],
  },
  {
    id: 8,
    type: "DRAM",
    specification: ["company", "model", "volume", "hhz", "reg"],
  },
];

export default types;
