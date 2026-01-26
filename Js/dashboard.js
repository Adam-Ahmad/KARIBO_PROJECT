// get the data from local storage
const session = JSON.parse(localStorage.getItem("userDetails"));

// update the user information
if (!session) {
  document.getElementById("userInfo").textContent = "Not logged in";
} else {
  document.getElementById("userInfo").textContent =
    `Logged in as ${session.firstName} (${session.role.toUpperCase()})`;
}
