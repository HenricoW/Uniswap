// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

interface IUniswap {
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);

    function WETH() external pure returns (address);
}