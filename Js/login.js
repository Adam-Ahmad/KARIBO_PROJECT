const API_URL = "http://localhost:3000";

// define variables
let loginBtn = document.querySelector("#loginBtn");
let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");

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

async function login(event) {
  event.preventDefault();
  let username = usernameElement.value;
  let password = passwordElement.value;

  if (!username || !password) {
    showToast("Please Enter Username and Password.", "error");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    // console.log(response);`
    const users = await response.json();
    const userDetails = JSON.stringify(users);
    localStorage.setItem("userDetails", userDetails);
    // console.log(userDetails);

    // console.log(users);
    if (users.user) {
      showToast(
        `Login Successfully! Welcome ${users.user.role} ${users.user.username}`,
      );

      // validate
      if (users.user.role === "manager") {
        setTimeout(() => {
          window.location.href = "/HTML/manager.html";
        }, 1200);
      }
      if (users.user.role === "director") {
        setTimeout(() => {
          window.location.href = "/HTML/director.html";
        }, 1200);
      }
      if (users.user.role === "salesAgent") {
        setTimeout(() => {
          window.location.href = "/HTML/sales_agent.html";
        }, 1200);
      }
    } else {
      showToast("Invalid username or Password. Please Try Again.", "error");
    }
  } catch (error) {
    console.log(error);
  }
}

loginBtn.addEventListener("click", login);
