import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      cardNumber: "",
      cvv2: "",
      expMonth: "",
      expYear: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <span><strong>Enter your credit card information</strong></span>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.update("name")}
        />
        <input
          type="number"
          placeholder="Card Number"
          value={this.state.cardNumber}
          onChange={this.update("cardNumber")}
        />
        <input
          type="number"
          placeholder="CVV2"
          value={this.state.cvv2}
          onChange={this.update("cvv2")}
        />
        <div>
          <input
            type="number"
            placeholder="Exp. Month"
            value={this.state.expMonth}
            onChange={this.update("expMonth")}
          />
          <input
            type="number"
            placeholder="Exp. Year"
            value={this.state.expYear}
            onChange={this.update("expYear")}
          />
        </div>
        <img src="./assets/cards.png" alt="Credit Cards"/>
        <input
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  ReactDOM.render(<App />, app);
});
