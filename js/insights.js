import { formatMoney, formatPercent } from './utils.js';

export function buildInsights(metrics) {
    const { margin, cac, averageCheck, safety, revenue } = metrics;
    const insights = [];

    if (margin >= 25) {
        insights.push({
            title: '🟢 Хорошая маржа',
            text: `Маржинальность бизнеса составляет ${formatPercent(margin)}. Это создаёт хороший запас для дальнейшего роста.`
        });
    } else if (margin >= 10) {
        insights.push({
            title: '🟡 Средняя маржа',
            text: `Маржинальность ${formatPercent(margin)}. Стоит проверить структуру расходов и наиболее затратные статьи.`
        });
    } else {
        insights.push({
            title: '🔴 Низкая маржа',
            text: `Маржинальность всего ${formatPercent(margin)}. Основной приоритет — поиск причин высокой себестоимости.`
        });
    }

    if (cac > 0 && averageCheck > 0) {
        const ratio = cac / averageCheck;

        if (ratio > 0.3) {
            insights.push({
                title: '🔴 Высокий CAC',
                text: `Привлечение клиента обходится в ${formatMoney(cac)}, что составляет значительную долю среднего чека.`
            });
        } else {
            insights.push({
                title: '🟢 Эффективное привлечение',
                text: `CAC составляет ${formatMoney(cac)} при среднем чеке ${formatMoney(averageCheck)}.`
            });
        }
    }

    if (safety / Math.max(revenue, 1) > 0.4) {
        insights.push({
            title: '💡 Хороший запас прочности',
            text: `Выручка превышает точку безубыточности на ${formatMoney(safety)}.`
        });
    } else {
        insights.push({
            title: '⚠️ Небольшой запас прочности',
            text: 'Рекомендуется увеличить маржу или снизить постоянные расходы.'
        });
    }

    return insights;
}

export function buildIntro(health) {
    if (health >= 80) {
        return 'Бизнес выглядит финансово устойчивым. Основная задача сейчас — масштабировать прибыль без пропорционального увеличения расходов.';
    }
    if (health >= 60) {
        return 'Бизнес находится в стабильной зоне, но есть несколько показателей, которые стоит улучшить для повышения эффективности.';
    }
    return 'Есть несколько зон риска. Рекомендуется сначала стабилизировать расходы и маржинальность, а затем переходить к масштабированию.';
}

export function buildRecommendation(metrics) {
    const { margin, cac, averageCheck } = metrics;

    if (margin < 15) {
        return 'Первый приоритет — увеличить маржинальность. Проверьте себестоимость, постоянные расходы и наиболее дорогие статьи.';
    }
    if (cac > averageCheck * 0.3) {
        return 'Основная точка роста — стоимость привлечения клиентов. Снижение CAC даже на 10–15% может заметно увеличить прибыль.';
    }
    return 'Бизнес имеет хороший запас прочности. Следующая цель — увеличить прибыль без пропорционального роста расходов.';
}