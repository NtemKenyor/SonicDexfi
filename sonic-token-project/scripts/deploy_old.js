// scripts/deploy.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("AMMFactory");
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log("Factory deployed:", factory.address);

  const Router = await hre.ethers.getContractFactory("AMMRouter");
  const router = await Router.deploy(factory.address);
  await router.deployed();
  console.log("Router deployed:", router.address);

  // optional: use existing STT and USSD addresses (pass via env vars), otherwise deploy test tokens
  const STT = process.env.STT_ADDRESS;
  const USSD = process.env.USSD_ADDRESS || "0x22d33Bf4e4076C018539bEBD7213A505fa980676";

  if (!STT || STT === "") {
    console.log("No STT_ADDRESS provided — deploying TestERC20 as STT for testing");
    const Test = await hre.ethers.getContractFactory("TestERC20");
    const stt = await Test.deploy("Somnia Token Test", "STT", 18, hre.ethers.utils.parseEther("1000000"));
    await stt.deployed();
    console.log("Test STT:", stt.address);
    // set STT to this address for pair creation below
    sttAddress = stt.address;
  }

  const sttAddress = STT && STT !== "" ? STT : (await hre.ethers.getContractAt("TestERC20", undefined).catch(()=>undefined));
  // NOTE: if STT provided we use it; otherwise use the deployed test token above
  const sttAddr = STT && STT !== "" ? STT : undefined; // keep it simple

  // Create pair (use addresses from env if provided)
  const tokenA = process.env.STT_ADDRESS && process.env.STT_ADDRESS !== "" ? process.env.STT_ADDRESS : (await hre.ethers.getContract("TestERC20")).address;
  const tokenB = process.env.USSD_ADDRESS && process.env.USSD_ADDRESS !== "" ? process.env.USSD_ADDRESS : "0x22d33Bf4e4076C018539bEBD7213A505fa980676";

  const tx = await factory.createPair(tokenA, tokenB);
  await tx.wait();
  console.log("Pair created for:", tokenA, tokenB);

  console.log("Done. Save addresses:");
  console.log("FACTORY=", factory.address);
  console.log("ROUTER=", router.address);
  console.log("PAIR=", await factory.getPair(tokenA, tokenB));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
