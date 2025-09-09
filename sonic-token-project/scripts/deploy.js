// scripts/deploy.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 🔹 CHANGE THESE FOR DIFFERENT PAIRS
//   const TOKEN_A = "0xd0c6db65b4B6Fd9B0FF325520A30c2aa726133f2"; // GX
  // const TOKEN_A = "0xF22eF0085f6511f70b01a68F360dCc56261F768a"; // STT
  // const TOKEN_B = "0x22d33Bf4e4076C018539bEBD7213A505fa980676"; // USSD
  const TOKEN_A = "0xeBB8f797C19C29f3A0c1e0952f106c4a83Ca0F65"; // WS - Sonic EVM
  // const TOKEN_A = "0xf0a21805a0Be4164783bDa5b2133F32506291C87"; // GX - SONIC
  const TOKEN_B = "0x65ad6C756ED11Ff84ACF9eDa8B5891F945aecD1F"; // USDD - SONIC
  
  // Deploy Factory
  const Factory = await hre.ethers.getContractFactory("AMMFactory");
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log("Factory deployed:", factory.address);

  // Deploy Router
  const Router = await hre.ethers.getContractFactory("AMMRouter");
  const router = await Router.deploy(factory.address);
  await router.deployed();
  console.log("Router deployed:", router.address);

  // Create Pair
  const tx = await factory.createPair(TOKEN_A, TOKEN_B);
  await tx.wait();
  const pairAddress = await factory.getPair(TOKEN_A, TOKEN_B);
  console.log("Pair created:", pairAddress);

  console.log("\n✅ Deployment complete. Save these:");
  console.log("FACTORY_ADDRESS =", factory.address);
  console.log("ROUTER_ADDRESS  =", router.address);
  console.log("PAIR_ADDRESS    =", pairAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
