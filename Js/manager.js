const API_URL = "http://localhost:3000";
// toast function
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "✓" : "✕";
  toast.innerHTML = `
              <span class="toast-icon">${icon}</span>
              <span>${message}</span>
            `;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
// User Details
let userInfo = document.querySelector("#userInfo");
let userRole = document.querySelector("#userRole");
let userDetails = JSON.parse(localStorage.getItem("userDetails"));
console.log(userDetails);

userInfo.innerHTML = userDetails.user.username.toUpperCase();
userRole.innerHTML = userDetails.user.role;
// //////////////////////////////////////////////////////////////////////////////////////////
// Cash Sales Card
let totalCashSales = document.querySelector("#totalCashSales");
let totalCashSalesTonnage = document.querySelector("#totalCashSalesTonnage");
async function desplayTotalCashSales() {
  try {
    let response = await fetch(`${API_URL}/getCashTotals`);
    let totalCash = await response.json();
    // console.log(totalCash.cashSalesTotals[0].totalAmountPaid);
    // console.log(totalCash.cashSalesTotals[0].totalTonnage);

    localStorage.setItem(
      "totalCashSalesAmount",
      JSON.stringify(totalCash.cashSalesTotals[0].totalAmountPaid),
    );
    localStorage.setItem(
      "totalCashSalesTonnage",
      JSON.stringify(totalCash.cashSalesTotals[0].totalTonnage),
    );
    totalCashSales.innerHTML = `${totalCash.cashSalesTotals[0].totalAmountPaid} UGX`;
    totalCashSalesTonnage.innerHTML = `${totalCash.cashSalesTotals[0].totalTonnage} Kg`;
  } catch (error) {
    console.log(error);
  }
}
desplayTotalCashSales();
// ///////////////////////////////////////////////////////////////////////////////////////////////////
// Credit Sales Card
let totalCreditSales = document.querySelector("#totalCreditSales");
let totalCreditSalesTonnage = document.querySelector(
  "#totalCreditSalesTonnage",
);
async function desplayTotalCreditSales() {
  try {
    let response = await fetch(`${API_URL}/getCreditTotals`);
    let totalCredit = await response.json();
    // console.log(totalCredit.creditSalesTotals[0].totalAmountDue);
    // console.log(totalCredit.creditSalesTotals[0].totalTonnage);

    localStorage.setItem(
      "totalCreditSalesAmount",
      JSON.stringify(totalCredit.creditSalesTotals[0].totalAmountDue),
    );
    localStorage.setItem(
      "totalCreditSalesTonnage",
      JSON.stringify(totalCredit.creditSalesTotals[0].totalTonnage),
    );
    totalCreditSales.innerHTML = `${totalCredit.creditSalesTotals[0].totalAmountDue} UGX`;
    totalCreditSalesTonnage.innerHTML = `${totalCredit.creditSalesTotals[0].totalTonnage} Kg`;
  } catch (error) {
    console.log(error);
  }
}
desplayTotalCreditSales();

// //////////////////////////////////////////////////////////////////////////////////////////
// Recent Added Cash Sales

let cashSalesTableBody = document.getElementById("cashSalesTableBody");
async function displayRecentCashSales() {
  try {
    let response = await fetch(`${API_URL}/getCashSales`);
    let cashSales = await response.json();

    localStorage.setItem("cashSales", JSON.stringify(cashSales));
    cashSalesTableBody.innerHTML = "";

    cashSales.cashSales.forEach((cashSale, index) => {
      let cashSalesString = `
      <tr>
        <th scope="col">${index + 1}</th>
        <th scope="col">${cashSale.produceName}</th>
        <th scope="col">${cashSale.tonnageSold}</th>
        <th scope="col">${cashSale.amountPaid}</th>
        <th scope="col">${cashSale.salesAgentName}</th>
        <th scope="col">${cashSale.date}</th>
      </tr>
      `;
      cashSalesTableBody.innerHTML += cashSalesString;
    });
  } catch (error) {
    console.log(error);
  }
}
displayRecentCashSales();
// recent Added Credit Sales
let creditSalesTableBody = document.querySelector("#creditSalesTableBody");
async function displayRecentCreditSales() {
  try {
    let response = await fetch(`${API_URL}/getCreditSales`);
    let creditSales = await response.json();
    localStorage.setItem("creditSales", JSON.stringify(creditSales));
    creditSalesTableBody.innerHTML = "";

    creditSales.creditSales.forEach((creditSale, index) => {
      let creditSalesString = `
      <tr>
        <th scope="col">${index + 1}</th>
        <th scope="col">${creditSale.produce}</th>
        <th scope="col">${creditSale.tonnageKg}</th>
        <th scope="col">${creditSale.amountDueUgx}</th>
        <th scope="col">${creditSale.salesAgent}</th>
        <th scope="col">${creditSale.dueDate}</th>
      </tr>
      `;
      creditSalesTableBody.innerHTML += creditSalesString;
    });
  } catch (error) {
    console.log(error);
  }
}
displayRecentCreditSales();

// ///////////////////////////////////////////////////////////////////////////////////////////////////
// Procurement Form
const procurementForm = document.getElementById("procurementForm");
procurementForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    // Get form values
    const produceName = document.getElementById("produceName").value;
    const produceType = document.getElementById("produceType").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const tonnageKg = document.getElementById("tonnageKg").value;
    const costUgx = document.getElementById("costUgx").value;
    const sellingPriceUgx = document.getElementById("sellingPriceUgx").value;
    const dealerName = document.getElementById("dealerName").value;
    const branch = document.getElementById("branch").value;
    const dealerContact = document.getElementById("dealerContact").value;

    // Create procurement object
    const newProcurement = {
      produceName,
      produceType,
      tonnageKg,
      costUgx,
      sellingPriceUgx,
      dealerName,
      branch,
      dealerContact,
      date,
      time,
    };
    if (
      !newProcurement.produceName ||
      !newProcurement.produceType ||
      !newProcurement.tonnageKg ||
      !newProcurement.costUgx ||
      !newProcurement.sellingPriceUgx ||
      !newProcurement.dealerName ||
      !newProcurement.branch ||
      !newProcurement.dealerContact ||
      !newProcurement.date ||
      !newProcurement.time
    ) {
      showToast("Invalid Details. Please Try Again.", "error");
      return;
    }

    const response = await fetch(`${API_URL}/addProcurement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newProcurement),
    });

    if (response.ok) {
      showToast("Added Successfully!");
      setTimeout(() => {
        window.location.href = "/HTML/manager.html";
      }, 1000);
      // Clear the form
      procurementForm.reset();
    }
  } catch (error) {
    console.error("Error adding procurement:", error);
  }
});
