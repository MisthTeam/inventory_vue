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
  // {
  //   type: "Monitor",
  //   variables: ["screen_resolution"],
  // },
  // {
  //   type: ["Monitor", "SFP", "Laptop", "Computer"],
  //   variables: ["model", "company"],
  // },
];

export default types;
