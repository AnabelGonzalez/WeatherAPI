window.addEventListener("load", () => {
  // When loading page get lat and long
  let longitude;
  let latitude;

  // variables
  let noGeo = document.getElementById("no-geo");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let timeZone = document.querySelector(".location-timezone");
  let changeLocation = document.getElementById("change-location");
  let loader = document.querySelector(".loader");
  let apiInitial = document.querySelector(".api-initial");
  let userDefinedLocation = document.getElementById("userDefinedLocation");
  let defineLocation = document.getElementById("defineLocation");
  let errorMessage = document.getElementById("error");

  //Hide the Temperature card

  function hideApiInitial() {
    apiInitial.style.display = "none";
  }

  //Show the Temperature card

  function showApiInitial() {
    apiInitial.style.display = "block";
  }

  //Hide loader

  function hideLoader() {
    loader.style.display = "none";
  }

  noGeo.innerHTML = "<p>Allow Location Access </p>";

  // Call API with coordinates

  function callApi() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        noGeo.innerHTML = " ";

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

            temperatureDegree.textContent = Math.round(temp) + " °C";
            temperatureDescription.textContent = description.toUpperCase();
            timeZone.textContent = name;
            document.getElementById(
              "icon"
            ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          });

        hideLoader();
      });
    }
  }

  callApi();

  //Change Location

  changeLocation.addEventListener("click", function showForm() {
    // Hide Temperature Card

    hideApiInitial();
    errorMessage.innerHTML = " ";
    changeLocation.style.display = "none";
    defineLocation.style.display = "block";
    let enterLocation = document.getElementById("enterLocation");
    enterLocation.value = " ";
    console.log(enterLocation);

    // User defined location api call

    function userDefinedApi() {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${enterLocation.value}&units=metric&appid=7e51bb2f0887eee515af1102eb18fc14`;

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
          const { country } = data.sys;

          temperatureDegree.textContent = Math.round(temp) + " °C";
          temperatureDescription.textContent = description.toUpperCase();
          timeZone.textContent = name + ", " + country;
          document.getElementById(
            "icon"
          ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          showApiInitial();
          defineLocation.style.display = "none";
          changeLocation.style.display = "block";
        }) // Error Handling
        .catch(function(err) {
          errorMessage.innerHTML = "<p>City cannot be found </p>";
          enterLocation.value = " ";
        });
    }

    // Clear Error message when clicking input box

    enterLocation.onclick = clearError;
    function clearError() {
      errorMessage.innerHTML = " ";
    }

    // Call api on form submission

    userDefinedLocation.addEventListener("click", function userDefinedApiCall(
      event
    ) {
      event.preventDefault();
      userDefinedApi();
    });
  });
});
