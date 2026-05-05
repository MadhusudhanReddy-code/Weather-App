const apikey = "4694e1e64592529050b45d3f3e012314";

// ✅ Live Date & Time
function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    document.getElementById("datetime").innerText =
        "📅 " + date + " | ⏰ " + time;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// ✅ Get weather by city
async function getweather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        document.getElementById("cityname").innerText = "Loading...";

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod != 200) {
            alert(data.message || "City not found");
            document.getElementById("cityname").innerText = "";
            return;
        }

        displayweather(data);

    } catch (error) {
        alert("Error fetching data");
    }
}

// ✅ Get weather by location
function getlocation() {
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

            try {
                document.getElementById("cityname").innerText = "Loading...";

                const res = await fetch(url);
                const data = await res.json();

                if (data.cod != 200) {
                    alert(data.message || "Error getting location weather");
                    return;
                }

                displayweather(data);

            } catch (error) {
                alert("Error fetching data");
            }
        },
    );
}

// ✅ Display weather
function displayweather(data) {
    document.getElementById("cityname").innerText = data.name;
    document.getElementById("temp").innerText = "Temperature: " + data.main.temp + "°C";
    document.getElementById("condition").innerText = "Condition: " + data.weather[0].main;
    document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
    document.getElementById("wind").innerText = "Wind: " + data.wind.speed + " m/s";

    // ✅ Show city local time
    const now = new Date();
    const cityTime = new Date(now.getTime() + data.timezone * 1000);

    
}

