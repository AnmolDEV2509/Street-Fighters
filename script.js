function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("show");
}

// Load leaderboard
async function loadLeaderboard() {
  const res = await fetch("/api/leaderboard");
  const data = await res.json();
  const tbody = document.getElementById("leaderboard-data");
  tbody.innerHTML = "";
  data
    .sort((a, b) => b.points - a.points)
    .forEach((team, index) => {
      const row = `<tr>
        <td>${index + 1}</td>
        <td>${team.name}</td>
        <td>${team.points}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
}

// Load participants
async function loadParticipants() {
  const res = await fetch("/api/participants");
  const data = await res.json();
  const container = document.getElementById("participants-container");
  container.innerHTML = "";
  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Game: ${p.game}</p>
        <p>Contact: ${p.contact}</p>
      </div>`;
  });
}

// Handle register form
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = {
    name: formData.get("name"),
    contact: formData.get("contact"),
    game: formData.get("game")
  };

  const res = await fetch("/api/participants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  document.getElementById("register-msg").innerText = result.message;

  e.target.reset();
  loadParticipants();
  loadLeaderboard();
});

// Init
loadLeaderboard();
loadParticipants();
