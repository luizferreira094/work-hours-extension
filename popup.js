document.getElementById('calculate-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'calculateTimeDifference' }, (response) => {
      const resultElement = document.getElementById('result');
      const additionalTextElement = document.getElementById('additional-text');
      const leavingHourTextElement = document.getElementById('leaving-hours');

      additionalTextElement.innerText = ''
      leavingHourTextElement.innerText = `Horário de Saída: ${response.leavingHours} horas ${response.leavingMinutes} minutos`;

      if (response && response.hours !== null && response.minutes !== null && response.seconds !== null) {
        resultElement.innerText = `Horas Trabalhadas: ${response.hours} horas ${response.minutes} minutos`;

        // Alterar a cor com base na diferença em horas
        if (response.hours <= 9) {
          resultElement.style.color = 'red';
          additionalTextElement.style.color = 'red';
          additionalTextElement.innerText = 'Keep Working...';
        } else {
          resultElement.style.color = 'green';
          additionalTextElement.style.color = 'green';
          additionalTextElement.innerText = 'Ihuuuuu, partiu!! :) ';
        }
      } else {
        resultElement.innerText = 'Não foi possível calcular a diferença.';
        resultElement.style.color = 'black';
      }
    });
  });
});
