// GSAP Animations
gsap.from(".text", {
  duration: 2.5,
  y: -100,
  opacity: 0,
  ease: "bounce.out"
});

gsap.from("#welcome-box", {
  duration: 1,
  scale: 0.5,
  opacity: 0,
  y: -50,
  ease: "power2.out"
});

// Close welcome box
function closeWelcomeBox() {
  gsap.to("#welcome-box", {
    duration: 0.5,
    opacity: 0,
    scale: 0.7,
    y: -30,
    ease: "power1.in",
    onComplete: () => {
      document.getElementById("welcome-box").style.display = "none";
    }
  });
}

// Fetch GitHub profile on button click
document.getElementById("btn").addEventListener("click", fetchGitHubProfile);

// Optional: Allow Enter key
document.getElementById("username").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchGitHubProfile();
  }
});

async function fetchGitHubProfile() {
  const username = document.getElementById("username").value.trim();
  const profileContainer = document.getElementById("profile-container");

  if (username === "") {
    profileContainer.innerHTML = "<p>Please enter a username.</p>";
    return;
  }

  const url = `https://api.github.com/users/${username}`;

  try {
    profileContainer.innerHTML = "<p>Loading...</p>";

    const response = await fetch(url);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    profileContainer.innerHTML = `
      <div class="profile-card">
        <img src="${data.avatar_url}" alt="${data.login}" width="100" height="100" style="border-radius: 50%;">
        <h2>${data.name || "No Name"}</h2>
        <p><strong>@${data.login}</strong></p>
        <p>${data.bio || "No bio available."}</p>
        <p>📦 Public Repos: ${data.public_repos}</p>
        <p>👥 Followers: ${data.followers} | Following: ${data.following}</p>
        <a href="${data.html_url}" target="_blank">View on GitHub</a>
      </div>
    `;

    // Animate profile
    gsap.from(".profile-card", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    });

  } catch (error) {
    profileContainer.innerHTML = `<p style="color: red;">❌ ${error.message}</p>`;
  }
}
