let currentStep = 1;
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const button = document.getElementById("submit");
const title = document.getElementById("title");

let usernameExists = false;
let username = "";

button.addEventListener("click", async () => {
  if (currentStep === 1) {
    username = usernameInput.value.trim();
    if (!username) return alert("Veuillez entrer un nom d'utilisateur.");

    const res = await fetch(`php/check_user.php?username=${encodeURIComponent(username)}`);
    const data = await res.json();
    usernameExists = data.exists;

    usernameInput.disabled = true;
    passwordInput.style.display = "block";

    if (usernameExists) {
      title.textContent = `Rebonjour ${username} 👋`;
    } else {
      title.textContent = `Bienvenue sur Open Tok, ${username} ! 🎉`;
    }

    const today = new Date();
    const day = today.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const message = document.createElement("p");
    message.textContent = `Nous espérons que vous passez un agréable ${day}.`;
    document.querySelector(".container").appendChild(message);

    button.textContent = "Se connecter";
    currentStep = 2;
  } else if (currentStep === 2) {
    const password = passwordInput.value;
    if (!password) return alert("Veuillez entrer votre mot de passe.");

    const endpoint = usernameExists ? "login.php" : "signup.php";

    const res = await fetch(`php/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "home.html";
    } else {
      alert(data.message || "Erreur de connexion.");
    }
  }
});
