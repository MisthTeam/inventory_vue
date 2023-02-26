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
  {
    id: 9,
    type: "SFP",
    specification: ["modes", "freq", "distance", "connector", "company", "model", "form_factor"],
  },
  {
    id: 10,
    type: "Monitor",
    specification: ["company", "model", "screen_resolution"],
  },
  {
    id: 11,
    type: "Laptop",
    specification: ["account_number", "position", "owner", "model", "company", "CPU"],
  },
  {
    id: 12,
    type: "Computer",
    specification: ["account_number", "position", "owner", "model", "company", "CPU"],
  },
];

export default types;
