const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Foo", (m) => {
  const lock = m.contract("Foo");

  return { lock };
});
