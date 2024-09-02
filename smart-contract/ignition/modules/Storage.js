const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Storage", (m) => {

  const yub = m.contract("Storage");

  return { yub };
});
