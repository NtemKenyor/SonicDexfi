// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IERC20Minimal.sol";
import "./AMMFactory.sol";
import "./AMMPair.sol";

contract AMMRouter {
    address public factory;

    constructor(address _factory) {
        factory = _factory;
    }

    // helper: ensure pair exists
    function _pairFor(address tokenA, address tokenB) internal view returns (address) {
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        return AMMFactory(factory).getPair(token0, token1);
    }

    // add liquidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountA,
        uint amountB,
        address to
    ) external returns (uint liquidity) {
        address pair = _pairFor(tokenA, tokenB);
        require(pair != address(0), "PAIR_NOT_EXIST");

        IERC20Minimal(tokenA).transferFrom(msg.sender, pair, amountA);
        IERC20Minimal(tokenB).transferFrom(msg.sender, pair, amountB);
        liquidity = AMMPair(pair).mint(to);
    }

    // NEW: remove liquidity
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        address to
    ) external returns (uint amountA, uint amountB) {
        address pair = _pairFor(tokenA, tokenB);
        require(pair != address(0), "PAIR_NOT_EXIST");

        // transfer LP tokens from user to pair
        AMMPair(pair).transferFrom(msg.sender, pair, liquidity);
        (amountA, amountB) = AMMPair(pair).burn(to);
    }

    // swapExactTokensForTokens(simple single-hop)
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address pathFrom,
        address pathTo,
        address to
    ) external returns (uint amountOut) {
        address pair = _pairFor(pathFrom, pathTo);
        require(pair != address(0), "PAIR_NOT_EXIST");

        // transfer input to pair
        IERC20Minimal(pathFrom).transferFrom(msg.sender, pair, amountIn);

        (uint112 reserve0, uint112 reserve1) = AMMPair(pair).getReserves();
        (address token0, ) = pathFrom < pathTo ? (pathFrom, pathTo) : (pathTo, pathFrom);
        uint reserveIn = pathFrom == token0 ? reserve0 : reserve1;
        uint reserveOut = pathFrom == token0 ? reserve1 : reserve0;

        // Uniswap-like formula with 0.3% fee
        uint amountInWithFee = amountIn * 997;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = (reserveIn * 1000) + amountInWithFee;
        amountOut = numerator / denominator;
        require(amountOut >= amountOutMin, "INSUFFICIENT_OUTPUT");

        if (pathFrom == token0) {
            AMMPair(pair).swap(0, amountOut, to);
        } else {
            AMMPair(pair).swap(amountOut, 0, to);
        }
    }
}
