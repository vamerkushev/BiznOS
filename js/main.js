import { $ } from './utils.js';
import {
    readInputs,
    applyDefaults,
    FIELD_IDS
} from './state.js';
import {
    calculateMetrics,
    calculateHealth
} from './calculator.js';
import {
    buildInsights,
    buildIntro,
    buildRecommendation
} from './insights.js';
import { renderDashboard } from './render.js';
import { initCsvImport } from './csv.js';
import { showToast } from './toast.js';

function calculate() {
    const input = readInputs();
    const metrics = calculateMetrics(input);
    const health = calculateHealth(metrics);
    const insights = buildInsights(metrics);
    const intro = buildIntro(health);
    const recommendation = buildRecommendation(metrics);

    renderDashboard({
        input,
        metrics,
        health,
        insights,
        intro,
        recommendation
    });

    showToast('Расчёт обновлён');
}

function resetAll() {
    applyDefaults();
    calculate();
    showToast('Данные сброшены');
}

function bindEvents() {
    $('calculateBtn').addEventListener('click', calculate);
    $('calculateTop').addEventListener('click', calculate);
    $('resetBtn').addEventListener('click', resetAll);

    FIELD_IDS.forEach(id => {
        $(id).addEventListener('input', calculate);
    });

    initCsvImport(calculate);
}

bindEvents();
calculate();