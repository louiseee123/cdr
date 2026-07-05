/*
  Other JavaScript File
  - Xweather earthquakes integration for hazards page
*/

(function () {
  // Only run on pages that contain the earthquake table
  const tableBody = document.getElementById('earthquake-table-body');
  if (!tableBody) return;

  const indicator = document.getElementById('eq-indicator');

  // ============================
  // XWether configuration
  // ============================
  // NOTE: Put credentials in a backend for production.
  // This is a client-side demo.
  const XWEATHER_CLIENT_ID = 'PUT_CLIENT_ID_HERE';
  const XWEATHER_CLIENT_SECRET = 'xYZBKL9Ve5TG2d0qXs4ke_k1F9DV4jam6QP170BmCQ8yO5W0nK3ym07GTlHJct

';

  // Adjust these parameters depending on Xweather API docs
  // Typical query params could include: lat/lon, region, magnitude range, etc.
  // We'll use toledo/visayas keywords filtering like RapidAPI version.

  const VISAYAS_KEYWORDS = [
    'cebu', 'negros', 'bohol', 'iloilo', 'leyte', 'samar', 'panay', 'boracay',
    'toledo', 'dumaguete', 'tagbilaran', 'bacolod', 'ormoc', 'tacloban'
  ];

  function getMagnitudeClass(mag) {
    if (mag < 4) return 'low';
    if (mag < 6) return 'moderate';
    return 'high';
  }

  function renderEarthquakes(list) {
    if (!Array.isArray(list)) return;

    const filtered = list
      .filter(eq => {
        const loc = (eq.location || eq.place || '').toLowerCase();
        return VISAYAS_KEYWORDS.some(kw => loc.includes(kw));
      })
      .sort((a, b) => (b.magnitude ?? b.mag ?? 0) - (a.magnitude ?? a.mag ?? 0));

    const displayData = filtered.length > 0 ? filtered : list;

    tableBody.innerHTML = displayData
      .slice(0, 10)
      .map(eq => {
        const mag = eq.magnitude ?? eq.mag ?? 0;
        const loc = eq.location ?? eq.place ?? 'Unknown';
        const date = new Date(eq.date ?? eq.time ?? Date.now());
        const depth = eq.depth ?? 'N/A';
        const magClass = getMagnitudeClass(mag);

        return `
          <tr>
            <td><span class="eq-magnitude ${magClass}">${Number(mag).toFixed(1)}</span></td>
            <td>${loc}</td>
            <td>${date.toLocaleString('en-US')}</td>
            <td>${depth}</td>
          </tr>
        `;
      })
      .join('');
  }

  async function fetchXweatherEarthquakes() {
    if (indicator) indicator.classList.add('fetching');

    // If credentials are not set, skip fetch and keep placeholders.
    if (!XWEATHER_CLIENT_ID || XWEATHER_CLIENT_ID.includes('PUT_CLIENT_ID')) {
      throw new Error('Xweather client_id is not set.');
    }
    if (!XWEATHER_CLIENT_SECRET || XWEATHER_CLIENT_SECRET.includes('PUT_CLIENT_SECRET')) {
      throw new Error('Xweather client_secret is not set.');
    }

    // Example endpoint based on user message:
    // https://data.api.xweather.com/earthquakes/{action}?client_id={client_id}&client_secret={client_secret}&{params}
    // You MUST replace {action} and params based on your Xweather docs.
    const action = 'latest';
    const params = new URLSearchParams({
      // Placeholder params - replace according to docs
      // Example: 'region': 'visayas'
      // Example: 'count': '10'
      count: '30'
    });

    const url = `https://data.api.xweather.com/earthquakes/${action}?client_id=${encodeURIComponent(XWEATHER_CLIENT_ID)}&client_secret=${encodeURIComponent(XWEATHER_CLIENT_SECRET)}&${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Xweather HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();

    // Map Xweather response into our expected shape:
    // { magnitude, location/place, date/time, depth }
    // Replace field names based on actual Xweather response.
    const raw = data?.earthquakes || data?.data || data?.results || data || [];

    const mapped = Array.isArray(raw)
      ? raw.map(item => ({
          magnitude: item.magnitude ?? item.mag ?? item.magnitudeValue ?? item?.properties?.magnitude,
          location: item.location ?? item.place ?? item?.properties?.location ?? item?.properties?.place,
          date: item.date ?? item.time ?? item?.properties?.time,
          depth: item.depth ?? item?.properties?.depth
        }))
      : [];

    return mapped;
  }

  async function init() {
    // Clear any demo loading state
    try {
      const earthquakes = await fetchXweatherEarthquakes();
      renderEarthquakes(earthquakes);
    } catch (e) {
      console.warn('Xweather earthquake fetch failed; keeping existing placeholders.', e);
    } finally {
      if (indicator) indicator.classList.remove('fetching');
    }
  }

  // Run immediately and then refresh
  init();
  setInterval(init, 120000);
})();

