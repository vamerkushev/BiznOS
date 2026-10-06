import {
    $,
    formatMoney,
    formatNumber,
    formatPercent,
    clamp
} from './utils.js';

import { renderChart } from './chart.js';

export function renderDashboard({
    input,
    metrics,
    health,
    insights,
    intro,
    recommendation
}) {
    $('mRevenue').textContent = formatMoney(input.revenue);
    $('mProfit').textContent = formatMoney(metrics.profit);
    $('mMargin').textContent = formatPercent(metrics.margin);
    $('mROI').textContent = formatPercent(metrics.roi);
    $('mCheck').textContent = formatMoney(metrics.averageCheck);
    $('mCAC').textContent = formatMoney(metrics.cac);
    $('mProfitClient').textContent = formatMoney(metrics.profitClient);
    $('mBreakEven').textContent = formatMoney(metrics.breakEven);

    $('chartCurrent').textContent = formatMoney(input.revenue);

    $('tClients').textContent = formatNumber(input.clients);
    $('tOrders').textContent = formatNumber(input.orders);
    $('tEmployees').textContent = formatNumber(input.employees);
    $('tRevenueEmployee').textContent = formatMoney(metrics.revenueEmployee);
    $('tExpenseClient').textContent = formatMoney(metrics.expenseClient);

    $('safetyValue').textContent =
        (metrics.safety >= 0 ? '+' : '') + formatMoney(metrics.safety);

    $('currentRevenueProgress').textContent = formatMoney(input.revenue);

    const progress = input.revenue > 0
        ? clamp((metrics.breakEven / input.revenue) * 100, 0, 100)
        : 0;

    $('progressFill').style.width = progress + '%';

    $('healthValue').textContent = health + '/100';

    const healthFill = $('healthFill');
    healthFill.style.width = health + '%';

    if (health >= 75) healthFill.style.background = 'var(--green)';
    else if (health >= 50) healthFill.style.background = 'var(--yellow)';
    else healthFill.style.background = 'var(--red)';

    $('insights').innerHTML = insights.map(item => `
        <div class="insight">
            <div class="insight-title">${item.title}</div>
            <div class="insight-text">${item.text}</div>
        </div>
    `).join('');

    $('aiIntro').textContent = intro;
    $('recommendationText').textContent = recommendation;

    renderChart(input.revenue);
}