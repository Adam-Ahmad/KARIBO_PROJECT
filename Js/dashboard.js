// get the data from local storage
_details = localStorage.getItem("userDetails");

console.log(_details);
if (!_details) {
  window.location.href = "/HTML/login.html";
}

const userDetails = JSON.parse(_details);

// update the user information
if (!userDetails) {
  document.getElementById("userInfo").textContent = "Not logged in";
} else {
  document.getElementById("userInfo").textContent =
    `${userDetails.firstName.toUpperCase()} ${userDetails.lastName.toUpperCase()}`;
  document.getElementById("userRole").textContent =
    `${userDetails.role.toUpperCase()}`;
}

// Card Informaion

let totalCashSalesElement = document.getElementById("totalCashSales");
let totalCreditSalesElement = document.getElementById("totalCreditSales");
let pendingSalesElement = document.getElementById("pendingSales");
let dataTableElement = document.querySelector("#dataTable");

let transactions = localStorage.getItem("transactions");

if (!transactions) {
  localStorage.setItem("transactions", JSON.stringify([]));
}

transactions = JSON.parse(transactions);

let saleRef = {
  id: "",
  buyerName: "",
  product: "",
  tonnageSold: "",
  amountPaid: "",
  isCredit: false,
  date: new Date(),
  balance: 0,
  dueDate: new Date(),
  status: "",
};

let totalCashSales = transactions.filter((t) => isCredit === false).length || 0;
let totalCreditSales =
  transactions.filter((t) => isCredit === true).length || 0;
let pendingSales = transactions.filter((t) => t.balance > 0).length || 0;

totalCashSalesElement.textContent = totalCashSales;
totalCreditSalesElement.textContent = totalCreditSales;
pendingSalesElement.textContent = pendingSales;

// Recently Add Sales

transactions.forEach((t) => {
  let htmlString = `
  <tr>
      <td>Id</td>
      <td>buyerName</td>
      <td>product</td>
      <td>tonnageSold</td>
      <td>amountPaid</td>
      <td>date</td>
      <td>balance</td>
      <td>dueDate</td>
      <td>status</td>
  </tr>
  `;
  dataTableElement.innerHTML = htmlString;
});
