document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the username and password values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Perform login validation (you can modify this according to your needs)
  if (username === "admin" && password === "admin123") {
    // Redirect to another page
    window.location.href = "code/index.html";
  } else {
    alert("Invalid username or password");
  }
});
