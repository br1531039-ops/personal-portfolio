<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Advanced Weather Dashboard</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>

/* =========================
   GLOBAL
========================= */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{

    min-height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;

    padding:30px;

    background:
    linear-gradient(rgba(0,0,0,0.65),
    rgba(0,0,0,0.75)),

    url("https://wallpapercave.com/wp/wp9028808.jpg");

    background-size:cover;
    background-position:center;

    color:white;
}

/* =========================
   MAIN CONTAINER
========================= */

.weather-app{

    width:100%;
    max-width:900px;

    background:rgba(255,255,255,0.08);

    border:1px solid rgba(255,255,255,0.15);

    backdrop-filter:blur(14px);

    border-radius:30px;

    padding:35px;

    box-shadow:
    0 0 25px rgba(0,255,255,0.25);
}

/* =========================
   HEADER
========================= */

header{

    text-align:center;

    margin-bottom:35px;
}

header h1{

    font-size:3rem;

    color:#38bdf8;

    text-shadow:
    0 0 10px #38bdf8,
    0 0 20px #38bdf8;
}

header p{

    margin-top:10px;

    color:#ddd;
}

/* =========================
   SEARCH BOX
========================= */

.search-box{

    display:flex;
    gap:15px;

    margin-bottom:35px;
}

.search-box input{

    flex:1;

    padding:16px;

    border:none;
    outline:none;

    border-radius:18px;

    background:rgba(255,255,255,0.12);

    color:white;

    font-size:16px;
}

.search-box input::placeholder{

    color:#ddd;
}

.search-box button{

    padding:16px 25px;

    border:none;

    border-radius:18px;

    cursor:pointer;

    background:
    linear-gradient(45deg,#ff512f,#f09819);

    color:white;

    font-weight:600;

    transition:0.3s;
}

.search-box button:hover{

    transform:translateY(-3px);

    box-shadow:
    0 0 20px rgba(255,120,0,0.6);
}

/* =========================
   WEATHER CARD
========================= */

.weather-card{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(200px,1fr));

    gap:20px;
}

.card{

    background:rgba(255,255,255,0.1);

    border-radius:25px;

    padding:25px;

    text-align:center;

    transition:0.4s;

    border:1px solid rgba(255,255,255,0.12);
}

.card:hover{

    transform:translateY(-8px);

    box-shadow:
    0 0 25px rgba(0,255,255,0.35);
}

.card h2{

    margin-bottom:12px;

    color:#38bdf8;
}

.card p{

    font-size:1.1rem;
}

/* =========================
   MAIN TEMP
========================= */

.main-weather{

    margin-bottom:25px;

    text-align:center;
}

.main-weather h2{

    font-size:2.3rem;

    margin-bottom:10px;
}

.main-weather img{

    width:120px;
}

.temp{

    font-size:4rem;

    font-weight:700;

    color:#ffcc00;

    text-shadow:
    0 0 15px #ffcc00;
}

/* =========================
   ERROR
========================= */

#error{

    text-align:center;

    margin-top:20px;

    color:#ff4d4d;

    font-weight:600;
}

/* =========================
   FOOTER
========================= */

footer{

    text-align:center;

    margin-top:35px;

    color:#ccc;
}

/* =========================
   RESPONSIVE
========================= */

@media(max-width:768px){

    header h1{

        font-size:2rem;
    }

    .temp{

        font-size:3rem;
    }

    .search-box{

        flex-direction:column;
    }

}

</style>
</head>

<body>

<!-- =========================
     WEATHER APP
========================= -->

<main class="weather-app">

<header>

    <h1>Weather Dashboard</h1>

    <p>
        Real-time weather using Async JavaScript & REST API
    </p>

</header>

<!-- SEARCH -->

<section class="search-box">

    <input
    type="text"
    id="cityInput"
    placeholder="Enter city name">

    <button onclick="getWeather()">

        Search Weather

    </button>

</section>

<!-- MAIN WEATHER -->

<section class="main-weather" id="mainWeather">

    <h2>Search Any City</h2>

    <img
    src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
    alt="weather">

    <div class="temp">--°C</div>

</section>

<!-- WEATHER DETAILS -->

<section class="weather-card">

    <article class="card">

        <h2>Humidity</h2>

        <p id="humidity">-- %</p>

    </article>

    <article class="card">

        <h2>Wind Speed</h2>

        <p id="wind">-- km/h</p>

    </article>

    <article class="card">

        <h2>Condition</h2>

        <p id="condition">---</p>

    </article>

</section>

<p id="error"></p>

<footer>

    © 2026 Advanced Weather Dashboard | Bipul Ray

</footer>

</main>

<script>

async function getWeather(){

    const city =
    document.getElementById("cityInput").value;

    const error =
    document.getElementById("error");

    if(city === ""){

        error.innerText =
        "Please enter city name";

        return;
    }

    try{

        error.innerText = "";

        const apiKey =
        "9ba0d336b1028d1ccb8c20b60569c3e9";

        const response =
        await fetch(

        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        );

        const data =
        await response.json();

        /* ERROR CHECK */

        if(data.cod != 200){

            error.innerText =
            data.message;

            return;
        }

        /* UPDATE WEATHER */

        document.getElementById(
        "humidity").innerText =

        data.main.humidity + "%";

        document.getElementById(
        "wind").innerText =

        data.wind.speed + " km/h";

        document.getElementById(
        "condition").innerText =

        data.weather[0].main;

        document.getElementById(
        "mainWeather").innerHTML = `

        <h2>${data.name}</h2>

        <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

        <div class="temp">

        ${Math.round(data.main.temp)}°C

        </div>

        `;

    }

    catch(err){

        error.innerText =
        "Something went wrong";

    }

}

</script>

</body>
</html>