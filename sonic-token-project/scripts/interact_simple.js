// scripts/interact.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
  console.log("Using account:", user.address);

  // 🔹 SET THESE FROM YOUR DEPLOY OUTPUT
  const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
  const ROUTER_ADDRESS  = process.env.ROUTER_ADDRESS;
  const TOKEN_A = "0xd0c6db65b4B6Fd9B0FF325520A30c2aa726133f2"; // GX
  const TOKEN_B = "0x22d33Bf4e4076C018539bEBD7213A505fa980676"; // USSD

  const Factory = await hre.ethers.getContractAt("AMMFactory", FACTORY_ADDRESS);
  const Router = await hre.ethers.getContractAt("AMMRouter", ROUTER_ADDRESS);

  const pairAddress = await Factory.getPair(TOKEN_A, TOKEN_B);
  console.log("Pair:", pairAddress);

  const GX   = await hre.ethers.getContractAt("IERC20Minimal", TOKEN_A);
  const USSD = await hre.ethers.getContractAt("IERC20Minimal", TOKEN_B);

  const amountGX   = hre.ethers.utils.parseEther("1000");
  const amountUSSD = hre.ethers.utils.parseEther("2000");

  console.log("Approving router...");
  await (await GX.approve(ROUTER_ADDRESS, amountGX)).wait();
  await (await USSD.approve(ROUTER_ADDRESS, amountUSSD)).wait();

  console.log("Adding liquidity...");
  await (await Router.addLiquidity(TOKEN_A, TOKEN_B, amountGX, amountUSSD, user.address)).wait();
  console.log("✅ Liquidity added.");

  console.log("Swapping 10 GX for USSD...");
  const amountIn = hre.ethers.utils.parseEther("10");
  await (await GX.approve(ROUTER_ADDRESS, amountIn)).wait();
  await (await Router.swapExactTokensForTokens(amountIn, 0, TOKEN_A, TOKEN_B, user.address)).wait();
  console.log("✅ Swap complete.");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
