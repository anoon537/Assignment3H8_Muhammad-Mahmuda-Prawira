const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c2b99679fdmsh581358b433104d2p1ad6f3jsn5716dd0e8659",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  },
};

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("country-select");
  const country = searchInput.value;
  fetch(
    `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const countryData = response.response[0];
      document.getElementById("country-name").textContent = country;
      document.getElementById("new-cases").textContent = countryData.cases.new;
      document.getElementById("critical-cases").textContent =
        countryData.cases.critical;
      document.getElementById("active-cases").textContent =
        countryData.cases.active;
      document.getElementById("recovered-cases").textContent =
        countryData.cases.recovered;
      document.getElementById("new-death").textContent = countryData.deaths.new;
      document.getElementById("total-death").textContent =
        countryData.deaths.total;
      document.getElementById("total-test").textContent =
        countryData.tests.total;
      document.getElementById("total-cases").textContent =
        countryData.cases.total;

      const currentDate = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      document.getElementById("current-date").textContent =
        currentDate.toLocaleDateString("id", options);
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to fetch data for country: " + country);
    });
});

const countrySelect = document.getElementById("country-select");
fetch("https://covid-193.p.rapidapi.com/countries", options)
  .then((response) => response.json())
  .then((response) => {
    response.response.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  })
  .catch((err) => {
    console.error(err);
    alert("Failed to fetch data for countries");
  });
