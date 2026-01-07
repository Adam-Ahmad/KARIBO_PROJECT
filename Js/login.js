// Users database
const Users = [
  { username: "Adam", password: "123", role: "director" },
  { username: "Ahmad", password: "123", role: "manager" },
  { username: "omer", password: "123", role: "sales_agent" },
];

// Login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // form values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = Users.find(
    (u) => u.username === username && u.password === password
  );

  // login result
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`Welcome, ${user.role}! Redirecting to dashboard...`);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password. Try: Adam / 123");
  }
});
