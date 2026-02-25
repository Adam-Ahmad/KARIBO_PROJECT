document.addEventListener("DOMContentLoaded", () => {
  const addUserForm = document.getElementById("addUserForm");
  const usersTableBody = document.getElementById("usersTableBody");

  // Function to refresh the user list every 5 seconds
  function autoRefresh() {
    setInterval(displayUsers, 1000); // calls every 5 seconds
  }

  // Function to display users in the table
  function displayUsers() {
    // Retrieve users from local storage or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Clear existing table rows
    usersTableBody.innerHTML = "";

    // Populate table with user data
    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <th scope="row">${index + 1}</th>
              <td>${user.username.toUpperCase()}</td>
              <td> ${user.email}</td>
              <td>${user.password}</td>
              <td>${user.role.toUpperCase()}</td>
              
              <td>
                  <button class="btn btn-success btn-sm" onclick="editUser(${index})" data-bs-toggle="modal" data-bs-target="#addUserModal">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
              </td>
          `;
      usersTableBody.appendChild(row);
    });
  }

  // Call displayUsers to initially populate the table
  displayUsers();

  // Event listener for the Add User form submission
  addUserForm.addEventListener("submit", (event) => {
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

    // Retrieve existing users or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Add the new user to the array
    users.push(newUser);

    // Store the updated users array in local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Clear the form
    addUserForm.reset();

    // Close the modal
    $("#addUserModal").modal("hide");

    // Refresh the user table
    displayUsers();
  });

  // Automatically refresh the user list
  autoRefresh();

  //make a global scope function that can be called from onclick
  window.deleteUser = (index) => {
    if (confirm("Are you sure you want to delete this user?")) {
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      displayUsers();
    }
  };

  window.editUser = (index) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users[index];

    // Populate the modal form with user data
    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("role").value = user.role;

    // Show the modal
    $("#addUserModal").modal("show");

    // Store the index of the user being edited in a data attribute of the form
    addUserForm.dataset.editingIndex = index;

    // Modify the submit button's behavior to update the existing user
    addUserForm.removeEventListener("submit", submitHandler); // Remove the old submit event listener
    addUserForm.addEventListener("submit", editSubmitHandler); // Add the new submit event listener
  };

  //editSubmitHandler function to handle the submission of the edits
  function editSubmitHandler(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const editingIndex = parseInt(addUserForm.dataset.editingIndex);

    // Update the existing user in the array
    users[editingIndex] = { username, email, password, role };

    localStorage.setItem("users", JSON.stringify(users));
    $("#addUserModal").modal("hide");
    displayUsers();

    addUserForm.reset();
    addUserForm.removeEventListener("submit", editSubmitHandler);
    addUserForm.addEventListener("submit", submitHandler);
  }
});
