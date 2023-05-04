import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formLink = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formLink.addEventListener('submit', evt => {
  evt.preventDefault();
  const inputedAmount = Number(evt.currentTarget.elements.amount.value);
  let firstDelay = Number(evt.currentTarget.elements.delay.value);
  const stepDelay = Number(evt.currentTarget.elements.step.value);

  for (let i = 1; i <= inputedAmount; i++) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += stepDelay;
  }
  formLink.reset();
});