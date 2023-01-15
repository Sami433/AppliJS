async function getBitcoinData() {
  const now = new Date().getTime();
  const lastMonth = new Date().getTime() - (86400000 * 31);

  const urlToFetch = `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${lastMonth}&end=${now}`;

  try {
    const response = await fetch(urlToFetch);
    const { data } = await response.json();

    const btcData = data.map(({ priceUsd }) => priceUsd);
    const btcLabel = data.map(({ date }) => date);

    const chartData = {
      labels: btcLabel,
      datasets: [
        {
          label: 'Prix du Bitcoin',
          backgroundColor: 'rgb(239, 247, 0)',
          borderColor: 'rgb(0,0,0)',
          data: btcData,
        },
      ],
    };

    const chartConfig = {
      type: 'line',
      data: chartData,
      options: {},
    };

    const myChart = new Chart(document.getElementById('chart'), chartConfig);

    const loader = document.querySelector('.loader');
    loader.classList.add('fondu-out');

  } catch (error) {
    console.error(error);
  }
}

getBitcoinData();
