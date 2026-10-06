export function calculateMetrics(input) {
    const {
        revenue, expenses, investments,
        clients, employees, orders, marketing
    } = input;

    const profit = revenue - expenses;

    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = investments > 0 ? (profit / investments) * 100 : 0;
    const averageCheck = orders > 0 ? revenue / orders : 0;
    const cac = clients > 0 ? marketing / clients : 0;
    const profitClient = clients > 0 ? profit / clients : 0;
    
    const breakEven = margin > 0
        ? revenue * (1 - profit / revenue)
        : expenses;

    const safety = revenue - breakEven;
    const revenueEmployee = employees > 0 ? revenue / employees : 0;
    const expenseClient = clients > 0 ? expenses / clients : 0;

    return {
        profit,
        margin,
        roi,
        averageCheck,
        cac,
        profitClient,
        breakEven,
        safety,
        revenueEmployee,
        expenseClient
    };
}

export function calculateHealth(metrics) {
    const { margin, roi, revenue, safety, cac, averageCheck } = metrics;

    let health = 50;

    if (margin >= 30) health += 20;
    else if (margin >= 20) health += 14;
    else if (margin >= 10) health += 7;
    else health -= 5;

    if (roi >= 30) health += 15;
    else if (roi >= 15) health += 8;

    if (revenue > 0 && safety / revenue >= 0.4) health += 10;

    if (cac > 0 && averageCheck > 0) {
        const ratio = cac / averageCheck;
        if (ratio < 0.15) health += 5;
        else if (ratio > 0.35) health -= 8;
    }

    return Math.max(0, Math.min(100, Math.round(health)));
}