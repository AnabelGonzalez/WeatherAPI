window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let timeZone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7e51bb2f0887eee515af1102eb18fc14`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temp } = data.main;
          const { description } = data.weather[0];
          const { name } = data;
          let { icon } = data.weather[0];

          temperatureDegree.textContent = Math.round(temp);
          temperatureDescription.textContent = description.toUpperCase();
          timeZone.textContent = name;
          document.getElementById(
            "icon"
          ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
  }
});
