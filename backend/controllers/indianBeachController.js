import axios from "axios";
import getWikimediaImage from "../utils/getWikimediaImage.js";

export const searchBeaches = async (req, res) => {
  const { q = "", state } = req.query;

  if (!state) {
    return res.status(400).json({ error: "Query parameter 'state' is required" });
  }

  try {
    const overpassUrl = "https://overpass-api.de/api/interpreter";

    const buildQuery = (searchQuery = "") => `
      [out:json][timeout:25];
      area["name"="${state}"][admin_level=4]->.searchArea;
      (
        node["natural"="beach"](area.searchArea)${searchQuery ? `[name~"${searchQuery}",i]` : ""};
        way["natural"="beach"](area.searchArea)${searchQuery ? `[name~"${searchQuery}",i]` : ""};
        relation["natural"="beach"](area.searchArea)${searchQuery ? `[name~"${searchQuery}",i]` : ""};
      );
      out center;
    `;

    // Step 1: Try fetching with search query
    let response = await axios.post(overpassUrl, buildQuery(q), {
      headers: { "Content-Type": "text/plain" },
    });

    let beaches = response.data.elements.map((el) => ({
      id: el.id,
      name: el.tags?.name || "Unknown",
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,
      type: el.type,
      tags: el.tags,
    }));

    // Step 2: If no results, try fetching just by state
    if (beaches.length === 0 && q) {
      response = await axios.post(overpassUrl, buildQuery(), {
        headers: { "Content-Type": "text/plain" },
      });

      beaches = response.data.elements.map((el) => ({
        id: el.id,
        name: el.tags?.name || "Unknown",
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        type: el.type,
        tags: el.tags,
      }));
    }

    // Step 3: Fetch Wikimedia image for each beach (in parallel)
    const beachesWithImages = await Promise.all(
      beaches.map(async (beach) => ({
        ...beach,
        image: await getWikimediaImage(beach.name),
      }))
    );

    res.json(beachesWithImages);
  } catch (error) {
    console.error("Overpass API error:", error.message);
    res.status(500).json({ error: "Failed to fetch beaches data" });
  }
};
