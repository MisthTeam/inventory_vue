const types = [
  {
    type: ["HDD", "SSD", "GPU", "NVMe", "DRAM"],
    variables: ["volume"],
  },
  {
    type: "CPU",
    variables: ["socket", "hhz"],
  },
  {
    type: "GPU",
    variables: ["hhz"],
  },
  {
    type: "DRAM",
    variables: ["reg"],
  },
];

export default types;
