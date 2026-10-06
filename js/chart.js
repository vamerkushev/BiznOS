import { $ } from './utils.js';

const X_POINTS = [0, 140, 280, 420, 560, 700];
const HISTORY_BASE = [3_492_000, 3_783_000, 4_074_000, 4_462_000, 4_268_000];

const VIEWBOX_HEIGHT = 250;
const TOP_PAD = 25;
const BOTTOM_PAD = 25;

const SVG_NS = 'http://www.w3.org/2000/svg';

export function renderChart(revenue) {
    const value = Number(revenue);
    if (!Number.isFinite(value) || value <= 0) return;

    const values = [...HISTORY_BASE, value];

    let min = Math.min(...values);
    let max = Math.max(...values);

    if (max === min) {
        max = min + 1;
    }

    const padding = (max - min) * 0.1;
    min -= padding;
    max += padding;

    const range = max - min;
    const usable = VIEWBOX_HEIGHT - TOP_PAD - BOTTOM_PAD;

    const points = values.map((v, i) => {
        const x = X_POINTS[i];
        const y = TOP_PAD + (1 - (v - min) / range) * usable;
        return { x, y };
    });

    const polyline = points
        .map(p => `${p.x},${p.y.toFixed(2)}`)
        .join(' ');

    let area = `M${points[0].x} ${points[0].y.toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
        area += ` L${points[i].x} ${points[i].y.toFixed(2)}`;
    }
    area += ` L${X_POINTS[X_POINTS.length - 1]} ${VIEWBOX_HEIGHT} L0 ${VIEWBOX_HEIGHT} Z`;

    const lineEl = $('linePath');
    const areaEl = $('areaPath');
    const circlesEl = $('chartCircles');

    if (!lineEl || !areaEl || !circlesEl) return;

    lineEl.setAttribute('points', polyline);
    areaEl.setAttribute('d', area);

    while (circlesEl.firstChild) {
        circlesEl.removeChild(circlesEl.firstChild);
    }

    points.forEach(p => {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('cx', p.x);
        circle.setAttribute('cy', p.y.toFixed(2));
        circle.setAttribute('r', '5');
        circlesEl.appendChild(circle);
    });
}