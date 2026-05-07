const apikey = "4694e1e64592529050b45d3f3e012314";

/* ===== DATE & TIME ===== */
function updateDateTime() {
    const now = new Date();
    document.getElementById("datetime").innerText =
        "📅 " + now.toLocaleDateString() +
        " | ⏰ " + now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

/* ===== ENTER KEY SUPPORT ===== */
document.getElementById("city").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getweather();
    }
});

/* ===== GET WEATHER BY CITY ===== */
async function getweather() {
    const input = document.getElementById("city");
    const city = input.value.trim();

    if (!city) {
        alert("Enter city name");
        return;
    }

    input.value = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        document.getElementById("cityname").innerText = "Loading...";

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod != 200) {
            throw new Error(data.message);
        }

        displayweather(data);

    } catch (error) {

    document.getElementById("cityname").innerText = "City not found";
    document.getElementById("temp").innerText = "";
    document.getElementById("condition").innerText = "";
    document.getElementById("humidity").innerText = "";
    document.getElementById("wind").innerText = "";
    document.getElementById("citytime").innerText = "";

    alert("❌ " + error.message);
}
}

/* ===== LOCATION WEATHER ===== */
function getlocation() {
    navigator.geolocation.getCurrentPosition(async (pos) => {

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

        try {
            document.getElementById("cityname").innerText = "Loading...";

            const res = await fetch(url);
            const data = await res.json();

            displayweather(data);

        } catch {
            alert("Error fetching location weather");
        }

    }, () => {
        alert("Location permission denied");
    });
}

/* ===== DISPLAY WEATHER ===== */
function displayweather(data) {

    document.getElementById("cityname").innerText = data.name;
    document.getElementById("temp").innerText = "Temparecher" + "🌡 " + data.main.temp + "°C";
    document.getElementById("condition").innerText = "Condition" + "🌤 " + data.weather[0].main;
    document.getElementById("humidity").innerText ="Humidity" + "💧 " + data.main.humidity + "%";
    document.getElementById("wind").innerText =" Wind" + "🌬 " + data.wind.speed + " m/s";

    /* CITY TIME */
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + data.timezone * 1000);

}
