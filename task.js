getData();
async function getData() {
  // Make an AJAX request to the API
  const response = await fetch("https://substantive.pythonanywhere.com/");
  const data = await response.json();

  length = data.interactions.length;

  // Calculate label, place the sector name in the list according to the order of sector id
  labels = [];

  for (i = 0; i < length; i++) {
    if (!labels.includes(data.interactions[i].name)) {
      labels[data.interactions[i].sector_id - 1] = data.interactions[i].name;
    }
  }
  console.log(labels);

  // Calculate the number of the sector
  sector = [];
  function addToSet(set, element) {
    if (!set.includes(element)) {
      set.push(element);
    }
    return addToSet;
  }

  for (i = 0; i < length; i++) {
    addToSet(sector, data.interactions[i].sector_id);
  }

  // Calculate the frequency of each sector
  values = {};

  for (i = 0; i < length; i++) {
    if (values[data.interactions[i].sector_id]) {
      values[data.interactions[i].sector_id]++;
    } else {
      values[data.interactions[i].sector_id] = 1;
    }
  }

  //   put all the value in a list
  values = Object.values(values);

  // Calculate percentages of each sector
  total = length;

  percentages = values.map((num) => ((num / total) * 100).toFixed(2));
  console.log(percentages);

  // Create a pie chart
  var ctx = document.getElementById("percentageChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: percentages,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: { display: false },

      responsive: true,
    },
  });
}
