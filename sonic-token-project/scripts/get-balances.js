const { ethers } = require("hardhat");

/**
 * Get balances of STT (native coin) and ERC20 tokens for a wallet.
 *
 * @param {string} walletAddress - The address to check
 * @param {Array<string>} tokenAddresses - List of ERC20 contract addresses to query
 * @param {object} provider - ethers provider (e.g., ethers.provider in Hardhat)
 * @returns {Promise<object>} Balances keyed by symbol
 */
async function getWalletHoldings(walletAddress, tokenAddresses, provider) {
  const balances = {};

  // 1) Native STT balance
  const nativeBalance = await provider.getBalance(walletAddress);
  balances["STT"] = ethers.utils.formatEther(nativeBalance);

  // 2) ERC20 balances
  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint256)"
  ];

  for (let tokenAddr of tokenAddresses) {
    try {
      const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
      const [name, symbol, decimals, rawBalance] = await Promise.all([
        token.name(),
        token.symbol(),
        token.decimals(),
        token.balanceOf(walletAddress),
      ]);
      const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);
      balances[symbol] = formattedBalance;
      console.log(`${symbol} (${name}): ${formattedBalance}`);
    } catch (err) {
      console.error(`⚠️ Failed to fetch token at ${tokenAddr}:`, err.message);
    }
  }

  return balances;
}

module.exports = { getWalletHoldings };
