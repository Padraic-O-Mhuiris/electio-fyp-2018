const Web3 = require('web3')

var Deployer = artifacts.require("Deployer")

module.exports = async function(deployer) {

    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    var accounts = await web3.eth.getAccounts()
    var deployer = await Deployer.new();
   
    console.log("Deployer Address :: " + deployer.address)
  }

