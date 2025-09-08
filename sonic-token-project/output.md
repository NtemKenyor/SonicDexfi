$ npx hardhat run scripts/do-ops.js --network somnia
Deployer: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Deploying MyToken (MyTokenX / MTX) with deployer 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
MyToken deployed at: 0x0420b7272B146816851de0A3Df10F957ea282197

RPC attempt 1 failed: missing revert data in call exception; Transaction reverted without a reason string [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (data="0x", transaction={"from":"0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C","to":"0x0420b7272B146816851de0A3Df10F957ea282197","data":"0x313ce567","accessList":null}, error={"name":"ConnectTimeoutError","code":"UND_ERR_CONNECT_TIMEOUT","message":"Connect Timeout Error"}, code=CALL_EXCEPTION, version=providers/5.8.0)
RPC attempt 2 failed: could not detect network (event="noNetwork", code=NETWORK_ERROR, version=providers/5.8.0)

Minted 5000 tokens to 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C — tx: 0xa3bcefdb81876fae5df370b4812fad1783af0efa19bf65c7e25a2fd90329fe30
Granted MINTER_ROLE to 0x23ce01731d2dF1ADD75AFc29CD2440f945204b82 — tx: 0x7734c4cfd69d355ee3d3bd3d7a8f31fde3aa973c19643b48540107df2e69c98a
Transferred 10 tokens to 0x97E9E5082E44c9e618aAD746280c2EB702f28bE3 — tx: 0xc5686d57cf5e8380f258f582622eca3739ef5d796b5b05be49a613af89cc5295
✅ Script finished successfully



$ npx hardhat run scripts/deploy-postboard.js --network somnia
Deploying PostBoard with account: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
PostBoard deployed at: 0x59A2F68F62A04A94E16F889C37c89804895FC124


✅ Token deployed at 0xedf19E1ddCca23fa1c56030bD5F5249AdD45d118



$ npx hardhat run --network somnia scripts/deploy.js
Deploying with: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Factory deployed: 0xeD93540816459cf5F0c11f7d8e67E22b2F8743Df
Router deployed: 0x266f9C2e4e9a2F4C7147D6b88be5879f50A24832
Pair created: 0x86f38a3399f1D0f3CcE20ABa5e35Ddc832eE09cB

✅ Deployment complete. Save these:
FACTORY_ADDRESS = 0xeD93540816459cf5F0c11f7d8e67E22b2F8743Df
ROUTER_ADDRESS  = 0x266f9C2e4e9a2F4C7147D6b88be5879f50A24832
PAIR_ADDRESS    = 0x86f38a3399f1D0f3CcE20ABa5e35Ddc832eE09cB



