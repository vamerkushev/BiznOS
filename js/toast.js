import { $ } from './utils.js';

let timer;

export function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 1800);
}