import React, {Component} from 'react';
import Web3 from 'web3';

import MetaMaskLogo from '../../assets/images/Metamask.png'
const MetaMaskUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'


/***************
 * Metamask 12-word code
 * 
 * myth like bonus scare over problem client lizard pioneer submit female collect
 * 
 */

const messages = {
  'LOCKED_METAMASK_ACCOUNT': "We see your MetaMask account is locked, please unlock it to continue",
  'NETWORK_ERROR': "We are having issue's connecting you to the blockchain, please check your internet connection",
  'METAMASK_NOT_INSTALL': "We can't seem to find MetaMask installed in your browser?",
};

const MetaMaskInstallModal = (props) => (
  <div className={props.toggleInstall}>
  <div className="modal-background"></div>
  <div className="modal-card has-text-centered">
  
    <header className="modal-card-head">
      <p className="modal-card-title"></p>
    </header>
    <section className="modal-card-body">

      <img src={MetaMaskLogo} alt="MetaMask Logo"/>
      <p>{props.message}</p>
      <a className="button is-link is-rounded is-outlined" href={MetaMaskUrl} >Get MetaMask!</a>
      <p>Reload the page when installed ...</p>
    </section>
    <footer className="modal-card-foot">
    </footer>
  </div>
</div>
);

const MetaMaskLockModal = (props) => (
  <div className={props.toggleLock}>
  <div className="modal-background"></div>
  <div className="modal-card has-text-centered">
  
    <header className="modal-card-head">
      <p className="modal-card-title"></p>
    </header>
    <section className="modal-card-body">

      <img src={MetaMaskLogo} alt="MetaMask Logo"/>
      <p>{props.message}</p>

    </section>
    <footer className="modal-card-foot">
    </footer>
  </div>
</div>
);

class MetaMask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      uninstalled: false,
      locked: false,
      toggleLock: 'modal',
      toggleInstall: 'modal',
    };
  }
  
  fetchWeb3() {
    let web3 = window.web3;

    if (typeof web3 === 'undefined') {
      this.props.setWeb3(null);
      this.setState({message: messages.METAMASK_NOT_INSTALL});
    }
  }

  fetchAccounts() {
    if (this.props.web3 !== null) {
      this.props.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          this.setState({message: messages.LOAD_MATAMASK_WALLET_ERROR});
        } else {
          if (accounts.length === 0) {
            this.props.handleMetaMaskAccount(null);
            this.setState({
              locked: true, 
              message: messages.LOCKED_METAMASK_ACCOUNT,
              toggleLock: "modal is-active"
            })
          } else {
            if (accounts[0] !== this.props.metaMask.account) {
              this.props.handleMetaMaskAccount(accounts[0]);
              this.props.resetChecks()
              this.setState({
                locked: false,
                toggleLock: "modal"
              });
            }
          }
        }
      });
    }
  }

  fetchNetwork() {
    if (this.props.web3 !== null) {
      this.props.web3.eth.net.getId((err, netId) => {
        if (err) {
          this.props.handleMetaMaskNetwork(null);
          this.setState({
            locked: true, 
            message: messages.NETWORK_ERROR,
            toggleLock: 'modal is-active'
          });
        } else {
          if (netId !== this.props.metaMask.network) {
            this.props.handleMetaMaskNetwork(netId);
            this.setState({
              locked: false,
              toggleLock: 'modal'
            });
          }
        }
      });
    }
  }

  componentDidMount() {
    let self = this;
    window.addEventListener('load', function() {
      let web3 = window.web3;
      if (typeof web3 !== 'undefined') {
        window.web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        self.props.setWeb3(window.web3);
        self.fetchAccounts();
        self.fetchNetwork();
        self.Web3Interval = setInterval(() => self.fetchWeb3(), 1000);
        self.AccountInterval = setInterval(() => self.fetchAccounts(), 1000);
        self.NetworkInterval = setInterval(() => self.fetchNetwork(),  1000);
      } else {
        self.setState({
          uninstalled: true, 
          message: messages.METAMASK_NOT_INSTALL,
          toggleInstall: 'modal is-active'
        });
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.Web3Interval);
    clearInterval(this.AccountInterval);
    clearInterval(this.NetworkInterval);
  }

  render() {
    const metaMaskInstall =
      <MetaMaskInstallModal
        {...this.state}
      />;

    const metaMaskLock = 
      <MetaMaskLockModal
        {...this.state}
      />
    return (   
      <div className="MetaMask">
        {metaMaskInstall}
        {metaMaskLock}
      </div>
    );
  }
}

export default MetaMask
