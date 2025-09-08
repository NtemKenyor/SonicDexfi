// scripts/interact.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
  console.log("Using account:", user.address);

  // 🔹 CONFIG (set these in .env or change directly)
  const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
  const ROUTER_ADDRESS  = process.env.ROUTER_ADDRESS;
  // const TOKEN_A         = process.env.TOKEN_A; // e.g. WSTT
  // const TOKEN_B         = process.env.TOKEN_B; // e.g. USSD
  // const TOKEN_A = "0xd0c6db65b4B6Fd9B0FF325520A30c2aa726133f2"; // GX
  const TOKEN_A = "0xf0a21805a0Be4164783bDa5b2133F32506291C87"; // STT (i.e WSTT)
  const TOKEN_B = "0x65ad6C756ED11Ff84ACF9eDa8B5891F945aecD1F"; // USSD


  // Load contracts
  const Factory = await hre.ethers.getContractAt("AMMFactory", FACTORY_ADDRESS);
  const Router  = await hre.ethers.getContractAt("AMMRouter", ROUTER_ADDRESS);
  const pairAddress = await Factory.getPair(TOKEN_A, TOKEN_B);
  console.log("Pair:", pairAddress);

  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address owner) view returns (uint256)"
  ];

  const TokenA = await hre.ethers.getContractAt(ERC20_ABI, TOKEN_A);
  const TokenB = await hre.ethers.getContractAt(ERC20_ABI, TOKEN_B);
  const Pair   = await hre.ethers.getContractAt("AMMPair", pairAddress);

  // Metadata
  const [nameA, symbolA, decimalsA] = await Promise.all([
    TokenA.name(),
    TokenA.symbol(),
    TokenA.decimals()
  ]);
  const [nameB, symbolB, decimalsB] = await Promise.all([
    TokenB.name(),
    TokenB.symbol(),
    TokenB.decimals()
  ]);

  console.log(`\n🔹 Token A: ${nameA} (${symbolA}) @ ${TOKEN_A}`);
  console.log(`🔹 Token B: ${nameB} (${symbolB}) @ ${TOKEN_B}\n`);

  // --------------------------
  // 1. ADD LIQUIDITY
  // --------------------------
  const amountA = hre.ethers.utils.parseUnits("50", decimalsA);
  const amountB = hre.ethers.utils.parseUnits("1", decimalsB);

  console.log("Approving router for liquidity...");
  await (await TokenA.approve(ROUTER_ADDRESS, amountA)).wait();
  await (await TokenB.approve(ROUTER_ADDRESS, amountB)).wait();

  console.log("Adding liquidity...");
  await (await Router.addLiquidity(TOKEN_A, TOKEN_B, amountA, amountB, user.address)).wait();
  console.log(`✅ Liquidity added: ${hre.ethers.utils.formatUnits(amountA, decimalsA)} ${symbolA} + ${hre.ethers.utils.formatUnits(amountB, decimalsB)} ${symbolB}`);

  // --------------------------
  // 2. PREDICT PRICE (based on reserves)
  // --------------------------
  let [reserve0, reserve1] = await Pair.getReserves();
  const token0 = (TOKEN_A.toLowerCase() < TOKEN_B.toLowerCase()) ? TOKEN_A : TOKEN_B;

  const priceAinB = token0 === TOKEN_A
    ? reserve1 / reserve0
    : reserve0 / reserve1;
  const priceBinA = 1 / priceAinB;

  console.log(`📊 Current Price: 1 ${symbolA} = ${priceAinB} ${symbolB}`);
  console.log(`📊 Current Price: 1 ${symbolB} = ${priceBinA} ${symbolA}`);

  // --------------------------
  // 3. SWAP A → B
  // --------------------------
  const amountIn = hre.ethers.utils.parseUnits("10", decimalsA);
  await (await TokenA.approve(ROUTER_ADDRESS, amountIn)).wait();
  await (await Router.swapExactTokensForTokens(amountIn, 0, TOKEN_A, TOKEN_B, user.address)).wait();
  console.log(`✅ Swapped 10 ${symbolA} → ${symbolB}`);

  // Update reserves after swap
  [reserve0, reserve1] = await Pair.getReserves();
  const newPriceAinB = token0 === TOKEN_A
    ? reserve1 / reserve0
    : reserve0 / reserve1;
  console.log(`📊 New Price after swap: 1 ${symbolA} = ${newPriceAinB} ${symbolB}`);

  // --------------------------
  // 4. REMOVE LIQUIDITY
  // --------------------------
  const liquidity = await Pair.balanceOf(user.address);
  await (await Pair.approve(ROUTER_ADDRESS, liquidity)).wait();
  await (await Router.removeLiquidity(TOKEN_A, TOKEN_B, liquidity, user.address)).wait();
  console.log("✅ Liquidity removed via Router");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
