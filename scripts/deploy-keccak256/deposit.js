const {ethers} = require("hardhat");
const namehash = require('eth-ens-namehash')
const {getDeployedAddresses, getZkbasProxy} = require("./utils");

async function main() {
    const addrs = getDeployedAddresses('info/addresses.json')
    const zkbas = await getZkbasProxy(addrs.zkbasProxy)

    // tokens
    const TokenFactory = await ethers.getContractFactory('ZkbasRelatedERC20')
    const LEGToken = await TokenFactory.attach(addrs.LEGToken)
    const REYToken = await TokenFactory.attach(addrs.REYToken)

    // deposit bnb
    console.log('Deposit BNB...')
    let depositBNBTx = await zkbas.depositBNB('sher', {value: ethers.utils.parseEther('0.1')})
    await depositBNBTx.wait()
    depositBNBTx = await zkbas.depositBNB('gavin', {value: ethers.utils.parseEther('0.1')})
    await depositBNBTx.wait()

    // set allowance
    console.log('Set allowance...')
    let setAllowanceTx = await LEGToken.approve(zkbas.address, ethers.utils.parseEther('100000000000'))
    await setAllowanceTx.wait()
    setAllowanceTx = await REYToken.approve(zkbas.address, ethers.utils.parseEther('100000000000'))
    await setAllowanceTx.wait()
    // deposit bep20
    console.log('Deposit BEP20...')
    let depositBEP20 = await zkbas.depositBEP20(LEGToken.address, ethers.utils.parseEther('100'), 'sher')
    await depositBEP20.wait()
    depositBEP20 = await zkbas.depositBEP20(REYToken.address, ethers.utils.parseEther('100'), 'sher')
    await depositBEP20.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Error:', err.message || err);
        process.exit(1);
    });