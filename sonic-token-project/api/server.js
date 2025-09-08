const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const router = express.Router();

const MyToken = require("../artifacts/contracts/MyToken.sol/MyToken.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL_TESTNET);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create Token
router.post("/create", async (req, res) => {
  try {
    const { name, symbol, userAddress } = req.body; // userAddress = frontend connected wallet
    const factory = new ethers.ContractFactory(MyToken.abi, MyToken.bytecode, wallet);
    const token = await factory.deploy(name, symbol);
    await token.deployed();

    // Optionally grant user MINTER_ROLE
    const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));
    await (await token.grantRole(MINTER_ROLE, userAddress)).wait();
    console.log("it has been processed to this point.");
    
    res.json({
      success: true,
      tokenAddress: token.address,
      txHash: token.deployTransaction.hash
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
