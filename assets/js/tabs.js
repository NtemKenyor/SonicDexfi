function run_js_4_tab(page){
    if(page==="wallet.html"){
        console.log("here we go accessed");
        // import("./wallet.js").then((module) => {
        //     module.run_js_4_wallet();
        // });
        run_js_4_wallet();
        console.log("ended here and we good.");
    }
}



function run_js_4_wallet() {
    const walletBtn = document.getElementById("walletBtn");
    const walletInfo = document.getElementById("walletInfo");
    const balancesSection = document.getElementById("balances");
    const txSection = document.getElementById("transactions");
    const loadingSection = document.getElementById("loading");
    const walletWarning = document.getElementById("walletWarning");

    function initWallet() {
        const urlParams = new URLSearchParams(window.location.search);
        const walletAddress = urlParams.get("wallet_address");
        const walletName = urlParams.get("wallet_name");
        const network = urlParams.get("network");

        let info = null;
        console.log(walletName, walletAddress);
        console.log((window.walletInfo && window.walletInfo.isConnected));
        
        if (walletAddress && walletName) {
        info = { address: walletAddress, walletName, network, isConnected: true };
        } else if (window.walletInfo && window.walletInfo.isConnected) {
        info = window.walletInfo;
        }

    //   let walletInfo = window.walletInfo;
    //   if (walletInfo.address && walletInfo.walletName) {
    //     info = { address: walletAddress, walletName, network, isConnected: true };
    //   } else if (window.walletInfo && window.walletInfo.isConnected) {
    //     info = window.walletInfo;
    //   }

        if (!info || !info.isConnected) {
        walletInfo.style.display = "none";
        balancesSection.style.display = "none";
        txSection.style.display = "none";
        walletWarning.style.display = "block";
        walletBtn.textContent = "Connect Wallet";
        return;
        }

        walletWarning.style.display = "none";

        document.getElementById("connectedWalletName").textContent = info.walletName;
        document.getElementById("connectedNetwork").textContent = info.network || "Unknown";
        document.getElementById("connectedAddress").textContent =
        `${info.address.substring(0, 8)}...${info.address.slice(-6)}`;
        walletInfo.style.display = "block";
        walletBtn.textContent = "Refresh Wallet Data";

        loadWalletData(info.address, info.network);
    }

    document.addEventListener("walletInfoUpdated", (e) => {
        window.walletInfo = e.detail;
        initWallet();
    });

    walletBtn.addEventListener("click", function () {
        if (walletBtn.textContent === "Connect Wallet") {
        if (window.somniaDex) {
            window.somniaDex.showWalletModal();
        }
        } else if (window.walletInfo && window.walletInfo.isConnected) {
        loadWalletData(window.walletInfo.address, window.walletInfo.network);
        }
    });

    async function loadWalletData(address, network) {
        loadingSection.style.display = "block";
        balancesSection.style.display = "none";
        txSection.style.display = "none";

        setTimeout(() => {
        loadingSection.style.display = "none";
        balancesSection.style.display = "block";
        txSection.style.display = "block";

        // Mock balances for now
        document.getElementById("nativeBalance").textContent = (Math.random() * 5).toFixed(4);

        // Mock transactions
        const txBody = document.getElementById("txBody");
        txBody.innerHTML = "";
        const txTypes = ["buy", "sell", "swap"];
        const tokens = ["ETH", "STT"];
        for (let i = 0; i < 5; i++) {
            const type = txTypes[Math.floor(Math.random() * txTypes.length)];
            const token = tokens[Math.floor(Math.random() * tokens.length)];
            const amount = (Math.random() * 10).toFixed(4);
            const date = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td class="tx-type ${type}">${type.toUpperCase()}</td>
            <td>${token}</td>
            <td>${amount}</td>
            <td>${date}</td>
            `;
            txBody.appendChild(tr);
        }
        }, 1000);
    }

    initWallet();
};