const { ethers } = require("hardhat");
const { getWalletHoldings } = require("./get-balances");

async function main() {
  const provider = ethers.provider;

  const walletAddress = "0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C";

  // 👇 Add the token contracts you deployed or want to track
  const tokenContracts = [
    "0x0420b7272B146816851de0A3Df10F957ea282197", // MyTokenX
    // add more deployed token addresses here
  ];

  const balances = await getWalletHoldings(walletAddress, tokenContracts, provider);

  console.log("📊 Holdings for", walletAddress, balances);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
