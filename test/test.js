const IERC20 = artifacts.require('IERC20');
const IUniswap = artifacts.require('IUniswap');
// const UniInteract = artifacts.require('UniInteract');

contract('test', async () => {
    let daiAddr, whaleAddr, recipient, uniV2router2;

    beforeEach(() => {
        daiAddr = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
        whaleAddr = '0x43EAEAC4bED50cc56a9074D7EBe87EFB7232bD94';
        recipient = '0x6b175474e89094c44da98b954eedeac495271d0f';

        uniV2router2 = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    })

    it('should get dai balance', async () => {
        const dai = await IERC20.at(daiAddr);
        const uniswap = await IUniswap.at(uniV2router2);

        const getBalances = async () => {
            const whaleDaiBal = await dai.balanceOf(whaleAddr);
            const recipDaiBal = await dai.balanceOf(recipient);
            const whaleEthBal = await web3.eth.getBalance(whaleAddr);
            const recipEthBal = await web3.eth.getBalance(recipient);
            console.log("Whale DAI bal: ", web3.utils.fromWei(whaleDaiBal));
            console.log("Recip DAI bal: ", web3.utils.fromWei(recipDaiBal));
            console.log("Whale ETH bal: ", web3.utils.fromWei(whaleEthBal));
            console.log("Recip ETH bal: ", web3.utils.fromWei(recipEthBal));
        }

        getBalances();

        const daiAmount = web3.utils.toWei('2500');
        const wethAddr = await uniswap.WETH();
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 min
        const receipt = await dai.approve(uniV2router2, daiAmount, { from: whaleAddr });
        console.log();
        console.log(receipt);
        // await uniswap.swapExactTokensForETH(daiAmount, web3.utils.toWei('0.5'), [daiAddr, wethAddr], recipient, deadline, { from: whaleAddr });

        // console.log('');
        // getBalances();

        // await UniInteract.deploy(daiAddr, uniV2router2);
        // const uniPlugin = UniInteract.deployed();
        // const uniswap = await UniInteract
    })
})