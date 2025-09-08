const express = require('express');
const axios = require('axios');
const { ethers } = require('ethers');
const router = express.Router();

// Configuration
const CONFIG = {
    FLUTTERWAVE_SECRET_KEY: process.env.FLUTTERWAVE_SECRET_KEY,
    SOMNIA_MAINNET_RPC: 'https://api.infra.mainnet.somnia.network/',
    SOMNIA_TESTNET_RPC: 'https://dream-rpc.somnia.network/',
    MTX_TOKEN_ADDRESS: '0x0420b7272B146816851de0A3Df10F957ea282197',
    MTX_TOKEN_DECIMALS: 18,
    MTX_PRICE_USD: 0.003, // $0.003 per MTX
    PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY // Wallet private key for sending tokens
};

class TokenDistributor {
    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(CONFIG.SOMNIA_TESTNET_RPC);
        this.wallet = new ethers.Wallet(CONFIG.PRIVATE_KEY, this.provider);
        this.tokenContract = new ethers.Contract(CONFIG.MTX_TOKEN_ADDRESS, ERC20_ABI, this.wallet);
    }

    async verifyFlutterwaveTransaction(transactionId) {
        try {
            const response = await axios.get(
                `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
                {
                    headers: {
                        'Authorization': `Bearer ${CONFIG.FLUTTERWAVE_SECRET_KEY}`
                    }
                }
            );

            const transaction = response.data.data;
            return {
                isValid: transaction.status === 'successful',
                amount: transaction.amount,
                currency: transaction.currency,
                customerEmail: transaction.customer.email,
                txRef: transaction.tx_ref
            };
        } catch (error) {
            console.error('Flutterwave verification error:', error.response?.data || error.message);
            return { isValid: false, error: error.response?.data || error.message };
        }
    }

    async calculateTokenAmount(fiatAmount, currency) {
        // Convert to USD equivalent (simplified - in production, use actual exchange rates)
        let amountUSD;
        
        if (currency === 'USD') {
            amountUSD = parseFloat(fiatAmount);
        } else {
            // For other currencies, you'd use an exchange rate API
            const exchangeRates = {
                'EUR': 1.1,
                'GBP': 1.3,
                'NGN': 0.00066
            };
            amountUSD = parseFloat(fiatAmount) * (exchangeRates[currency] || 1);
        }

        // Calculate MTX tokens based on USD price
        const tokenAmount = amountUSD / CONFIG.MTX_PRICE_USD;
        return ethers.utils.parseUnits(tokenAmount.toFixed(CONFIG.MTX_TOKEN_DECIMALS), CONFIG.MTX_TOKEN_DECIMALS);
    }

    async sendTokens(recipientAddress, tokenAmount) {
        try {
            // Check wallet balance first
            const balance = await this.tokenContract.balanceOf(this.wallet.address);
            if (balance.lt(tokenAmount)) {
                throw new Error('Insufficient token balance in distributor wallet');
            }

            // Send tokens
            const tx = await this.tokenContract.transfer(recipientAddress, tokenAmount);
            const receipt = await tx.wait();

            return {
                success: true,
                transactionHash: receipt.transactionHash,
                tokenAmount: ethers.utils.formatUnits(tokenAmount, CONFIG.MTX_TOKEN_DECIMALS)
            };
        } catch (error) {
            console.error('Token transfer error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async processPayment(requestData) {
        const { transactionId, mode, token, amount, currency, userEmail, userName, walletAddress } = requestData;

        // Verify Flutterwave transaction
        const verification = await this.verifyFlutterwaveTransaction(transactionId);
        
        if (!verification.isValid) {
            return {
                success: false,
                error: 'Invalid transaction',
                details: verification.error
            };
        }

        // Verify amount matches (with small tolerance for currency conversion)
        const verifiedAmount = parseFloat(verification.amount);
        const requestedAmount = parseFloat(amount);
        
        if (Math.abs(verifiedAmount - requestedAmount) > 0.01) {
            return {
                success: false,
                error: 'Amount mismatch',
                details: `Verified: ${verifiedAmount}, Requested: ${requestedAmount}`
            };
        }

        if (mode === 'buy') {
            // Calculate token amount
            const tokenAmount = await this.calculateTokenAmount(amount, currency);
            
            // Send tokens to user
            const transferResult = await this.sendTokens(walletAddress, tokenAmount);
            
            if (!transferResult.success) {
                return transferResult;
            }

            return {
                success: true,
                tokenAmount: transferResult.tokenAmount,
                transactionHash: transferResult.transactionHash,
                message: `Successfully sent ${transferResult.tokenAmount} MTX to ${walletAddress}`
            };
        } else {
            // For sell mode, handle fiat payout (implement your payout logic here)
            return {
                success: true,
                message: `Sale completed. ${amount} ${currency} will be processed for payout.`
            };
        }
    }
}

// ABI for ERC20 token
const ERC20_ABI = [
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function decimals() external view returns (uint8)"
];

// Initialize token distributor
const tokenDistributor = new TokenDistributor();

// Ramp/Off-ramp endpoint
router.post('/send_tokens', async (req, res) => {
    try {
        const {
            transactionId,
            status,
            mode,
            token,
            amount,
            currency,
            userEmail,
            userName,
            walletAddress
        } = req.body;

        // Basic validation
        if (!transactionId || !mode || !amount || !currency) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        if (mode === 'buy' && !walletAddress) {
            return res.status(400).json({
                success: false,
                error: 'Wallet address required for buy mode'
            });
        }

        // Process the payment
        const result = await tokenDistributor.processPayment(req.body);

        if (result.success) {
            res.json({
                success: true,
                tokenAmount: result.tokenAmount,
                transactionHash: result.transactionHash,
                message: result.message
            });
        } else {
            res.status(400).json({
                success: false,
                error: result.error,
                details: result.details
            });
        }

    } catch (error) {
        console.error('Ramp processing error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Health check endpoint for ramp services
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'ramp-api',
        timestamp: new Date().toISOString() 
    });
});

module.exports = router;