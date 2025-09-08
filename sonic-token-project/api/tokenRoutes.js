const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const router = express.Router();

const ERC20_ABI = [
  "function mint(address to, uint256 amount)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function grantRole(bytes32 role, address account)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function DEFAULT_ADMIN_ROLE() view returns (bytes32)"
];

const provider = new ethers.providers.JsonRpcProvider({
  url: process.env.RPC_URL_TESTNET,
  chainId: parseInt(process.env.CHAIN_ID_TESTNET),
  name: "sonic",
});

console.log(provider);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const MyToken = require("../artifacts/contracts/MyToken.sol/MyToken.json");

// Helper to attach to any token
function getToken(tokenAddress) {
  return new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
}

// -------------------- CREATE TOKEN --------------------
router.post("/create", async (req, res) => {
  try {
    const { name, symbol, userAddress } = req.body;

    // Deploy contract
    const factory = new ethers.ContractFactory(MyToken.abi, MyToken.bytecode, wallet);
    const token = await factory.deploy(name, symbol);
    await token.deployed();

    // Grant roles to user
    const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));
    const DEFAULT_ADMIN_ROLE = await token.DEFAULT_ADMIN_ROLE();

    await (await token.grantRole(MINTER_ROLE, userAddress)).wait();
    await (await token.grantRole(DEFAULT_ADMIN_ROLE, userAddress)).wait();

    res.json({
      success: true,
      tokenAddress: token.address,
      txHash: token.deployTransaction.hash,
    });
  } catch (err) {
    console.error("Create Token Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- MINT TOKENS --------------------
router.post("/mint", async (req, res) => {
  try {
    const { tokenAddress, to, amount } = req.body;
    const token = getToken(tokenAddress);

    const decimals = await token.decimals();
    const tx = await token.mint(to, ethers.utils.parseUnits(amount, decimals));
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Mint Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- TRANSFER TOKENS --------------------
router.post("/transfer", async (req, res) => {
  try {
    const { tokenAddress, to, amount } = req.body;
    const token = getToken(tokenAddress);

    const decimals = await token.decimals();
    const tx = await token.transfer(to, ethers.utils.parseUnits(amount, decimals));
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Transfer Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GRANT ROLE --------------------
router.post("/grant-role", async (req, res) => {
  try {
    const { tokenAddress, role, address } = req.body;
    const token = getToken(tokenAddress);

    const ROLE_HASH = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(role));
    const tx = await token.grantRole(ROLE_HASH, address);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Grant Role Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- BALANCE --------------------
router.get("/balance/:tokenAddress/:address", async (req, res) => {
  try {
    const { tokenAddress, address } = req.params;
    const token = getToken(tokenAddress);

    const balance = await token.balanceOf(address);
    const decimals = await token.decimals();
    const symbol = await token.symbol();

    res.json({
      balance: ethers.utils.formatUnits(balance, decimals),
      symbol,
    });
  } catch (err) {
    console.error("Balance Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Set Metadata (simple registry style)
router.post("/set-metadata", async (req, res) => {
    try {
      const { tokenAddress, metadataUri } = req.body;
      // This assumes you extend your contract with a `setMetadata(string)` function
      const token = getToken(tokenAddress);
      const tx = await token.setMetadata(metadataUri);
      await tx.wait();
  
      res.json({ success: true, txHash: tx.hash });
    } catch (err) {
      console.error("Set Metadata Error:", err);
      res.status(500).json({ error: err.message });
    }
  });


  // -------------------- REMOVE ADMIN --------------------
router.post("/remove-admin", async (req, res) => {
    try {
      const { tokenAddress, newAdmin } = req.body;
      const token = getToken(tokenAddress);
  
      const DEFAULT_ADMIN_ROLE = await token.DEFAULT_ADMIN_ROLE();
  
      // Check if newAdmin already has admin rights
      const hasAdmin = await token.hasRole(DEFAULT_ADMIN_ROLE, newAdmin);
      if (!hasAdmin) {
        return res.status(400).json({
          success: false,
          error: "New admin not found. Please grant admin to another wallet before removing this one."
        });
      }
  
      // Revoke our backend wallet (the deployer/recovery wallet)
      const tx = await token.revokeRole(DEFAULT_ADMIN_ROLE, wallet.address);
      await tx.wait();
  
      res.json({ success: true, txHash: tx.hash, removedAdmin: wallet.address });
    } catch (err) {
      console.error("Remove Admin Error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;
