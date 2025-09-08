const { ethers } = require("hardhat");
require("dotenv").config();
const { deployToken, mintTokens, grantMinter, setMetadata, transferTokens } = require("./token-ops");

// 🔄 Helper: retry failed RPC calls
async function withRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.error(`RPC attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

async function run() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // ✅ External addresses you provided
  const otherAddress = "0x23ce01731d2dF1ADD75AFc29CD2440f945204b82"; // new MINTER_ROLE
  const transferRecipient = "0x97E9E5082E44c9e618aAD746280c2EB702f28bE3"; // transfer target

  // 1) Deploy token
  const token = await withRetry(() =>
    deployToken("MyTokenX", "MTX", deployer)
  );

  // 2) Mint 5000 tokens to deployer
  await withRetry(() =>
    mintTokens(token, deployer.address, "5000", deployer)
  );

  // 3) Grant MINTER_ROLE to otherAddress
  await withRetry(() => grantMinter(token, otherAddress, deployer));

  // 4) (Optional) Set metadata if you have a registry contract deployed
  // const registryContract = ...; // deploy or load registry before using
  // await withRetry(() =>
  //   setMetadata(registryContract, token.address, "ipfs://...", deployer)
  // );

  // 5) Transfer 10 tokens from deployer to transferRecipient
  await withRetry(() =>
    transferTokens(token, deployer, transferRecipient, "10")
  );

  console.log("✅ Script finished successfully");
}

run().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});




/* const { ethers } = require("hardhat");
require("dotenv").config();
const { deployToken, mintTokens, grantMinter, setMetadata, transferTokens } = require("./token-ops");

async function withRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.error(`RPC attempt ${i+1} failed:`, err.message);
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}


async function run() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // External addresses you provided
  const otherAddress = "0x23ce01731d2dF1ADD75AFc29CD2440f945204b82";
  const transferRecipient = "0x97E9E5082E44c9e618aAD746280c2EB702f28bE3";

  // 1) Deploy token
  const token = await deployToken("MyTokenX", "MTX", deployer);

  // 2) Mint 5000 tokens to deployer
  await mintTokens(token, deployer.address, "5000", deployer);

  // 3) Grant MINTER_ROLE to otherAddress
  await grantMinter(token, otherAddress, deployer);

  // 4) (Optional) Set metadata if you have a registry contract deployed
  // await setMetadata(registryContract, token.address, "ipfs://...", deployer);

  // 5) Transfer 10 tokens from deployer to transferRecipient
  await transferTokens(token, deployer, transferRecipient, "10");

  console.log("✅ Script finished successfully");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); */


/* const { ethers } = require('hardhat');
const { deployToken, mintTokens, grantMinter, setMetadata, transferTokens } = require('./token-ops');

async function run() {
  const [deployer, other] = await ethers.getSigners();
  const token = await deployToken("MyTokenX", "MTX", deployer);
  await mintTokens(token, deployer.address, "5000", deployer);
  // give other address minter privileges
  await grantMinter(token, other.address, deployer);
  // set metadata (if you deployed registry earlier and have reference)
  // await setMetadata(registryContract, token.address, "ipfs://...", deployer);
  await transferTokens(token, deployer, "0xSOMEWHERE", "10");
}

run();
 */