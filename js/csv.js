import { $ } from './utils.js';
import { setField } from './state.js';
import { showToast } from './toast.js';

const ALLOWED_KEYS = [
    'revenue',
    'expenses',
    'clients',
    'employees',
    'orders',
    'marketing',
    'investments'
];

export function initCsvImport(onImported) {
    $('fileInput').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const lines = e.target.result
                .trim()
                .split(/\r?\n/)
                .filter(Boolean);

            if (lines.length < 2) {
                showToast('Файл не содержит данных');
                return;
            }

            const headers = lines[0].split(',').map(x => x.trim().toLowerCase());
            const values = lines[1].split(',').map(x => Number(x.trim().replace(/\s/g, '')));

            headers.forEach((header, index) => {
                if (ALLOWED_KEYS.includes(header)) {
                    setField(header, values[index]);
                }
            });

            onImported();
            showToast('Данные из таблицы загружены');
        };

        reader.readAsText(file, 'UTF-8');
    });
}