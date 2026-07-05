22/* ==========================================
   TOLEDO CITY CDRRMO - RESILIENCE PORTAL
   Main JavaScript File
   ========================================== */

// ==========================================
// GLOBAL CONSTANTS & DATA
// ==========================================

const TOLEDO_COORDS = [10.3819, 123.6386];

// All 38 Barangays of Toledo City
const BARANGAYS = [
  "Awihao", "Bagakay", "Bato", "Biga", "Bulongan", "Bunga", "Cabitoonan",
  "Calongcalong", "Cambang-ug", "Camp 8", "Canlumampao", "Cantabaco",
  "Capitan Claudio", "Carmen", "Daanglungsod", "Don Andres Soriano (Lutopan)",
  "Dumlog", "Gen. Climaco (Malubog)", "Ibo", "Ilihan",
  "Juan Climaco, Sr. (Magdugo)", "Landahan", "Loay", "Luray II",
  "Matab-ang", "Media Once", "Pangamihan", "Poblacion", "Poog",
  "Putingbato", "Sagay", "Sam-ang", "Sangi", "Santo Niño (Mainggit)",
  "Subayon", "Talavera", "Tubod", "Tungkay"
];

// Evacuation Centers Data (Location-Only, NO CAPACITY)
const EVACUATION_CENTERS = [
  { name: "Toledo City Sports Complex", barangay: "Poblacion", type: "Sports Complex", contact: "(032) 123-4567", coords: [10.383795202240222, 123.65228878039174] },
  { name: "Toledo Central School Gym", barangay: "Poblacion", type: "School Gymnasium", contact: "(032) 123-4568", coords: [10.379855260165431, 123.64147594479077] },
  { name: "Awihao Elementary School", barangay: "Awihao", type: "Elementary School", contact: "(032) 123-4569", coords: [10.332187577368193, 123.62065069762475] },
  { name: "Bagakay Barangay Hall", barangay: "Bagakay", type: "Barangay Hall", contact: "(032) 123-4570", coords: [10.36123726084688, 123.74972448053883] },
  { name: "Bato Elementary School", barangay: "Bato", type: "Elementary School", contact: "(032) 123-4571", coords: [10.340623663534888, 123.5911665534438] },
  { name: "Biga Covered Court", barangay: "Biga", type: "Covered Court", contact: "(032) 123-4572", coords: [10.347723905347749, 123.73245370904046] },
  { name: "Bulongan Multi-purpose Hall", barangay: "Bulongan", type: "Multi-purpose Hall", contact: "(032) 123-4573", coords: [10.31396302127715, 123.65383176693489] },
  { name: "Bunga Barangay Hall", barangay: "Bunga", type: "Barangay Hall", contact: "(032) 123-4574", coords: [10.302473559582468, 123.68576760828563] },
  { name: "Cabitoonan Elementary School", barangay: "Cabitoonan", type: "Elementary School", contact: "(032) 123-4575", coords: [10.357870715803669, 123.61284793809911] },
  { name: "Calongcalong Covered Court", barangay: "Calongcalong", type: "Covered Court", contact: "(032) 123-4576", coords: [10.419309049758624, 123.66723891782667] },
  { name: "Cambang-ug Barangay Hall", barangay: "Cambang-ug", type: "Barangay Hall", contact: "(032) 123-4577", coords: [10.352812654925676, 123.68421728061811] },
  { name: "Camp 8 Multi-purpose Hall", barangay: "Camp 8", type: "Multi-purpose Hall", contact: "(032) 123-4578", coords: [10.311043049551678, 123.7548846388908] },
  { name: "Canlumampao Elementary School", barangay: "Canlumampao", type: "Elementary School", contact: "(032) 123-4579", coords: [10.372737486099844, 123.67466178008398] },
  { name: "Cantabaco Gymnasium", barangay: "Cantabaco", type: "Gymnasium", contact: "(032) 123-4580", coords: [10.306411954592779, 123.73096698322463] },
  { name: "Capitan Claudio Barangay Hall", barangay: "Capitan Claudio", type: "Barangay Hall", contact: "(032) 123-4581", coords: [10.399942504985866, 123.68704376353213] },
  { name: "Carmen Covered Court", barangay: "Carmen", type: "Covered Court", contact: "(032) 123-4582", coords: [10.39310191851409, 123.66324540886919] },
  { name: "Daanglungsod Elementary School", barangay: "Daanglungsod", type: "Elementary School", contact: "(032) 123-4583", coords: [10.387516283759423, 123.64771682142353] },
  { name: "Don Andres Soriano Gym", barangay: "Don Andres Soriano (Lutopan)", type: "Gymnasium", contact: "(032) 123-4584", coords: [10.307704425675999, 123.70542400494182] },
  { name: "Dumlog Barangay Hall", barangay: "Dumlog", type: "Barangay Hall", contact: "(032) 123-4585", coords: [10.39356409994599, 123.65283130236591] },
  { name: "Gen. Climaco Multi-purpose Hall", barangay: "Gen. Climaco (Malubog)", type: "Multi-purpose Hall", contact: "(032) 123-4586", coords: [10.372863785282743, 123.71577404406662] },
  { name: "Ibo Elementary School", barangay: "Ibo", type: "Elementary School", contact: "(032) 123-4587", coords: [10.364943821637432, 123.61919982598496] },
  { name: "Ilihan Covered Court", barangay: "Ilihan", type: "Covered Court", contact: "(032) 123-4588", coords: [10.38245477729119, 123.65897502866834] },
  { name: "Juan Climaco, Sr. Barangay Hall", barangay: "Juan Climaco, Sr. (Magdugo)", type: "Barangay Hall", contact: "(032) 123-4589", coords: [10.35188954881838, 123.66620036168138] },
  { name: "Landahan Elementary School", barangay: "Landahan", type: "Elementary School", contact: "(032) 123-4590", coords: [10.347935667826086, 123.6498802939178] },
  { name: "Loay Covered Court", barangay: "Loay", type: "Covered Court", contact: "(032) 123-4591", coords: [10.328102369831331, 123.76042705159014] },
  { name: "Luray II Barangay Hall", barangay: "Luray II", type: "Barangay Hall", contact: "(032) 123-4592", coords: [10.382210689229879, 123.6438445183237] },
  { name: "Matab-ang Elementary School", barangay: "Matab-ang", type: "Elementary School", contact: "(032) 123-4593", coords: [10.433497921530872, 123.67092049577236] },
  { name: "Media Once Gymnasium", barangay: "Media Once", type: "Gymnasium", contact: "(032) 123-4594", coords: [10.330272117998604, 123.67718023809887] },
  { name: "Pangamihan Multi-purpose Hall", barangay: "Pangamihan", type: "Multi-purpose Hall", contact: "(032) 123-4595", coords: [10.37571898394555, 123.75528460926314] },
  { name: "Poblacion Barangay Hall", barangay: "Poblacion", type: "Barangay Hall", contact: "(032) 123-4596", coords: [10.372043482114309, 123.63758571066413] },
  { name: "Poog Covered Court", barangay: "Poog", type: "Covered Court", contact: "(032) 123-4597", coords: [10.322772083066406, 123.68476762460752] },
  { name: "Putingbato Elementary School", barangay: "Putingbato", type: "Elementary School", contact: "(032) 123-4598", coords: [10.376717544181952, 123.6869388092631] },
  { name: "Sagay Barangay Hall", barangay: "Sagay", type: "Barangay Hall", contact: "(032) 123-4599", coords: [10.323120682855526, 123.6382554957713] },
  { name: "Sam-ang Multi-purpose Hall", barangay: "Sam-ang", type: "Multi-purpose Hall", contact: "(032) 123-4600", coords: [10.340458521472534, 123.6590013074092] },
  { name: "Sangi Covered Court", barangay: "Sangi", type: "Covered Court", contact: "(032) 123-4601", coords: [10.386654350373508, 123.6495235534442] },
  { name: "Santo Niño Barangay Hall", barangay: "Santo Niño (Mainggit)", type: "Barangay Hall", contact: "(032) 123-4602", coords: [10.448110912518066, 123.67692350926389] },
  { name: "Subayon Elementary School", barangay: "Subayon", type: "Elementary School", contact: "(032) 123-4603", coords: [10.346583414261909, 123.63233096508174] },
  { name: "Talavera Covered Court", barangay: "Talavera", type: "Covered Court", contact: "(032) 123-4604", coords: [10.410273831429816, 123.66346277412993] },
  { name: "Tubod Gymnasium", barangay: "Tubod", type: "Gymnasium", contact: "(032) 123-4605", coords: [10.36770985246078, 123.63608573230732] },
  { name: "Tungkay Barangay Hall", barangay: "Tungkay", type: "Barangay Hall", contact: "(032) 123-4606", coords: [10.411407755616848, 123.78658556693586] }
];

// Barangay Hazard Data (All 38 Barangays)
const HAZARD_DATA = {
  "Awihao": { flood: "Low", landslide: "Moderate", earthquake: "Low" },
  "Bagakay": { flood: "Moderate", landslide: "High", earthquake: "Moderate" },
  "Bato": { flood: "Moderate", landslide: "Low", earthquake: "High" },
  "Biga": { flood: "Low", landslide: "High", earthquake: "Low" },
  "Bulongan": { flood: "High", landslide: "Moderate", earthquake: "Moderate" },
  "Bunga": { flood: "Moderate", landslide: "Low", earthquake: "Moderate" },
  "Cabitoonan": { flood: "High", landslide: "Moderate", earthquake: "Moderate" },
  "Calongcalong": { flood: "Low", landslide: "Moderate", earthquake: "Low" },
  "Cambang-ug": { flood: "Low", landslide: "High", earthquake: "Low" },
  "Camp 8": { flood: "Moderate", landslide: "Low", earthquake: "High" },
  "Canlumampao": { flood: "Moderate", landslide: "High", earthquake: "Moderate" },
  "Cantabaco": { flood: "Moderate", landslide: "Moderate", earthquake: "High" },
  "Capitan Claudio": { flood: "High", landslide: "High", earthquake: "Moderate" },
  "Carmen": { flood: "Low", landslide: "Low", earthquake: "Low" },
  "Daanglungsod": { flood: "Moderate", landslide: "Low", earthquake: "Moderate" },
  "Don Andres Soriano (Lutopan)": { flood: "Moderate", landslide: "Moderate", earthquake: "High" },
  "Dumlog": { flood: "Low", landslide: "Low", earthquake: "Low" },
  "Gen. Climaco (Malubog)": { flood: "Moderate", landslide: "Low", earthquake: "Moderate" },
  "Ibo": { flood: "High", landslide: "Moderate", earthquake: "Moderate" },
  "Ilihan": { flood: "Low", landslide: "High", earthquake: "Low" },
  "Juan Climaco, Sr. (Magdugo)": { flood: "High", landslide: "Moderate", earthquake: "Moderate" },
  "Landahan": { flood: "Moderate", landslide: "Low", earthquake: "Moderate" },
  "Loay": { flood: "Low", landslide: "High", earthquake: "Low" },
  "Luray II": { flood: "Moderate", landslide: "Moderate", earthquake: "High" },
  "Matab-ang": { flood: "High", landslide: "Moderate", earthquake: "Moderate" },
  "Media Once": { flood: "Moderate", landslide: "Low", earthquake: "Moderate" },
  "Pangamihan": { flood: "Low", landslide: "High", earthquake: "Low" },
  "Poblacion": { flood: "Low", landslide: "Low", earthquake: "Moderate" },
  "Poog": { flood: "Moderate", landslide: "High", earthquake: "Moderate" },
  "Putingbato": { flood: "High", landslide: "Moderate", earthquake: "Moderate" },
  "Sagay": { flood: "Low", landslide: "Low", earthquake: "Low" },
  "Sam-ang": { flood: "Moderate", landslide: "Moderate", earthquake: "High" },
  "Sangi": { flood: "Low", landslide: "High", earthquake: "Low" },
  "Santo Niño (Mainggit)": { flood: "Moderate", landslide: "Low", earthquake: "Moderate" },
  "Subayon": { flood: "High", landslide: "Moderate", earthquake: "Moderate" },
  "Talavera": { flood: "Low", landslide: "High", earthquake: "Low" },
  "Tubod": { flood: "Moderate", landslide: "Moderate", earthquake: "High" },
  "Tungkay": { flood: "Low", landslide: "Low", earthquake: "Low" }
};

// Gallery Data
const GALLERY_DATA = [
  { year: "2023", category: "rescue", title: "Post-Typhoon Odette Operations", caption: "Quick Response Team clearing roads after Typhoon Odette", image: "assets/images/gallery/img2.jpg" },
  { year: "2023", category: "community", title: "Community Earthquake Drill", caption: "Barangay Cantabaco participates in the annual earthquake drill", image: "assets/images/gallery/img1.jpg" },
  { year: "2023", category: "medical", title: "Medical Mission", caption: "CDRRMO partners with DOH for community health mission", image: "assets/images/gallery/img3.jpg" },
  { year: "2022", category: "training", title: "Quick Response Team Training", caption: "Intensive training for new QRT members", image: "assets/images/gallery/img4.jpg" },
  { year: "2022", category: "rescue", title: "Flood Rescue Simulation", caption: "Simulation exercise for flood response protocols", image: "assets/images/gallery/img5.jpg" },
  { year: "2022", category: "community", title: "Disaster Preparedness Seminar", caption: "Barangay officials attend disaster preparedness workshop", image: "assets/images/gallery/img6.jpg" },
  { year: "2021", category: "community", title: "COVID-19 Response", caption: "Distribution of food packs during COVID-19 lockdown", image: "assets/images/gallery/img7.jpg" },
  { year: "2021", category: "training", title: "Hazard Mapping Workshop", caption: "Community-based hazard mapping workshop", image: "assets/images/gallery/img8.jpg" },
  { year: "2020", category: "community", title: "Evacuation Center Setup", caption: "Setup of COVID-safe evacuation centers", image: "assets/images/gallery/img9.jpg" },
  { year: "2020", category: "community", title: "Relief Operations", caption: "Relief operations during Typhoon Rolly", image: "assets/images/gallery/img10.jpg" },
  { year: "2019", category: "training", title: "Search and Rescue Competition", caption: "Toledo City QRT wins regional SAR competition", image: "assets/images/gallery/img11.jpg" },
  { year: "2018", category: "community", title: "Barangay Disaster Preparedness", caption: "Brgy. Poblacion conducts first-ever disaster drill", image: "assets/images/gallery/img12.jpg" }
];

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function getTodayDate() {
  const now = new Date();
  return now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getBadgeClass(level) {
  switch(level.toLowerCase()) {
    case 'low': return 'badge-low';
    case 'moderate': return 'badge-moderate';
    case 'high': return 'badge-high';
    default: return 'badge-low';
  }
}

function getMagnitudeClass(mag) {
  if (mag < 4) return 'low';
  if (mag < 6) return 'moderate';
  return 'high';
}

// ==========================================
// HEADER & NAVIGATION
// ==========================================

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}

// ==========================================
// ALERT BAR
// ==========================================

function initAlertBar() {
  const alertBar = document.querySelector('.alert-bar');
  if (!alertBar) return;

  // Update timestamp
  const timestampEl = alertBar.querySelector('.alert-time');
  if (timestampEl) {
    timestampEl.textContent = getCurrentTimestamp();
    setInterval(() => {
      timestampEl.textContent = getCurrentTimestamp();
    }, 60000);
  }

  // Click to expand when active
  alertBar.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      this.classList.toggle('expanded');
    }
  });

  // Close button
  const closeBtn = alertBar.querySelector('.alert-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      alertBar.style.display = 'none';
    });
  }
}

// Function to set active alert (can be called from external source)
function setActiveAlert(message, details = '') {
  const alertBar = document.querySelector('.alert-bar');
  if (!alertBar) return;

  alertBar.classList.add('active');
  alertBar.querySelector('.alert-message').textContent = message;

  const expandEl = alertBar.querySelector('.alert-expand');
  if (expandEl && details) {
    expandEl.textContent = details;
  }
}

// ==========================================
// LIVE TIMESTAMP UPDATES
// ==========================================

function initTimestamps() {
  // Update all elements with data-timestamp="live"
  const timestamps = document.querySelectorAll('[data-timestamp="live"]');
  timestamps.forEach(el => {
    el.textContent = getCurrentTimestamp();
    setInterval(() => {
      el.textContent = getCurrentTimestamp();
    }, 60000);
  });

  // Update time elements
  const timeEls = document.querySelectorAll('[data-time]');
  timeEls.forEach(el => {
    el.textContent = getCurrentTime();
    setInterval(() => {
      el.textContent = getCurrentTime();
    }, 60000);
  });

  // Update date elements
  const dateEls = document.querySelectorAll('[data-date]');
  dateEls.forEach(el => {
    el.textContent = getTodayDate();
  });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ==========================================
// PAGE LOAD ANIMATIONS
// ==========================================

function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animate || 'fade-in-up';
        entry.target.classList.add(animation);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// WEATHER PAGE FUNCTIONS
// ==========================================

function initWeatherPage() {
  // Live timestamp for the Weather Summary section
  const weatherTimeEl = document.getElementById('weather-time');
  if (weatherTimeEl) {
    weatherTimeEl.textContent = getCurrentTimestamp();
    setInterval(() => {
      weatherTimeEl.textContent = getCurrentTimestamp();
    }, 60000);
  }

  // Replace 5-day outlook labels with actual dates
  const outlookDayEls = [
    document.getElementById('outlook-day0'),
    document.getElementById('outlook-day1'),
    document.getElementById('outlook-day2'),
    document.getElementById('outlook-day3'),
    document.getElementById('outlook-day4')
  ];

  if (outlookDayEls.some(Boolean)) {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const offsets = [0, 1, 2, 3, 4];
    outlookDayEls.forEach((el, idx) => {
      if (!el) return;
      const d = new Date(now);
      d.setDate(now.getDate() + offsets[idx]);
      el.textContent = fmt.format(d);
    });
  }

  // Weatherbit live data -> fill the Weather Summary cards

  // IMPORTANT: This is a client-side demo. For production, use a backend proxy.
  const WEATHERBIT_API_KEY = 'd87bab0a82bd45718162dcd31f9d9004';
  const lat = TOLEDO_COORDS[0];
  const lon = TOLEDO_COORDS[1];

  // Safer DOM selectors (Weatherbit values will be written into known card cells)

  // Map values to the correct “Current Conditions” rows by icon/class order in weather.html
  const currentCard = document.querySelector('.weather-card:nth-of-type(1)');
  const currentRows = currentCard ? currentCard.querySelectorAll('.weather-item') : [];

  const humidityValue = currentRows[0]?.querySelector('.value');
  const windValue = currentRows[1]?.querySelector('.value');
  const visibilityValue = currentRows[2]?.querySelector('.value');
  const pressureValue = currentRows[3]?.querySelector('.value');


  const updateFn = (payload) => {
    const current = payload?.current;
    if (!current) return;

    // Temperature
    const tempEl = document.querySelector('.weather-card:nth-of-type(1) .weather-temp');
    if (tempEl && current.temp !== undefined) {
      tempEl.innerHTML = `${Math.round(Number(current.temp))}&deg;C`;
    }

    // Condition (Weatherbit typically provides `weather.description`)
    const condEl = document.querySelector('.weather-card:nth-of-type(1) .weather-condition');
    const desc = current.weather?.description || current.weather?.icon;
    if (condEl && desc) {
      condEl.innerHTML = `<i class="fas fa-cloud-sun" style="color: var(--gold); font-size: 1.25rem; margin-right: 6px;"></i>${desc}`;
    }

    // Humidity
    // Weatherbit field is typically `rh` (relative humidity). Fallback to `humidity` if present.
    if (humidityValue) {
      const rh = current.rh !== undefined ? current.rh : current.humidity;
      if (rh !== undefined) humidityValue.textContent = `${Math.round(Number(rh))}%`;
    }

    // Wind speed
    // Weatherbit field is typically `wind_spd` (km/h with units=M)
    if (windValue) {
      const spd = current.wind_spd !== undefined ? current.wind_spd : current.wind_spd_kmh;
      if (spd !== undefined) windValue.textContent = `${Math.round(Number(spd))} km/h`;
    }

    // Visibility
    // Weatherbit field is typically `vis` (km). Avoid using unrelated fields.
    if (visibilityValue) {
      const vis = current.vis !== undefined ? current.vis : current.visibility;
      if (vis !== undefined) visibilityValue.textContent = `${Math.round(Number(vis))} km`;
    }

    // Pressure
    // Weatherbit field is typically `pres` (hPa)
    if (pressureValue) {
      const pres = current.pres !== undefined ? current.pres : current.pressure;
      if (pres !== undefined) pressureValue.textContent = `${Math.round(Number(pres))} hPa`;
    }


  };

  async function fetchWeather() {
    try {
      const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}&units=M`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Weatherbit HTTP ${res.status}`);
      const data = await res.json();
      const current = data?.data?.[0] || null;
      updateFn({ current });
    } catch (e) {
      console.warn('Weatherbit fetch failed; keeping existing placeholder values.', e);
    }
  }

  async function fetchForecast() {
    // Fills 24-hour forecast + 5-day outlook using Weatherbit Daily + Hourly endpoints.
    // If API limits/blocking occur, placeholders remain.
    try {
      const dailyUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}&units=M&days=5`;
      const hourlyUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}&units=M&hours=24`;

      const [dailyRes, hourlyRes] = await Promise.all([fetch(dailyUrl), fetch(hourlyUrl)]);
      if (!dailyRes.ok) throw new Error(`Weatherbit daily HTTP ${dailyRes.status}`);
      if (!hourlyRes.ok) throw new Error(`Weatherbit hourly HTTP ${hourlyRes.status}`);

      const dailyData = await dailyRes.json();
      const hourlyData = await hourlyRes.json();

      const days = dailyData?.data || [];
      const hours = hourlyData?.data || [];

      // ---- 5-Day Outlook: Today..Day5 uses dailyData indices 0..4
      const outlook = document.querySelector('.weather-card:nth-of-type(3)');
      if (outlook) {
        const items = outlook.querySelectorAll('.weather-item .value');
        const templates = [0, 1, 2, 3, 4];

        templates.forEach((idx, i) => {
          const itemEl = items[i];
          const d = days[idx];
          if (!itemEl || !d) return;

          const max = d.max_temp !== undefined ? d.max_temp : d.temp;
          const desc = d.weather?.description || d.weather?.icon || 'Forecast';

          if (max !== undefined) {
            // Use innerHTML so &deg; renders as a degree symbol
            itemEl.innerHTML = `${Math.round(Number(max))}&deg;C - ${desc}`;
          }

        });
      }

      // ---- 24-Hour Forecast: Morning/Afternoon/Evening/Night based on hour groups
      const forecastCard = document.querySelector('.weather-card:nth-of-type(2)');
      if (forecastCard) {
        const values = forecastCard.querySelectorAll('.weather-item .value');
        const groups = [
          { start: 6, end: 12, label: 'Morning' },
          { start: 12, end: 18, label: 'Afternoon' },
          { start: 18, end: 22, label: 'Evening' },
          { start: 22, end: 6, label: 'Night', wrap: true }
        ];

        // Helper to get hour entries for a group (using `timestamp_local` if present)
        const hourToLocal = (h) => {
          // Weatherbit hourly objects often have `timestamp_local` ISO string.
          // Fall back to `timestamp`.
          const t = h.timestamp_local || h.datetime || h.timestamp;
          return new Date(t);
        };

        groups.forEach((g, i) => {
          const el = values[i];
          if (!el) return;

          const selected = hours.filter(h => {
            const dt = hourToLocal(h);
            if (Number.isNaN(dt.getTime())) return false;
            const hr = dt.getHours();
            if (g.wrap) return (hr >= g.start || hr < g.end);
            return hr >= g.start && hr < g.end;
          });

          const pick = selected[0] || hours[0];
          if (!pick) return;

          const temp = pick.temp !== undefined ? pick.temp : pick.temp_avg;
          const desc = pick.weather?.description || pick.weather?.icon || 'Forecast';
          if (temp !== undefined) {
            // Set by textContent; keep the °C entity consistent with template
            el.innerHTML = `${Math.round(Number(temp))}&deg;C - ${desc}`;
          }
        });
      }

    } catch (e) {
      console.warn('Weatherbit forecast fetch failed; keeping placeholders.', e);
    }
  }

  // Initial fetch + refresh
  fetchWeather();
  fetchForecast();

  setInterval(() => {
    fetchWeather();
    fetchForecast();
  }, 30 * 60 * 1000); // every 30 min
}


// ==========================================

// EARTHQUAKE API INTEGRATION
// ==========================================

async function fetchEarthquakes() {
  const tableBody = document.getElementById('earthquake-table-body');
  const indicator = document.getElementById('eq-indicator');

  if (!tableBody) return;

  if (indicator) {
    indicator.classList.add('fetching');
    indicator.querySelector('.pulse').style.background = '#F39C12';
  }

  try {
    // Using the RapidAPI endpoint
    // NOTE: RapidAPI usually requires an API key header.
    // If the key is missing, the request will fail and we fall back to demo data.
    const response = await fetch('https://latest-earthquakes.p.rapidapi.com/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'latest-earthquakes.p.rapidapi.com',
        // 'x-rapidapi-key': 'PASTE_YOUR_KEY_HERE' // <-- add your key to enable true live data
      }
    });

    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    displayEarthquakes(data);
  } catch (error) {
    console.warn('Earthquake API failed, using fallback data:', error);
    // Fallback data for demonstration
const fallbackData = [
      { magnitude: 4.2, location: "15km W of Sagay, Negros Occidental", date: new Date(Date.now()-1000*60*60*2).toISOString(), depth: "12 km" },
      { magnitude: 3.8, location: "22km SE of Toledo City, Cebu", date: new Date(Date.now()-1000*60*60*4).toISOString(), depth: "8 km" },
      { magnitude: 5.1, location: "45km N of Dumaguete City, Negros Oriental", date: new Date(Date.now()-1000*60*60*6).toISOString(), depth: "25 km" },
      { magnitude: 2.9, location: "8km E of Balamban, Cebu", date: new Date(Date.now()-1000*60*60*9).toISOString(), depth: "5 km" },
      { magnitude: 4.6, location: "30km SW of Cebu City, Cebu", date: new Date(Date.now()-1000*60*60*12).toISOString(), depth: "18 km" },
      { magnitude: 3.2, location: "12km N of Toledo City, Cebu", date: new Date(Date.now()-1000*60*60*15).toISOString(), depth: "10 km" },
      { magnitude: 4.8, location: "55km W of Tagbilaran City, Bohol", date: new Date(Date.now()-1000*60*60*18).toISOString(), depth: "35 km" },
      { magnitude: 2.5, location: "5km S of Pinamungajan, Cebu", date: new Date(Date.now()-1000*60*60*21).toISOString(), depth: "7 km" }
    ];
    displayEarthquakes(fallbackData);
  } finally {
    if (indicator) {
      indicator.classList.remove('fetching');
      indicator.querySelector('.pulse').style.background = '#27AE60';
    }
  }
}

function displayEarthquakes(earthquakes) {
  const tableBody = document.getElementById('earthquake-table-body');
  if (!tableBody) return;

  // Filter for Visayas region and sort by magnitude
  const visayasKeywords = ['cebu', 'negros', 'bohol', 'iloilo', 'leyte', 'samar', 'panay', 'boracay',
    'toledo', 'dumaguete', 'tagbilaran', 'bacolod', 'iloilo', 'ormoc', 'tacloban'];

  const filtered = earthquakes.filter(eq => {
    const loc = (eq.location || eq.place || '').toLowerCase();
    return visayasKeywords.some(kw => loc.includes(kw));
  }).sort((a, b) => (b.magnitude || b.mag) - (a.magnitude || a.mag));

  // If no Visayas earthquakes found, show all
  const displayData = filtered.length > 0 ? filtered : earthquakes;

  tableBody.innerHTML = displayData.slice(0, 10).map(eq => {
    const mag = eq.magnitude || eq.mag || 0;
    const loc = eq.location || eq.place || 'Unknown';
    const date = new Date(eq.date || eq.time || Date.now());
    const depth = eq.depth || 'N/A';
    const magClass = getMagnitudeClass(mag);

    return `
      <tr>
        <td><span class="eq-magnitude ${magClass}">${mag.toFixed(1)}</span></td>
        <td>${loc}</td>
        <td>${date.toLocaleString('en-US')}</td>
        <td>${depth}</td>
      </tr>
    `;
  }).join('');
}

function initEarthquakeFeed() {
  const tableBody = document.getElementById('earthquake-table-body');
  if (!tableBody) return;

  // Initial fetch
  fetchEarthquakes();

  // Auto-refresh every 2 minutes
  setInterval(fetchEarthquakes, 120000);
}

// ==========================================
// BARANGAY HAZARD TABLE
// ==========================================

function populateHazardTable() {
  const tableBody = document.getElementById('hazard-table-body');
  if (!tableBody) return;

  let html = '';
  let index = 1;

  for (const [barangay, hazards] of Object.entries(HAZARD_DATA)) {
    html += `
      <tr data-barangay="${barangay.toLowerCase()}">
        <td>${index}</td>
        <td><strong>${barangay}</strong></td>
        <td><span class="badge ${getBadgeClass(hazards.flood)}"><span class="badge-dot"></span> ${hazards.flood}</span></td>
        <td><span class="badge ${getBadgeClass(hazards.landslide)}"><span class="badge-dot"></span> ${hazards.landslide}</span></td>
        <td><span class="badge ${getBadgeClass(hazards.earthquake)}"><span class="badge-dot"></span> ${hazards.earthquake}</span></td>
      </tr>
    `;
    index++;
  }

  tableBody.innerHTML = html;
}

function initHazardSearch() {
  const searchInput = document.getElementById('hazard-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll('#hazard-table-body tr');

    rows.forEach(row => {
      const barangay = row.dataset.barangay;
      if (barangay && barangay.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// ==========================================
// EVACUATION PAGE FUNCTIONS
// ==========================================

let evacMap = null;
let evacMarkers = [];

function initEvacuationPage() {
  populateBarangayDropdown();
  renderEvacuationCards();
  initEvacuationMap();
  initEvacuationFilter();
}

function populateBarangayDropdown() {
  const dropdown = document.getElementById('barangay-filter');
  if (!dropdown) return;

  // Add "All Barangays" option
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All Barangays';
  dropdown.appendChild(allOption);

  // Add all barangays
  BARANGAYS.forEach(barangay => {
    const option = document.createElement('option');
    option.value = barangay;
    option.textContent = barangay;
    dropdown.appendChild(option);
  });
}

function renderEvacuationCards(centers = EVACUATION_CENTERS) {
  const container = document.getElementById('evacuation-list');
  if (!container) return;

  const emptyEl = document.getElementById('evac-empty');

  if (centers.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    container.innerHTML = '';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';


  container.innerHTML = centers.map(center => `
    <article class="evac-card" data-barangay="${center.barangay}" data-center-name="${center.name}">
      <div class="evac-card-top">
        <div class="evac-badge">
          <i class="fas fa-map-marked-alt"></i>
          <span>${center.barangay}</span>
        </div>

        <div class="evac-card-actions" aria-hidden="true">
          <i class="fas fa-circle-notch"></i>
        </div>
      </div>

      <h4 class="evac-card-title">
        <i class="fas fa-shield-alt" style="color: var(--gold); margin-right: 8px;"></i>
        ${center.name}
      </h4>

      <div class="info-row">
        <i class="fas fa-building"></i>
        <span>${center.type}</span>
      </div>

      <div class="info-row">
        <i class="fas fa-phone"></i>
        <span>${center.contact}</span>
      </div>

      <div class="evac-card-cta">
        <button type="button" class="evac-cta-chip evac-cta-btn" data-center-name="${center.name}">
          <i class="fas fa-location-dot"></i> View on map
        </button>
      </div>
    </article>
  `).join('');

  // Attach click handlers for “View on map” so only that marker remains visible
  const btns = container.querySelectorAll('.evac-cta-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const centerName = btn.dataset.centerName || btn.getAttribute('data-center-name');
      if (!centerName) return;
      showOnlyEvacCenterOnMap(centerName);
      // Ensure dropdown/map state reflects only this marker
      try { markerForCenterName = centerName; } catch (_) {}
    });
  });

}

function showOnlyEvacCenterOnMap(centerName) {
  if (!evacMap) return;

  // Remove every marker from the map
  evacMarkers.forEach(({ marker }) => {
    try { marker.remove(); } catch (_) {}
  });

  // Add only the selected one
  const match = evacMarkers.find(m => m.name === centerName);
  if (!match || !match.marker) return;

  match.marker.addTo(evacMap);

  // Pan/zoom to it
  try {
    evacMap.setView(match.marker.getLatLng(), 14, { animate: true });
  } catch (_) {}
}


function initEvacuationMap() {
  const mapContainer = document.getElementById('evacuation-map');
  if (!mapContainer || typeof L === 'undefined') return;

  evacMap = L.map('evacuation-map').setView(TOLEDO_COORDS, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(evacMap);

  // Add markers for all evacuation centers
  EVACUATION_CENTERS.forEach(center => {
    const marker = L.marker(center.coords)
      .bindPopup(`
        <h4>${center.name}</h4>
        <p><i class="fas fa-map-marker-alt" style="color: var(--gold);"></i> ${center.barangay}</p>
        <p><i class="fas fa-building" style="color: var(--gold);"></i> ${center.type}</p>
        <p><i class="fas fa-phone" style="color: var(--gold);"></i> ${center.contact}</p>
      `);
    marker.addTo(evacMap);
    // Keep name + coords for reliable lookup from the card button
    evacMarkers.push({ marker, barangay: center.barangay, name: center.name, coords: center.coords });
  });
}

function initEvacuationFilter() {
  const dropdown = document.getElementById('barangay-filter');
  const searchInput = document.getElementById('evac-search');

  if (dropdown) {
    dropdown.addEventListener('change', filterEvacuationCenters);
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterEvacuationCenters);
  }
}

function filterEvacuationCenters() {
  const dropdown = document.getElementById('barangay-filter');
  const searchInput = document.getElementById('evac-search');

  const selectedBarangay = dropdown ? dropdown.value : 'all';
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';

  const filtered = EVACUATION_CENTERS.filter(center => {
    const matchBarangay = selectedBarangay === 'all' || center.barangay === selectedBarangay;
    const matchSearch = center.barangay.toLowerCase().includes(searchQuery) ||
                       center.name.toLowerCase().includes(searchQuery);
    return matchBarangay && matchSearch;
  });

  // Update cards
  renderEvacuationCards(filtered);

  // Update map markers
  if (evacMarkers.length > 0) {
    evacMarkers.forEach(({ marker, barangay }) => {
      const matchBarangay = selectedBarangay === 'all' || barangay === selectedBarangay;
      const matchSearch = barangay.toLowerCase().includes(searchQuery);

      if (matchBarangay && matchSearch) {
        marker.addTo(evacMap);
      } else {
        marker.remove();
      }
    });
  }
}

// ==========================================
// GALLERY PAGE FUNCTIONS
// ==========================================

let currentGalleryFilter = 'all';
let visibleGalleryCount = 9;

function initGalleryPage() {
  renderGallery('all');
  initGalleryFilters();
  initLightbox();
}

function renderGallery(filter) {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  currentGalleryFilter = filter;

  const filtered = filter === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === filter);

  const toShow = filtered.slice(0, visibleGalleryCount);

  container.innerHTML = toShow.map((item, index) => `
    <div class="gallery-item" data-index="${index}" data-category="${item.category}">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <span class="year-badge">${item.year}</span>
        <h4>${item.title}</h4>
        <p>${item.caption}</p>
      </div>
    </div>
  `).join('');

  // Show/hide load more button
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = toShow.length < filtered.length ? 'inline-flex' : 'none';
  }
}

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      visibleGalleryCount = 9; // Reset count
      renderGallery(this.dataset.filter);
    });
  });

  // Load more button
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleGalleryCount += 6;
      renderGallery(currentGalleryFilter);
    });
  }
}

// ==========================================
// LIGHTBOX
// ==========================================

let currentLightboxIndex = 0;
let currentLightboxItems = [];

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });

  // Close button
  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Navigation
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Gallery item clicks
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const galleryGrid = document.getElementById('gallery-grid');
      if (galleryGrid) {
        currentLightboxItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
        currentLightboxIndex = currentLightboxItems.indexOf(item);
        openLightbox(item);
      }
    }
  });
}

function openLightbox(item) {
  const lightbox = document.getElementById('lightbox');
  const img = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');

  const imgEl = item.querySelector('img');
  const title = item.querySelector('h4')?.textContent || '';
  const desc = item.querySelector('p')?.textContent || '';

  if (img) img.src = imgEl.src;
  if (caption) caption.innerHTML = `<strong>${title}</strong><br>${desc}`;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  if (currentLightboxItems.length === 0) return;

  currentLightboxIndex += direction;

  if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentLightboxItems.length - 1;
  } else if (currentLightboxIndex >= currentLightboxItems.length) {
    currentLightboxIndex = 0;
  }

  const item = currentLightboxItems[currentLightboxIndex];
  if (item) {
    const img = document.querySelector('.lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    const imgEl = item.querySelector('img');
    const title = item.querySelector('h4')?.textContent || '';
    const desc = item.querySelector('p')?.textContent || '';

    if (img) img.src = imgEl.src;
    if (caption) caption.innerHTML = `<strong>${title}</strong><br>${desc}`;
  }
}

// ==========================================
// ABOUT PAGE - CONTACT FORM
// ==========================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your message has been received. We will respond within 24 hours.');
    this.reset();
  });
}

// ==========================================
// LEAFLET MAP INITIALIZATION (General)
// ==========================================

function initLeafletMap() {
  const mapContainer = document.getElementById('leaflet-map');
  if (!mapContainer || typeof L === 'undefined') return;

  const map = L.map('leaflet-map').setView(TOLEDO_COORDS, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(TOLEDO_COORDS)
    .addTo(map)
    .bindPopup('<strong>Toledo City</strong><br>CDRRMO Command Center')
    .openPopup();
}

// ==========================================
// RAINFALL GAUGE ANIMATION
// ==========================================

function initRainfallGauges() {
  const gauges = document.querySelectorAll('.rainfall-gauge');
  gauges.forEach(gauge => {
    const value = parseFloat(gauge.dataset.value) || 0;
    const max = parseFloat(gauge.dataset.max) || 100;
    const percentage = Math.min((value / max) * 100, 100);

    const fill = gauge.querySelector('.gauge-fill');
    if (fill) {
      setTimeout(() => {
        fill.style.width = percentage + '%';
      }, 300);
    }
  });
}

// ==========================================
// SCROLL-REVEAL ANIMATIONS
// ==========================================

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Global functions
  initHeader();
  initAlertBar();
  initTimestamps();
  initSmoothScroll();
  initAnimations();
  initScrollReveal();
  initContactForm();

  // Page-specific functions
  const currentPage = document.body.dataset.page;

  switch(currentPage) {
    case 'home':
      // Homepage specific
      break;

    case 'weather':
      initWeatherPage();
      break;

    case 'hazards':
      populateHazardTable();
      initHazardSearch();
      initEarthquakeFeed();
      break;

    case 'evacuation':
      initEvacuationPage();
      break;

    case 'gallery':
      initGalleryPage();
      break;

    case 'about':
      initContactForm();
      break;
  }

  // Initialize any general Leaflet maps
  initLeafletMap();
});

// ==========================================
// SERVICE WORKER (Optional - for PWA)
// ==========================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Basic offline support could be added here
    console.log('Service Worker support available');
  });
}
