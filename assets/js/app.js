// =======================
// Tab Loader
// =======================
$(document).ready(function () {
    function loadPage(page) {
      $("#tabContainer").load(page, function () {
        if (typeof initSomniaDex === "function") {
          initSomniaDex(); // re-init JS when tab loads
        }
      });
    }
  
    // Load default (DEX tab)
    loadPage("dex.html");
  
    // Handle tab switching
    $(".nav-tab").click(function () {
      $(".nav-tab").removeClass("active");
      $(this).addClass("active");
      loadPage($(this).data("page"));
    });
  });
  
  
  // =======================
  // SomniaDex Class
  // =======================
  class SomniaDex {
    constructor() {
      this.web3 = null;
      this.account = null;
      this.network = null;
      this.provider = null;
      this.tokens = {
        ETH: { symbol: "ETH", decimals: 18 },
        USDC: { symbol: "USDC", decimals: 6 },
        USDT: { symbol: "USDT", decimals: 6 },
        BTC: { symbol: "BTC", decimals: 8 }
      };
  
      this.bindEvents();
    }
  
    // -----------------------
    // Event Binding
    // -----------------------
    bindEvents() {
      // Wallet connect
      $(document).on("click", "#connectWallet", () => this.connectWallet());
      $(document).on("click", "#disconnectBtn", () => this.disconnectWallet());
  
      // Swap
      $(document).on("click", "#swapBtn", () => this.executeSwap());
      $(document).on("click", "#swapDirection", () => this.reverseSwap());
  
      // Liquidity
      $(document).on("submit", "#createPairForm", (e) => this.createPair(e));
      $(document).on("submit", "#addLiquidityForm", (e) => this.addLiquidity(e));
  
      // Ramp (buy crypto)
      $(document).on("submit", "#rampForm", (e) => this.startRamp(e));
  
      // Portfolio
      $(document).on("click", "#refreshBalances", () => this.loadBalances());
    }
  
    // -----------------------
    // Wallet Connect / Disconnect
    // -----------------------
    async connectWallet() {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask not detected!");
        return;
      }
  
      try {
        this.provider = window.ethereum;
        await this.provider.request({ method: "eth_requestAccounts" });
        this.web3 = new Web3(this.provider);
  
        const accounts = await this.web3.eth.getAccounts();
        this.account = accounts[0];
        const networkId = await this.web3.eth.net.getId();
        this.network = networkId;
  
        $("#connectWallet").hide();
        $("#walletConnected").show();
        $("#walletAddress").text(this.account.substring(0, 6) + "..." + this.account.slice(-4));
        $("#walletAvatar").text(this.account[2].toUpperCase());
        $("#networkName").text(networkId === 1 ? "Ethereum" : "Testnet");
  
        console.log("Wallet connected:", this.account);
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    }
  
    disconnectWallet() {
      this.account = null;
      this.web3 = null;
      this.provider = null;
  
      $("#walletConnected").hide();
      $("#connectWallet").show();
      console.log("Wallet disconnected");
    }
  
    // -----------------------
    // Swap Logic
    // -----------------------
    async executeSwap() {
      const fromAmount = $("#fromAmount").val();
      const fromToken = $("#fromToken").data("token");
      const toToken = $("#toToken").data("token");
  
      if (!this.account) {
        alert("Please connect your wallet first.");
        return;
      }
  
      if (!fromAmount || isNaN(fromAmount) || Number(fromAmount) <= 0) {
        alert("Enter a valid amount.");
        return;
      }
  
      $("#swapStatus").text(`Swapping ${fromAmount} ${fromToken} → ${toToken}...`);
  
      setTimeout(() => {
        $("#swapStatus").text(`✅ Successfully swapped ${fromAmount} ${fromToken} to ${toToken}`);
        $("#toAmount").val(fromAmount * 3000); // mock exchange rate
      }, 2000);
    }
  
    reverseSwap() {
      const fromToken = $("#fromToken").data("token");
      const toToken = $("#toToken").data("token");
      const fromLabel = $("#fromToken span:first");
      const toLabel = $("#toToken span:first");
  
      // swap the labels + data
      $("#fromToken").data("token", toToken);
      $("#toToken").data("token", fromToken);
      fromLabel.text(toToken);
      toLabel.text(fromToken);
    }
  
    // -----------------------
    // Liquidity
    // -----------------------
    createPair(e) {
      e.preventDefault();
      const tokenA = $("#tokenA").val();
      const tokenB = $("#tokenB").val();
      $("#pairStatus").text(`✅ Pool created for ${tokenA}/${tokenB}`);
    }
  
    addLiquidity(e) {
      e.preventDefault();
      const pair = $("#liquidityPair").val();
      $("#liquidityStatus").text(`✅ Liquidity added to pool ${pair}`);
    }
  
    // -----------------------
    // Ramp (Fiat onramp with Flutterwave)
    // -----------------------
    startRamp(e) {
      e.preventDefault();
      const amount = $("#rampAmount").val();
      const crypto = $("#cryptoSelect").val();
      const email = $("#userEmail").val();
      const name = $("#userName").val();
  
      FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-XXXXXXXXXX", // replace with real key
        tx_ref: Date.now(),
        amount: amount,
        currency: "USD",
        payment_options: "card, banktransfer, ussd",
        customer: { email: email, name: name },
        callback: function (data) {
          $("#rampStatus").text(`✅ Payment complete. You bought ${amount} ${crypto}`);
        },
        onclose: function () {
          $("#rampStatus").text("❌ Transaction closed.");
        }
      });
    }
  
    // -----------------------
    // Portfolio
    // -----------------------
    loadBalances() {
      if (!this.account) {
        alert("Connect your wallet first.");
        return;
      }
  
      $("#tokenBalances").html(`
        <div class="balance-item"><span>ETH</span><span>0.42</span></div>
        <div class="balance-item"><span>USDC</span><span>1,200</span></div>
        <div class="balance-item"><span>USDT</span><span>800</span></div>
      `);
  
      $("#transactionHistory").html(`
        <div class="tx-item">✅ Swapped 1 ETH → 3000 USDC</div>
        <div class="tx-item">➕ Added 500 USDC liquidity</div>
      `);
  
      $("#portfolioCard, #transactionCard").show();
    }
  }
  
  // =======================
  // Global Initializer
  // =======================
  function initSomniaDex() {
    window.somnia = new SomniaDex();
  }
  