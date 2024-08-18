import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [mortgageTypeDisplay, setMortgageTypeDisplay] = useState("");
  const [monthlyPayments, setMonthlyPayments] = useState(0);
  const [fullPayments, setFullPayments] = useState(0);
  const [errorsVisible, setErrorsVisible] = useState(false);

  const handleAmountChange = (e: any) => {
    let newValue = e.target.value.replace(/,/g, "");
    if (newValue === "" || /^[0-9\b]+$/.test(newValue)) {
      setAmount(formatNumberWithCommas(newValue));
    }
  };

  const handleTermChange = (e: any) => {
    let newValue = e.target.value;
    if (newValue === "" || /^\d*$/.test(newValue)) {
      setTerm(newValue);
    }
  };

  const handleRateChange = (e: any) => {
    let newValue = e.target.value;
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      setRate(newValue);
    }
  };

  function formatNumberWithCommas(number: number | string) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatNumberWithCommasAndDecimal(number: number | string) {
    let [integerPart, decimalPart] = number.toString().split(".");
    integerPart = formatNumberWithCommas(integerPart);
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  }

  const clearAll = () => {
    setAmount("");
    setTerm("");
    setRate("");
    setMortgageType("");
    setMonthlyPayments(0);
    setErrorsVisible(false);
  };

  const validate = () => {
    const cleanedAmount = amount.replace(/,/g, "");

    if (cleanedAmount && term && rate && mortgageType) {
      const principal = parseFloat(cleanedAmount);
      const yearlyRate = parseFloat(rate) / 100;
      const months = parseInt(term) * 12;
      const monthlyRate = yearlyRate / 12;

      let monthlyPayment = 0;

      if (mortgageType === "repayment") {
        monthlyPayment =
          (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      } else if (mortgageType === "interestOnly") {
        monthlyPayment = principal * monthlyRate;
      }
      const full = monthlyPayment * months;

      setMortgageTypeDisplay(mortgageType);
      setMonthlyPayments(monthlyPayment);
      setFullPayments(full);
      setErrorsVisible(false);
    } else {
      setErrorsVisible(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center max-md:items-start bg-[#e3f3fd] text-base">
      <main className="flex w-[975px] min-h-[580px] rounded-2xl max-md:rounded-none overflow-hidden shadow-lg bg-white max-md:flex-col">
        <section className="basis-1/2 p-8">
          <form
            className="flex flex-col h-full"
            onSubmit={(e) => {
              e.preventDefault();
              validate();
            }}
          >
            <header className="flex justify-between items-center mb-10 max-md:flex-col max-md:items-start max-md:gap-2">
              <h1 className="text-2xl font-bold text-[#122f3f]">
                Mortgage Calculator
              </h1>
              <button
                type="button"
                className="leading-none underline text-[#4e6e7e] hover:text-[#122f3f]"
                onClick={clearAll}
              >
                Clear All
              </button>
            </header>
            <div className="mb-6">
              <label htmlFor="amount" className="text-[#122f3f]">
                Mortgage Amount
              </label>
              <div
                className={`flex mt-2 w-full h-12 border border-[#4e6e7e] overflow-hidden rounded-md ${
                  amount === "" && errorsVisible && "!border-red-500"
                }`}
              >
                <div
                  className={`px-4 h-full shrink-0 bg-blue-100 text-[#4e6e7e] text-xl flex items-center font-semibold justify-center ${
                    amount === "" && errorsVisible && "bg-red-500 text-white"
                  }`}
                >
                  £
                </div>
                <input
                  className="w-full h-full p-3 pl-4 text-lg font-semibold"
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  inputMode="numeric"
                />
              </div>
              {amount === "" && errorsVisible && (
                <p className="text-red-600 mt-2">This field is required</p>
              )}
            </div>
            <div className="flex w-full gap-4 max-md:flex-col">
              <div className="basis-1/2">
                <label htmlFor="term" className="text-[#122f3f]">
                  Mortgage Term
                </label>
                <div
                  className={`flex mt-2 w-full h-12 border border-[#4e6e7e] overflow-hidden rounded-md ${
                    term === "" && errorsVisible && "!border-red-500"
                  }`}
                >
                  <input
                    className="w-full h-full p-3 pl-4 text-lg font-semibold"
                    id="term"
                    type="text"
                    inputMode="numeric"
                    value={term}
                    onChange={handleTermChange}
                  />
                  <div
                    className={`px-4 h-full shrink-0 bg-blue-100 text-[#4e6e7e] flex text-lg font-semibold items-center justify-center ${
                      term === "" && errorsVisible && "bg-red-500 text-white"
                    }`}
                  >
                    years
                  </div>
                </div>
                {term === "" && errorsVisible && (
                  <p className="text-red-600 mt-2">This field is required</p>
                )}
              </div>
              <div className="basis-1/2">
                <label htmlFor="rate" className="text-[#122f3f]">
                  Interest Rate
                </label>
                <div
                  className={`flex mt-2 w-full h-12 border border-[#4e6e7e] overflow-hidden rounded-md ${
                    rate === "" && errorsVisible && "!border-red-500"
                  }`}
                >
                  <input
                    className="w-full h-full p-3 pl-4 text-lg font-semibold"
                    id="rate"
                    type="text"
                    inputMode="numeric"
                    value={rate}
                    onChange={handleRateChange}
                  />
                  <div
                    className={`px-4 h-full shrink-0 bg-blue-100 text-[#4e6e7e] flex text-lg font-semibold items-center justify-center ${
                      rate === "" && errorsVisible && "bg-red-500 text-white"
                    }`}
                  >
                    %
                  </div>
                </div>
                {rate === "" && errorsVisible && (
                  <p className="text-red-600 mt-2">This field is required</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="text-[#122f3f]">Mortgage Type</label>
              <button
                type="button"
                className={`flex pl-4 items-center mt-2 w-full h-12 border border-[#4e6e7e] overflow-hidden rounded-md cursor-pointer hover:border-[#d7da2f] ${
                  mortgageType === "repayment"
                    ? "bg-[#d7da2f] bg-opacity-15 !border-[#d7da2f]"
                    : ""
                }`}
                onClick={() => setMortgageType("repayment")}
              >
                <div
                  className={`w-4 h-4 p-[2px] rounded-full border border-[#4e6e7e] mr-4 ${
                    mortgageType === "repayment" ? "!border-[#d7da2f]" : ""
                  }`}
                >
                  {mortgageType === "repayment" && (
                    <div className="w-full h-full rounded-full bg-[#d7da2f]" />
                  )}
                </div>
                <span className="font-semibold text-lg leading-none text-[#122f3f]">
                  Repayment
                </span>
              </button>
              <button
                type="button"
                className={`flex pl-4 items-center mt-2 w-full h-12 border border-[#4e6e7e] overflow-hidden rounded-md cursor-pointer hover:border-[#d7da2f] ${
                  mortgageType === "interestOnly"
                    ? "bg-[#d7da2f] bg-opacity-15 !border-[#d7da2f]"
                    : ""
                }`}
                onClick={() => setMortgageType("interestOnly")}
              >
                <div
                  className={`w-4 h-4 p-[2px] rounded-full border border-[#4e6e7e] mr-4 ${
                    mortgageType === "interestOnly" ? "!border-[#d7da2f]" : ""
                  }`}
                >
                  {mortgageType === "interestOnly" && (
                    <div className="w-full h-full rounded-full bg-[#d7da2f]" />
                  )}
                </div>
                <span className="font-semibold text-lg leading-none text-[#122f3f]">
                  Interest Only
                </span>
              </button>
              {mortgageType === "" && errorsVisible && (
                <p className="text-red-600 mt-2">This field is required</p>
              )}
            </div>
            <div className="h-full flex items-end">
              <button
                type="submit"
                className="flex max-md:items-center bg-[#d7da2f] text-[#122f3f] p-3 px-8 rounded-[32px] font-semibold text-[17px] mt-10 hover:bg-opacity-70"
              >
                <span className="mr-2">
                  <img src="/icon-calculator.svg" alt="Calculator icon" />
                </span>
                Calculate Repayments
              </button>
            </div>
          </form>
        </section>
        <section className="basis-1/2 p-8 bg-[#183444] rounded-bl-[48px] max-md:rounded-bl-none shrink-0">
          {monthlyPayments !== 0 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-4">
                Your results
              </h2>
              <p className="text-[#9abed5] mb-9">
                Your results are shown based on the information you provided. To
                adjust the results, edit the form and click "calculate
                repayments" again.
              </p>
              <div className="w-full h-[300px] max-md:h-auto p-8 max-md:p-4 bg-[#102434] rounded-md border-t-4 border-t-[#d7da2f]">
                <h3 className="text-[#9abed5] mb-8 max-md:mb-4">
                  Your monthly payments
                </h3>
                <div className="text-[56px] max-md:text-[36px] max-md:mb-8 text-[#d7da2f] font-bold mb-14">
                  £
                  {formatNumberWithCommasAndDecimal(monthlyPayments.toFixed(2))}
                </div>
                <div className="w-full h-[1px] bg-slate-500 mb-6" />
                <h3 className="text-[#9abed5] mb-1">
                  {mortgageTypeDisplay === "repayment"
                    ? "Total you'll repay over the term"
                    : "Total interest over the term"}
                </h3>
                <div className="text-white text-3xl max-md:text-2xl font-bold">
                  £{formatNumberWithCommasAndDecimal(fullPayments.toFixed(2))}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <img src="/illustration-empty.svg" alt="Empty results icon" />
              <h2 className="text-2xl font-bold text-white mb-3">
                Results shown here
              </h2>
              <p className="text-[#9abed5]">
                Complete the form and click "calculate repayments" to see what
                your monthly repayments would be.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
