const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying PostBoard with account:", deployer.address);

  const PostBoard = await ethers.getContractFactory("PostBoard");
  const postBoard = await PostBoard.deploy();
  await postBoard.deployed();

  console.log("PostBoard deployed at:", postBoard.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
