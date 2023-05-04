import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const btnStartTimer = document.querySelector('button[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// function activeBtn() {
//   if (selectedDate && selectedDate.getTime() > Date.now()) { 
//     btnStartTimer.disabled = false;
//   } else {
//     btnStartTimer.disabled = true;
//   }
// }

function updateTimer(ms) {
  const time = convertMs(ms);
  daysElem.textContent = time.days.toString().padStart(2, '0');
  hoursElem.textContent = time.hours.toString().padStart(2, '0');
  minutesElem.textContent = time.minutes.toString().padStart(2, '0');
  secondsElem.textContent = time.seconds.toString().padStart(2, '0');

  if(time.days < 0 || time.hours < 0 || time.minutes < 0 || time.seconds < 0){
    btnStartTimer.disabled = false;
  }
}

btnStartTimer.addEventListener('click', () => {
  btnStartTimer.disabled = true;
  const selectedDate = dateTimePicker.value;
  const intermediateTime = new Date(selectedDate).getTime() - Date.now();
  updateTimer(intermediateTime)
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const intermediateTime = new Date(selectedDate).getTime() - currentTime;
    updateTimer(intermediateTime)

    if(intermediateTime <= 1000){
      clearInterval(intervalId)
    }
  }, 1000);
});

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: "today",
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      dateTimePicker._input.value = '';
      alert('Ошибка!!! Нельзя выбрать прошлое время');
    }
  },
});