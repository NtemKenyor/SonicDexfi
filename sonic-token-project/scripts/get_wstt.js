// scripts/wrap.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
  console.log("Using account:", user.address);

  // WSTT contract (Wrapped STT)
  const WSTT_ADDRESS = "0xF22eF0085f6511f70b01a68F360dCc56261F768a";

  // Minimal WETH/WSTT interface
  const IWSTT = [
    "function deposit() payable",
    "function withdraw(uint wad)",
    "function balanceOf(address owner) view returns (uint256)"
  ];

  const WSTT = await hre.ethers.getContractAt(IWSTT, WSTT_ADDRESS);

  // 🔹 1. Wrap 1 STT → 1 WSTT
  const tx = await WSTT.connect(user).deposit({ value: hre.ethers.utils.parseEther("5") });
  await tx.wait();
  console.log("✅ Wrapped 1 STT into WSTT");

  // 🔹 2. Show WSTT balance
  const balance = await WSTT.balanceOf(user.address);
  console.log("WSTT balance:", hre.ethers.utils.formatEther(balance));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
