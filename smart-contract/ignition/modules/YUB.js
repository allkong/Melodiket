const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("YUBModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 10000000000n);

  const yub = m.contract("YUBToken", [initialSupply]);

  return { yub };
});
