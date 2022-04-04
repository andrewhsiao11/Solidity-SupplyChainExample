import React, { Component } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import Item from "./contracts/Item.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import Web3 from "web3";

class App extends Component {
  state = { cost: 0, itemName: "exampleItem1", loaded: false, };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      // instance of item manager
      this.itemManager = new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networkId] &&
          ItemManagerContract.networks[this.networkId].address
      );
      // instance of item
      this.item = new this.web3.eth.Contract(
        Item.abi,
        Item.networks[this.networkId] && Item.networks[this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToPaymentEvent();
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  // Listen to Payments - notify from event emitted
  // on Supply chain Step event change run the async func
  // calling getter func of item with its itemIndex as arg... 
  // (event.returnValues._itemIndex)
  // to get the item object, then calling its name
  // from item._identifier
  listenToPaymentEvent = () => {
    let self = this;
    this.itemManager.events
      .SupplyChainStep()
      .on("data", async function (event) {
        if (event.returnValues._step == 1) {
          let item = await self.itemManager.methods
            .items(event.returnValues._itemIndex)
            .call();
          console.log(item);
          alert("Item " + item._identifier + " was paid, deliver it now!");
        }
        console.log(event);
      });
  };

  handleInputChange = (event) => {
    // const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async () => {
    const { cost, itemName } = this.state;
    console.log(itemName, cost, this.itemManager);
    let result = await this.itemManager.methods
      .createItem(itemName, cost)
      .send({ from: this.accounts[0] });
    let result1 = await JSON.stringify(result, null, 4);
    console.log("result is: " + result1);
    alert(
      "Send " +
        cost +
        " Wei to " +
        result.events.SupplyChainStep.returnValues._address
    );
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Simple Payment/Supply Chain Example!</h1>
        <h2>Items</h2>
        <p>{this.state.itemName}</p>
        <p>Ether: {Web3.utils.fromWei(`${this.state.cost}`, "ether")}</p>

        <h2>Add Element</h2>
        <label>
          Cost in Wei:
          <input
            type="text"
            name="cost"
            value={this.state.cost}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <br />
        <label>
          Item Name:
          <input
            type="text"
            name="itemName"
            value={this.state.itemName}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="button" onClick={this.handleSubmit}>
          Create new Item
        </button>
      </div>
    );
  }
}

export default App;
