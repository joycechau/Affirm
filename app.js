import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateCardNumber = this.validateCardNumber.bind(this);
    this.validateCVV2 = this.validateCVV2.bind(this);
    this.validateMonth = this.validateMonth.bind(this);
    this.validateYear = this.validateYear.bind(this);
    this.validateExpDate = this.validateExpDate.bind(this);
    this.state = {
      name: "",
      cardNumber: "",
      cvv2: "",
      expMonth: "",
      expYear: "",
      cardType: null,
      isValidName: false,
      isValidCardNumber: false,
      isValidCVV2: false,
      isValidMonth: false,
      isValidYear: false,
      isValidExpDate: false,
      cardNumberErrors: "",
      cvv2Errors: "",
      monthErrors: "",
      yearErrors: "",
      expDateErrors: "",
      submissionResponse: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let isformValid = (
      this.state.isValidName &&
      this.state.isValidCardNumber &&
      this.state.isValidCVV2 &&
      this.state.isValidMonth &&
      this.state.isValidYear &&
      this.state.isValidExpDate
    );
    if (isformValid) {
      this.setState({
        submissionResponse: "Form successfully submitted!"
      });
    } else {
      this.setState({
        submissionResponse: "Please complete all fields accurately."
      });
    }
  }

  update(field, e) {
    this.setState({ [field]: e.target.value });
  }

  resetErrors() {
    this.setState({
      cardNumberErrors: "",
      cvv2Errors: "",
      monthErrors: "",
      yearErrors: "",
      expDateErrors: "",
      submissionErrors: ""
    });
  }

  validateName(e) {
    this.update("name", e);
    if (e.target.value.length > 0) {
      this.setState({ isValidName: true });
    } else {
      this.setState({ isValidName: false });
    }
  }

  validateCardNumber(e) {
    this.update("cardNumber", e);
    let value = e.target.value;
    let cardType = this.state.cardType;

    if (value.length === 0) {
      this.setState({ cardType: "" });
      this.resetErrors();
    } else if (value.substring(0,2) === "34" || value.substring(0,2) === "37") {
      this.setState({
        cardType: "AMEX",
        cardNumberErrors: "Must be 15 digits." });
    } else if (value[0] === "4") {
      this.setState({
        cardType: "Visa",
        cardNumberErrors: "Must be 16 digits." });
    } else {
      this.setState({
        cardType: "",
        cardNumberErrors: "Must enter a valid Visa or AMEX number."
      });
    }

    if ((cardType === "AMEX" && value.length === 15) || (cardType === "Visa" && value.length === 16)) {
      this.setState({ isValidCardNumber: true, cardNumberErrors: "" });
    } else {
      this.setState({ isValidCardNumber: false });
    }
  }

  validateCVV2(e) {
    this.update("cvv2", e);
    let value = e.target.value;
    let cardType = this.state.cardType;
    let isValidAmexCard = this.state.isValidCardNumber && cardType === "AMEX";
    let isValidVisaCard = this.state.isValidCardNumber && cardType === "Visa";

    if (isValidAmexCard && value.length !== 4) {
      this.setState({
        isValidCVV2: false,
        cvv2Errors: "Must be 4 digits."
      });
    } else if (isValidVisaCard && value.length !== 3) {
      this.setState({
        isValidCVV2: false,
        cvv2Errors: "Must be 3 digits."
      });
    } else if ((isValidAmexCard && value.length === 4) || (isValidVisaCard && value.length === 3)) {
      this.setState({ isValidCVV2: true });
      this.resetErrors();
    } else {
      this.setState({ isValidCVV2: false });
    }
  }

  validateMonth(e) {
    this.update("expMonth", e);
    let month = parseInt(e.target.value);

    if (month >= 1 && month <= 12) {
      this.setState({ isValidMonth: true, monthErrors: "" }, this.validateExpDate);
    } else {
      this.setState({
        isValidMonth: false,
        monthErrors: "Month must be between 1 and 12."
      }, this.validateExpDate);
    }
  }

  validateYear(e) {
    this.update("expYear", e);
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let expYear = parseInt(e.target.value);

    if (e.target.value.length === 4) {
      this.setState({ isValidYear: true, yearErrors: "" }, this.validateExpDate);
    } else if (e.target.value.length > 4) {
      this.setState({
        isValidYear: false,
        yearErrors: "Invalid year."
      }), this.validateExpDate;
    } else {
      this.setState({ isValidYear: false, yearErrors: "" }, this.validateExpDate);
    }
  }

  validateExpDate() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let expMonth = parseInt(this.state.expMonth);
    let expYear = parseInt(this.state.expYear);

    if (this.state.isValidMonth && this.state.isValidYear) {
      if ((currentYear < expYear) || ((currentYear === expYear) && (currentMonth < expMonth))) {
        this.setState({
          isValidExpDate: true,
          expDateErrors: ""
        });
      } else {
        this.setState({
          isValidExpDate: false,
          expDateErrors: "Cannot use an expired card."
        });
      }
    } else {
      this.setState({
        isValidExpDate: false,
        expDateErrors: ""
      });
    }
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
          required
          placeholder="Name"
          value={this.state.name}
          onChange={this.validateName}
        />
        <input
          type="number"
          required
          placeholder="Card Number"
          value={this.state.cardNumber}
          onChange={this.validateCardNumber}
        />
        <div className="errors">{this.state.cardNumberErrors}</div>
        <input
          type="number"
          required
          placeholder="CVV2"
          value={this.state.cvv2}
          onChange={this.validateCVV2}
        />
        <div className="errors">{this.state.cvv2Errors}</div>
        <div>
          <input
            type="number"
            required
            placeholder="Exp. Month"
            value={this.state.expMonth}
            onChange={this.validateMonth}
          />
          <input
            type="number"
            required
            placeholder="Exp. Year"
            value={this.state.expYear}
            onChange={this.validateYear}
          />
        </div>
        <div className="errors">{this.state.monthErrors}</div>
        <div className="errors">{this.state.yearErrors}</div>
        <div className="errors">{this.state.expDateErrors}</div>
        <img src="./assets/cards.png" alt="Credit Cards"/>
        <input
          type="submit"
          value="Submit"
        />
        <div className="response">{this.state.submissionResponse}</div>
        <br/>
        <br/>
      </form>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  ReactDOM.render(<App />, app);
});
