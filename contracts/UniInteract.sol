// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUniswap.sol";

contract UniInteract {
    IERC20 public token;
    IUniswap public router;

    constructor (address tknAddr, address uniRouterAddr) {
        token = IERC20(tknAddr);
        router = IUniswap(uniRouterAddr);
    }

    function swapTokenForETH(uint amountIn, uint minAmountOut, uint deadline) external {
        token.transferFrom(msg.sender, address(this), amountIn);
        address[] memory path = new address[](2);
        path[0] = address(token);
        path[1] = router.WETH();
        token.approve(address(router), amountIn);
        router.swapExactTokensForETH(amountIn, minAmountOut, path, msg.sender, deadline);
    }
}