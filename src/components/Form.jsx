import React, { useState, useEffect } from "react";

const Form = () => {
  const [selectList, ratesList] = useState([]);
  const [currentRate, setCurrentRate] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
      .then((response) => response.json())
      .then((data) => {
        ratesList(() =>
          data[0].rates.filter(({ code }) =>
            ["EUR", "USD", "CHF"].includes(code)
          )
        );
      })
      .catch((error) => console.log(error));
  }, []);

  function currencyChange(e) {
    setCurrentRate(e.target.value);
  }

  const amount =
    ("submit",
    (e) => {
      e.preventDefault();
      const { newAmount } = e.currentTarget.elements;
      const newAmountValue = { amount: newAmount.value };

      resultFn(newAmountValue, currentRate);
    });

  const resultFn = (newAmountValue, currentRate) => {
    setResult(() => newAmountValue.amount * currentRate);
  };

  const selectCurrency = selectList.map(({ currency, code, mid }) => (
    <option key={code} value={mid}>
      {code} {currency}
    </option>
  ));

  //SHOW

  return (
    <>
      <form onSubmit={amount} id="currency-form">
        <div>
          <input
            className="input-value"
            type="number"
            step="0.01"
            name="newAmount"
            placeholder="Podaj kwotę">
            {amount.newAmount}
          </input>

          <select name="selectList" onChange={currencyChange}>
            <option key="first" value="0">
              Wybierz walutę
            </option>
            {selectCurrency}
          </select>
        </div>

        <div>
          <button>Przelicz</button>
        </div>
      </form>

      <div id="currency-results">
        <p id="currency-res-text">{`to ${result.toFixed(2)} PLN`}</p>
      </div>
    </>
  );
};

export default Form;
