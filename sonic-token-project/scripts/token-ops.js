// scripts/token-ops.js
require('dotenv').config();
const { ethers } = require('hardhat'); // When run via `npx hardhat run`
const fs = require('fs');
const path = require('path');

async function deployToken(name, symbol, signer) {
  console.log(`Deploying MyToken (${name} / ${symbol}) with deployer ${await signer.getAddress()}`);
  const MyToken = await ethers.getContractFactory("MyToken", signer);
  const token = await MyToken.deploy(name, symbol);
  await token.deployed();
  console.log("MyToken deployed at:", token.address);
  return token;
}

async function deployMetadataRegistry(adminAddress, signer) {
  console.log("Deploying MetadataRegistry with admin:", adminAddress);
  const Registry = await ethers.getContractFactory("MetadataRegistry", signer);
  const reg = await Registry.deploy(adminAddress);
  await reg.deployed();
  console.log("MetadataRegistry deployed at:", reg.address);
  return reg;
}

async function mintTokens(tokenContract, to, amount, signer) {
  // amount is a plain number or string in human units; convert using token decimals (default 18)
  const decimals = await tokenContract.decimals();
  const value = ethers.utils.parseUnits(String(amount), decimals);
  const tx = await tokenContract.connect(signer).mint(to, value);
  const receipt = await tx.wait();
  console.log(`Minted ${amount} tokens to ${to} — tx: ${receipt.transactionHash}`);
  return receipt;
}

async function grantMinter(tokenContract, account, signer) {
  const MINTER_ROLE = ethers.utils.id("MINTER_ROLE");
  const tx = await tokenContract.connect(signer).grantRole(MINTER_ROLE, account);
  const receipt = await tx.wait();
  console.log(`Granted MINTER_ROLE to ${account} — tx: ${receipt.transactionHash}`);
  return receipt;
}

async function revokeMinter(tokenContract, account, signer) {
  const MINTER_ROLE = ethers.utils.id("MINTER_ROLE");
  const tx = await tokenContract.connect(signer).revokeRole(MINTER_ROLE, account);
  const receipt = await tx.wait();
  console.log(`Revoked MINTER_ROLE from ${account} — tx: ${receipt.transactionHash}`);
  return receipt;
}

async function transferTokens(tokenContract, fromSigner, to, amount) {
  const decimals = await tokenContract.decimals();
  const value = ethers.utils.parseUnits(String(amount), decimals);
  const tx = await tokenContract.connect(fromSigner).transfer(to, value);
  const receipt = await tx.wait();
  console.log(`Transferred ${amount} tokens to ${to} — tx: ${receipt.transactionHash}`);
  return receipt;
}

async function setMetadata(registryContract, tokenAddress, metadataURI, signer) {
  const tx = await registryContract.connect(signer).setMetadata(tokenAddress, metadataURI);
  const receipt = await tx.wait();
  console.log(`Metadata set for ${tokenAddress} => ${metadataURI} — tx: ${receipt.transactionHash}`);
  return receipt;
}

// Example driver: deploy token + registry + mint + change authority + transfer
async function main() {
  const [deployer] = await ethers.getSigners();
  // --- configuration (customize) ---
  const tokenName = process.env.TOKEN_NAME || "DemoSTT";
  const tokenSymbol = process.env.TOKEN_SYMBOL || "DSTT";
  const recipient = process.env.RECIPIENT || (await deployer.getAddress()); // where to mint/transfer
  const mintAmount = process.env.MINT_AMOUNT || "1000";
  const metadataURI = process.env.METADATA_URI || "ipfs://Qm.../metadata.json";
  // -----------------------------------

  // 1) Deploy token
  const token = await deployToken(tokenName, tokenSymbol, deployer);

  // 2) Deploy registry (optional) with deployer as admin
  const registry = await deployMetadataRegistry(await deployer.getAddress(), deployer);

  // 3) Mint tokens to recipient (deployer has MINTER_ROLE initially)
  await mintTokens(token, recipient, mintAmount, deployer);

  // 4) Optionally grant another account minter role
  // await grantMinter(token, "0xOtherAddress...", deployer);

  // 5) Set metadata in registry
  await setMetadata(registry, token.address, metadataURI, deployer);

  // 6) Transfer some tokens to another address (example)
  // For example, transfer 10 tokens from deployer to recipient2 (use same deployer as signer)
  // await transferTokens(token, deployer, "0xReceiver...", "10");

  console.log("All operations done.");
}

// allow direct script run: `npx hardhat run scripts/token-ops.js --network somnia`
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

// Export functions for programmatic use (optional)
module.exports = {
  deployToken,
  deployMetadataRegistry,
  mintTokens,
  grantMinter,
  revokeMinter,
  setMetadata,
  transferTokens
};
