// scripts/interact.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
  console.log("Using account:", user.address);

  const factoryAddress = process.env.FACTORY_ADDRESS;
  const routerAddress = process.env.ROUTER_ADDRESS;
  const stt = process.env.STT_ADDRESS || (await hre.ethers.getContract("TestERC20")).address;
  const ussd = process.env.USSD_ADDRESS || "0x22d33Bf4e4076C018539bEBD7213A505fa980676";

  const Factory = await hre.ethers.getContractAt("AMMFactory", factoryAddress);
  const Router = await hre.ethers.getContractAt("AMMRouter", routerAddress);
  const pairAddress = await Factory.getPair(stt, ussd);
  console.log("Pair:", pairAddress);

  const STT = await hre.ethers.getContractAt("TestERC20", stt);
  const USSD = await hre.ethers.getContractAt("IERC20Minimal", ussd);

  // For test token we already own a chunk; approve router to move tokens
  const amountStt = hre.ethers.utils.parseEther("1000");
  const amountUssd = hre.ethers.utils.parseEther("2000"); // example numbers

  // If USSD is a real token on Somnia, make sure user has USSD prior
  console.log("Approving router...");
  const approve1 = await STT.approve(routerAddress, amountStt);
  await approve1.wait();

  // If USSD is test token, approve it too; if real USSD, ensure you have it and approve
  try {
    const approve2 = await USSD.approve(routerAddress, amountUssd);
    await approve2.wait();
  } catch (e) {
    console.log("USSD approve failed — maybe it's not an ERC20 you control here. Make sure account has USSD and approved router.");
  }

  console.log("Adding liquidity...");
  const add = await Router.addLiquidity(stt, ussd, amountStt, amountUssd, user.address);
  await add.wait();
  console.log("Liquidity added.");

  // perform a swap: swap 10 STT for USSD (example)
  const amountIn = hre.ethers.utils.parseEther("10");
  const amountOutMin = 0; // for test only; in production set slippage min
  await STT.approve(routerAddress, amountIn);
  const swap = await Router.swapExactTokensForTokens(amountIn, amountOutMin, stt, ussd, user.address);
  await swap.wait();
  console.log("Swap executed.");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
