function extractTimes() {
  const timeElements = document.querySelectorAll('.MuiTypography-body1');
  if (timeElements.length < 1) return null;  // Agora precisamos de pelo menos 1 horário

  const times = Array.from(timeElements).slice(0, 1).map(el => parseTime(el.innerText));
  return times;
}

function parseTime(timeStr) {
  const timeParts = timeStr.match(/(\d{2})h (\d{2})m (\d{2})s/);
  if (!timeParts) return null;

  const hours = parseInt(timeParts[1], 10);
  const minutes = parseInt(timeParts[2], 10);
  const seconds = parseInt(timeParts[3], 10);

  // Use the current date for the date part and set the time part
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);

  return date;
}

function calculateTimeDifference(times) {
  if (times.length < 1) return null;

  const currentTime = new Date();  // Hora atual
  const startTime = times[0];      // Primeiro horário extraído

  const diffTime = Math.abs(currentTime - startTime);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  const newDate = new Date();
  newDate.setHours(startTime.getHours() + 9)
  newDate.setMinutes(startTime.getMinutes() + 48);
  const diffLeavingHours = newDate.getHours();
  const diffLeavingMinutes = newDate.getMinutes();

  return { hours: diffHours, minutes: diffMinutes, leavingHours: diffLeavingHours, leavingMinutes: diffLeavingMinutes }

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'calculateTimeDifference') {
    const times = extractTimes();
    const difference = calculateTimeDifference(times);
    sendResponse(difference);
  }
});
