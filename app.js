const clientId = "4849ec525212416a9f73f476f4765cb8";
const redirectUri = "https://solucanmusicapp.vercel.app/callback";
const authEndpoint = "https://accounts.spotify.com/authorize";
const responseType = "token";

document.getElementById("login-btn").addEventListener("click", () => {
  const scope = "user-read-private user-read-email";
  const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;
  window.location = authUrl;
});

const token = localStorage.getItem("spotify_token");

if (token) {
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("search-section").style.display = "block";

  document.getElementById("search-btn").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value;
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    const tracks = data.tracks.items;
    const results = document.getElementById("results");
    results.innerHTML = "";

    tracks.forEach(track => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${track.name}</strong> - ${track.artists[0].name}</p>
        <img src="${track.album.images[1]?.url}" width="200" />
        <br><a href="${track.external_urls.spotify}" target="_blank">Spotify'da Aç</a>
        <hr>
      `;
      results.appendChild(div);
    });
  });
}
