# Solidity-SupplyChainExample

A simple supply chain example implemented on the blockchain. Smart contracts written in Solidity, that allow for automated dispatchment of items upon payment as well as payment collection without a middlemen. 

- An owner can create an item and set its cost in Ether. 
- This item then has its own address, where a buyer can send the appropriate amount of funds to. 
- This will set the status of the item to paid and trigger a notification that it is ready to be delivered. 
- The owner can then trigger the item for dispatch and set its state to deliver.

Smart Contracts can be inspected and tested in [Remix](http://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js).


## Features

* Smart contracts written in Solidity
* Utilization of Event-Triggers to interact between UI and blockchain
* Ownership to give access control to contract functions (based on [openzepplin contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol))
* Truffle workflow 
* Unit testing with Truffle
* Interaction with Metamask and Truffle development console
* Send and receive Ether
* React for frontend UI

## 🏁 Getting Started <a name = "getting_started"></a>

### Install dependencies

```bash
npm install
```

### Run app 

In project folder
```bash
(if running Node >= 17) --> export NODE_OPTIONS=--openssl-legacy-provider
truffle develop
migrate
```

* **Connect Metamask wallet and set network to: _Localhost 8545_**

In client folder
```bash
npm start 
```

For Unit Testing
```bash
truffle develop
truffle test
```
