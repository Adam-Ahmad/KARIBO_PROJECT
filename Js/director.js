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

let totalCashSalesMaganjo = document.getElementById("totalCashSalesMaganjo");
let totalCashSalesMatugga = document.getElementById("totalCashSalesMatugga");

async function desplayTotalCashSales() {
  try {
    let response = await fetch(`${API_URL}/getCashTotals`);
    let totalCash = await response.json();
    totalCashSalesMaganjo.innerHTML = `${totalCash.cashSalesTotals[1].totalAmountPaid} UGX`;
    totalCashSalesMatugga.innerHTML = `${totalCash.cashSalesTotals[0].totalAmountPaid} UGX`;
  } catch (error) {
    console.log(error);
  }
}
desplayTotalCashSales();

// ///////////////////////////////////////////////////////////////////////////////////////////////////

// Credit Sales Card

let totalCreditSalesMaganjo = document.getElementById(
  "totalCreditSalesMaganjo",
);
let totalCreditSalesMatugga = document.getElementById(
  "totalCreditSalesMatugga",
);

async function desplayTotalCreditSales() {
  try {
    let response = await fetch(`${API_URL}/getCreditTotals`);
    let totalCredit = await response.json();
    totalCreditSalesMaganjo.innerHTML = `${totalCredit.creditSalesTotals[1].totalAmountDue} UGX`;
    totalCreditSalesMatugga.innerHTML = `${totalCredit.creditSalesTotals[0].totalAmountDue} UGX`;
  } catch (error) {
    console.log(error);
  }
}
desplayTotalCreditSales();

// ///////////////////////////////////////////////////////////////////////////////////////////////////

// Total Revenue Card

let totalRevenue = document.getElementById("totalRevenue");
async function displayTotals() {
  try {
    let response = await fetch(`${API_URL}/getTotals`);
    let totals = await response.json();

    totalRevenue.innerHTML = `${
      totals.creditSalesTotals[0].totalAmountDue +
      totals.creditSalesTotals[1].totalAmountDue +
      totals.cashSalesTotals[1].totalAmountPaid +
      totals.cashSalesTotals[0].totalAmountPaid
    } UGX`;
  } catch (error) {
    console.log(error);
  }
}
displayTotals();

// ///////////////////////////////////////////////////////////////////////////////////////////////////
// Inventory Table

let inventoryTableBody = document.getElementById("inventoryTableBody");

async function displayInventort() {
  try {
    let response = await fetch(`${API_URL}/getCurrentStock`);
    let Inventory = await response.json();
    console.log(typeof Inventory);

    console.log(Inventory);
    localStorage.setItem("Inventory", JSON.stringify(Inventory));
    inventoryTableBody.innerHTML = "";
    let inventoryRows = "";
    Inventory[0].forEach((inventory, index) => {
      inventoryRows = `
      <tr>
        <td>${index + 1}</td>
        <td>${inventory.produceName}</td>
        <td>${inventory.tonnageKg}</td>
      </tr>
      `;
    });
    inventoryTableBody.innerHTML += inventoryRows;
  } catch (error) {
    console.log(error);
  }
}
displayInventort();
// //////////////////////////////////////////////
// Users Cards

const addUserForm = document.getElementById("addUserForm");

let usersTableBody = document.getElementById("usersTableBody");

// Display Users

async function displayUsers() {
  try {
    const response = await fetch(`${API_URL}/getUser`);
    const users = await response.json();

    localStorage.setItem("users", JSON.stringify(users));
    usersTableBody.innerHTML = "";

    users.users.forEach((user, index) => {
      let htmlString = `
            <tr>
                  <td>${index + 1}</th>
                  <td>${user.username}</td>
                  <td> ${user.email}</td>
                  <td>********</td>
                  <td>${user.role}</td>

                  <td>
                      <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
                  </td>
            <tr>
              `;
      usersTableBody.innerHTML += htmlString;
    });
  } catch (error) {
    console.log(error);
  }
}

// Auto refresh the Users

function autoRefresh() {
  setInterval(displayUsers, 1000); // calls every 5 seconds
}

displayUsers();

// /////////////////////////////////////////////////////////////////////////////////////////

// Event listener for the Add User form submission

addUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get form values
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Create user object
  const newUser = {
    username,
    email,
    password,
    role,
  };

  if (
    !newUser.username ||
    !newUser.email ||
    !newUser.password ||
    !newUser.role
  ) {
    showToast("Invalid Details. Please Try Again.", "error");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newUser),
    });

    // console.log(response);

    if (response.ok) {
      showToast("Added Successfully!");
      setTimeout(() => {
        window.location.href = "/HTML/manager.html";
      }, 1000);
      // Clear the form
      addUserForm.reset();

      // Close the modal
      // "#addUserModal".modal("hide");

      // Refresh the user table
      displayUsers();
    } else {
      showToast("Already Exists. Please Try Again.", "error");
    }
  } catch (error) {
    console.error(error);
  }
});

// /////////////////////////////////////////////////////////////////////////////////////////

// Delete User

window.deleteUser = async (index) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      let response = await fetch(`${API_URL}/deleteUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: index }),
      });
      let users = await response.json();

      users.user.splice(index, 1);
    } catch (err) {
      console.log(err);
    }

    displayUsers();
    showToast("User Deleted Successfully!");
  }
};
