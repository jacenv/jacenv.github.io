#!/usr/bin/env node
/**
 * One-off helper: looks up each artist on Spotify and prints a ready-to-paste
 * `likedArtists` array (with profile image + Spotify page link) for lib/data.ts.
 *
 * Setup (free, no user login — this uses the Client Credentials flow):
 *   1. Create an app at https://developer.spotify.com/dashboard
 *   2. Put its Client ID / Client Secret in your shell:
 *        export SPOTIFY_CLIENT_ID=...
 *        export SPOTIFY_CLIENT_SECRET=...
 *   3. node scripts/fetch-artist-data.mjs > artists.txt
 *
 * Match results are printed to stderr so you can eyeball them; the array itself
 * goes to stdout. Re-run only when you change the list below.
 *
 * If search picks the wrong act, replace the string with { name, id } using the
 * artist's Spotify ID (the last part of open.spotify.com/artist/<id>).
 */

const ARTISTS = [
  "Olivia Rodrigo",
  "LOONA",
  "ARTMS",
  "aespa",
  "ISOXO",
  "Porter Robinson",
  "Tiffany Day",
  "LE SSERAFIM",
  "ILLIT",
  "ninajirachi",
];

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    "Missing credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET, then re-run."
  );
  process.exit(1);
}

async function getToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    throw new Error(`Token request failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()).access_token;
}

async function lookup(token, entry) {
  const auth = { Authorization: `Bearer ${token}` };

  // Explicit ID wins over search
  if (typeof entry === "object" && entry.id) {
    const res = await fetch(`https://api.spotify.com/v1/artists/${entry.id}`, {
      headers: auth,
    });
    return res.ok ? await res.json() : null;
  }

  const name = typeof entry === "string" ? entry : entry.name;
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      name
    )}&type=artist&limit=1`,
    { headers: auth }
  );
  if (!res.ok) return null;
  return (await res.json()).artists?.items?.[0] ?? null;
}

/** Smallest image at least 160px wide — plenty for a 48px avatar on retina. */
function pickImage(images = []) {
  const sorted = [...images].sort((a, b) => a.width - b.width);
  return sorted.find((img) => img.width >= 160) ?? sorted.at(-1) ?? null;
}

const token = await getToken();
const rows = [];

for (const [i, entry] of ARTISTS.entries()) {
  const requested = typeof entry === "string" ? entry : entry.name;
  const artist = await lookup(token, entry);

  if (!artist) {
    console.error(`no match: ${requested} — left as a placeholder`);
    rows.push({ id: String(i + 1), name: requested });
    continue;
  }

  const image = pickImage(artist.images);
  rows.push({
    id: String(i + 1),
    name: artist.name,
    imageUrl: image?.url,
    link: artist.external_urls?.spotify,
  });

  const flag = artist.name.toLowerCase() === requested.toLowerCase() ? "ok" : "CHECK";
  console.error(
    `${flag}  ${requested} -> ${artist.name}  ${artist.external_urls?.spotify ?? ""}`
  );
}

console.log("export const likedArtists: Artist[] = [");
for (const row of rows) {
  console.log("  {");
  console.log(`    id: ${JSON.stringify(row.id)},`);
  console.log(`    name: ${JSON.stringify(row.name)},`);
  if (row.imageUrl) console.log(`    imageUrl: ${JSON.stringify(row.imageUrl)},`);
  if (row.link) console.log(`    link: ${JSON.stringify(row.link)},`);
  console.log("  },");
}
console.log("];");
