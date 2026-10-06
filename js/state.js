import { $, num } from './utils.js';

export const FIELD_IDS = [
    'clients',
    'employees',
    'revenue',
    'expenses',
    'investments',
    'orders',
    'marketing'
];

export const DEFAULTS = {
    clients: 184,
    employees: 12,
    revenue: 4_850_000,
    expenses: 3_420_000,
    investments: 3_400_000,
    orders: 327,
    marketing: 280_000
};

export function readInputs() {
    return {
        revenue: num('revenue'),
        expenses: num('expenses'),
        investments: num('investments'),
        clients: num('clients'),
        employees: num('employees'),
        orders: num('orders'),
        marketing: num('marketing')
    };
}

export function setField(id, value) {
    if (Number.isFinite(value)) {
        $(id).value = value;
    }
}

export function applyDefaults() {
    for (const [id, value] of Object.entries(DEFAULTS)) {
        $(id).value = value;
    }
}