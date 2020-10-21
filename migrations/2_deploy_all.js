let Timelock = artifacts.require("Timelock");
let Token = artifacts.require("Token");
let Gov = artifacts.require("GovernorAlpha");

module.exports = async (deployer, networks, accounts) => {
    let account = accounts[0];
    let tenMinutesFromNow = new Date();
    tenMinutesFromNow.setMinutes(tenMinutesFromNow.getMinutes() + 10);
    let mintingTime = parseInt(tenMinutesFromNow.getTime() / 1000);
    let delay = 10 * 60;

    await deployer.deploy(Token, account, account, mintingTime);
    await deployer.deploy(Timelock, account, delay);
    await deployer.deploy(Gov, Timelock.address, Token.address, account);
};
