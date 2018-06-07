var Deployer = artifacts.require("Deployer")
var Registration = artifacts.require("./Registration.sol");
var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Deployer)
  deployer.deploy(Registration)
  deployer.deploy(Voting)
};
