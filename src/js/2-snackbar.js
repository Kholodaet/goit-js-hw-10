import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const delayInput = form.querySelector("input[name='delay']");
    const delay = parseInt(delayInput.value);

    const stateInput = form.querySelector("input[name='state']:checked");
    const state = stateInput ? stateInput.value : null;

    if (!delay || isNaN(delay)) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid delay in milliseconds.',
      });
      return;
    }

    if (!state) {
      iziToast.error({
        title: 'Error',
        message: 'Please select a state.',
      });
      return;
    }

    try {
      await new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
          setTimeout(() => resolve(delay), delay);
        } else {
          setTimeout(() => reject(delay), delay);
        }
      });

      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    }
  });
});
