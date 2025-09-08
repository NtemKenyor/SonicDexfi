$ npx hardhat run --network somnia scripts/deploy.js
Deploying with: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Factory deployed: 0xeD93540816459cf5F0c11f7d8e67E22b2F8743Df
Router deployed: 0x266f9C2e4e9a2F4C7147D6b88be5879f50A24832
Pair created: 0x86f38a3399f1D0f3CcE20ABa5e35Ddc832eE09cB

✅ Deployment complete. Save these:
FACTORY_ADDRESS = 0xeD93540816459cf5F0c11f7d8e67E22b2F8743Df
ROUTER_ADDRESS  = 0x266f9C2e4e9a2F4C7147D6b88be5879f50A24832
PAIR_ADDRESS    = 0x86f38a3399f1D0f3CcE20ABa5e35Ddc832eE09cB
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/deploy.js
Warning: Unused local variable.
   --> contracts/AMMPair.sol:124:10:
    |
124 |         (uint112 _reserve0, uint112 _reserve1) = getReserves();
    |          ^^^^^^^^^^^^^^^^^


Warning: Unused local variable.
   --> contracts/AMMPair.sol:124:29:
    |
124 |         (uint112 _reserve0, uint112 _reserve1) = getReserves();
    |                             ^^^^^^^^^^^^^^^^^


Compiled 3 Solidity files successfully (evm target: paris).
Deploying with: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Factory deployed: 0x221Fc0043237a93ddEc3b3C98faEA55D96eE2f96
Router deployed: 0xb04116B49E34078b35468205982e5CD1B6d566F7
Pair created: 0x7b22883D5ca7443eC45325CfF7BEdAD49BcC2110

✅ Deployment complete. Save these:
FACTORY_ADDRESS = 0x221Fc0043237a93ddEc3b3C98faEA55D96eE2f96
ROUTER_ADDRESS  = 0xb04116B49E34078b35468205982e5CD1B6d566F7
PAIR_ADDRESS    = 0x7b22883D5ca7443eC45325CfF7BEdAD49BcC2110
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/interact.js
Using account: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Pair: 0x7b22883D5ca7443eC45325CfF7BEdAD49BcC2110
Approving router for liquidity...
Adding liquidity...
✅ Liquidity added.
📊 Current Price: 1 GX = 2 USSD
📊 Current Price: 1 USSD = 0.5 GX
✅ Swapped 10 GX → USSD
📊 New Price after swap: 1 GX = 1.9606503359525336 USSD
Removing liquidity...
Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="execution reverted", method="estimateGas", transaction={"from":"0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C","to":"0x7b22883D5ca7443eC45325CfF7BEdAD49BcC2110","data":"0x89afcb44000000000000000000000000cb00fb1bc16f9e5feb3bb817d8c4d456d60aa58c","accessList":null}, error={"name":"ProviderError","_stack":"ProviderError: execution reverted\n    at HttpProvider.request (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/hardhat/src/internal/core/providers/http.ts:116:21)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at EthersProviderWrapper.send (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)","code":3,"_isProviderError":true,"data":"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c4e4f5f4c49515549444954590000000000000000000000000000000000000000"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.8.0)
    at Logger.makeError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/logger/src.ts/index.ts:269:28)
    at Logger.throwError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/logger/src.ts/index.ts:281:20)
    at checkError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:78:20)
    at EthersProviderWrapper.<anonymous> (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:642:20)
    at step (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:48:23)
    at Object.throw (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:29:53)
    at rejected (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:21:65)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  reason: 'execution reverted',
  code: 'UNPREDICTABLE_GAS_LIMIT',
  method: 'estimateGas',
  transaction: {
    from: '0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C',
    to: '0x7b22883D5ca7443eC45325CfF7BEdAD49BcC2110',
    data: '0x89afcb44000000000000000000000000cb00fb1bc16f9e5feb3bb817d8c4d456d60aa58c',
    accessList: null
  },
  error: ProviderError: execution reverted
      at HttpProvider.request (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/hardhat/src/internal/core/providers/http.ts:116:21)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at EthersProviderWrapper.send (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)
}
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/interact.js
Using account: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Pair: 0x7b22883D5ca7443eC45325CfF7BEdAD49BcC2110
Approving router for liquidity...
Adding liquidity...
✅ Liquidity added.
📊 Current Price: 1 GX = 1.9641953507315846 USSD
📊 Current Price: 1 USSD = 0.5091143300117984 GX
✅ Swapped 10 GX → USSD
📊 New Price after swap: 1 GX = 1.9293286966522583 USSD
✅ Liquidity removed via Router
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/deploy.js
Deploying with: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Factory deployed: 0xb06229eD4c53aEC803eC9E2c0d25B954685d77EC
Router deployed: 0xEd03899F0804B5BD49a06192f22900f89F3EC019
Pair created: 0x81001f1e0fC4aBB1F76444AFeEb148Bc8d1F9118

✅ Deployment complete. Save these:
FACTORY_ADDRESS = 0xb06229eD4c53aEC803eC9E2c0d25B954685d77EC
ROUTER_ADDRESS  = 0xEd03899F0804B5BD49a06192f22900f89F3EC019
PAIR_ADDRESS    = 0x81001f1e0fC4aBB1F76444AFeEb148Bc8d1F9118
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhakenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/get_wstt.js
(node:284318) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/scripts/get_wstt.js:1
const [user] = await ethers.getSigners();
               ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
    at wrapSafe (node:internal/modules/cjs/loader:1378:20)
    at Module._compile (node:internal/modules/cjs/loader:1428:41)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at node:internal/main/run_main_module:28:49
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/get_wstt.js
Using account: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
✅ Wrapped 1 STT into WSTT
WSTT balance: 1.0
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/get_wstt.js
Using account: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
✅ Wrapped 1 STT into WSTT
WSTT balance: 51.0
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/interact.js
Using account: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Pair: 0x81001f1e0fC4aBB1F76444AFeEb148Bc8d1F9118

🔹 Token A: Wrapped STT (WSTT) @ 0xF22eF0085f6511f70b01a68F360dCc56261F768a
🔹 Token B: United States Dollar Decentralized (USDD) @ 0x22d33Bf4e4076C018539bEBD7213A505fa980676

Approving router for liquidity...
Adding liquidity...
Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="execution reverted", method="estimateGas", transaction={"from":"0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C","to":"0xEd03899F0804B5BD49a06192f22900f89F3EC019","data":"0x4b2fc7bb000000000000000000000000f22ef0085f6511f70b01a68f360dcc56261f768a00000000000000000000000022d33bf4e4076c018539bebd7213a505fa9806760000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000ad78ebc5ac6200000000000000000000000000000cb00fb1bc16f9e5feb3bb817d8c4d456d60aa58c","accessList":null}, error={"name":"ProviderError","_stack":"ProviderError: execution reverted\n    at HttpProvider.request (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/hardhat/src/internal/core/providers/http.ts:116:21)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at EthersProviderWrapper.send (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)","code":3,"_isProviderError":true,"data":"0x"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.8.0)
    at Logger.makeError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/logger/src.ts/index.ts:269:28)
    at Logger.throwError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/logger/src.ts/index.ts:281:20)
    at checkError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:78:20)
    at EthersProviderWrapper.<anonymous> (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:642:20)
    at step (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:48:23)
    at Object.throw (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:29:53)
    at rejected (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:21:65)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  reason: 'execution reverted',
  code: 'UNPREDICTABLE_GAS_LIMIT',
  method: 'estimateGas',
  transaction: {
    from: '0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C',
    to: '0xEd03899F0804B5BD49a06192f22900f89F3EC019',
    data: '0x4b2fc7bb000000000000000000000000f22ef0085f6511f70b01a68f360dcc56261f768a00000000000000000000000022d33bf4e4076c018539bebd7213a505fa9806760000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000ad78ebc5ac6200000000000000000000000000000cb00fb1bc16f9e5feb3bb817d8c4d456d60aa58c',
    accessList: null
  },
  error: ProviderError: execution reverted
      at HttpProvider.request (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/hardhat/src/internal/core/providers/http.ts:116:21)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at EthersProviderWrapper.send (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)
}
kenyor@HP-EliteBook-830-G5-a7a50787:/var/www/html/alltrenders/SomniaDexfi/somnia-token-project$ npx hardhat run --network somnia scripts/interact.js
Using account: 0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C
Pair: 0x81001f1e0fC4aBB1F76444AFeEb148Bc8d1F9118

🔹 Token A: Wrapped STT (WSTT) @ 0xF22eF0085f6511f70b01a68F360dCc56261F768a
🔹 Token B: United States Dollar Decentralized (USDD) @ 0x22d33Bf4e4076C018539bEBD7213A505fa980676

Approving router for liquidity...
Adding liquidity...
✅ Liquidity added: 50.0 WSTT + 1.0 USDD
📊 Current Price: 1 WSTT = 0.02 USDD
📊 Current Price: 1 USDD = 50 WSTT
Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="execution reverted", method="estimateGas", transaction={"from":"0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C","to":"0xEd03899F0804B5BD49a06192f22900f89F3EC019","data":"0x268a380b0000000000000000000000000000000000000000000000008ac7230489e800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f22ef0085f6511f70b01a68f360dcc56261f768a00000000000000000000000022d33bf4e4076c018539bebd7213a505fa980676000000000000000000000000cb00fb1bc16f9e5feb3bb817d8c4d456d60aa58c","accessList":null}, error={"name":"ProviderError","_stack":"ProviderError: execution reverted\n    at HttpProvider.request (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/hardhat/src/internal/core/providers/http.ts:116:21)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at EthersProviderWrapper.send (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)","code":3,"_isProviderError":true,"data":"0x"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.8.0)
    at Logger.makeError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/logger/src.ts/index.ts:269:28)
    at Logger.throwError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/logger/src.ts/index.ts:281:20)
    at checkError (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:78:20)
    at EthersProviderWrapper.<anonymous> (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:642:20)
    at step (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:48:23)
    at Object.throw (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:29:53)
    at rejected (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:21:65)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  reason: 'execution reverted',
  code: 'UNPREDICTABLE_GAS_LIMIT',
  method: 'estimateGas',
  transaction: {
    from: '0xcB00fB1Bc16F9e5fEB3bB817d8C4D456d60Aa58C',
    to: '0xEd03899F0804B5BD49a06192f22900f89F3EC019',
    data: '0x268a380b0000000000000000000000000000000000000000000000008ac7230489e800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f22ef0085f6511f70b01a68f360dcc56261f768a00000000000000000000000022d33bf4e4076c018539bebd7213a505fa980676000000000000000000000000cb00fb1bc16f9e5feb3bb817d8c4d456d60aa58c',
    accessList: null
  },
  error: ProviderError: execution reverted
      at HttpProvider.request (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/hardhat/src/internal/core/providers/http.ts:116:21)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at EthersProviderWrapper.send (/var/www/html/alltrenders/SomniaDexfi/somnia-token-project/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)
}