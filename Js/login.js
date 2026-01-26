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

// login form event
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let username = usernameElement.value;
  let password = passwordElement.value;

  if (!username || !password) {
    showToast("Please Enter Username and Password.", "error");
    return;
  }
  const users = [
    { username: "adam", password: "1234", role: "admin" },
    { username: "orban", password: "1234", role: "director" },
    { username: "ahmad", password: "1234", role: "sales agent" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  // validate user
  if (user) {
    showToast(`Login Successfuly! Welcome ${user.role} ${user.username}`);
    if (user.role === "admin") {
      setTimeout(() => {
        window.location.href = "/HTML/dashboard.html";
      }, 1200);
    }
    if (user.role === "director") {
      setTimeout(() => {
        window.location.href = "/HTML/dashboard.html";
      }, 1200);
    }
    if (user.role === "sales agent") {
      setTimeout(() => {
        window.location.href = "/HTML/dashboard.html";
      }, 1200);
    }

    // store user detail in local storage
    let userDetails = {
      username: user.username,
      firstName: "Adam",
      lastName: "Ahmad",
      role: user.role,
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    setTimeout(() => {
      window.location.href = "/HTML/dashboard.html";
    }, 1200);
  } else {
    showToast("Invalid Username or Password. Pleas Try Again.", "error");
  }
});
