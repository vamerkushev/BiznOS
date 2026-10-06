export const $ = (id) => document.getElementById(id);

export function num(id) {
    const value = Number($(id).value);
    return Number.isFinite(value) && value >= 0 ? value : 0;
}

export function formatNumber(value) {
    return new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 0
    }).format(value);
}

export function formatMoney(value) {
    if (Math.abs(value) >= 1_000_000) {
        return (value / 1_000_000).toLocaleString('ru-RU', {
            maximumFractionDigits: 2
        }) + ' млн ₽';
    }
    return formatNumber(value) + ' ₽';
}

export function formatPercent(value) {
    return value.toLocaleString('ru-RU', {
        maximumFractionDigits: 1
    }) + '%';
}

export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}