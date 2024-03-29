import moment from 'moment';
import { months, quarters, currencies } from 'nwiadmin/utility/constants';
import config from 'app/config';

export const formatBoolean = input => (input ? 'Yes' : '-');

export const formatNumber = input => parseInt(input || 0, 10).toLocaleString();

export const formatPoints = input => (parseFloat(input || 0, 10) / (config.money ? config.money.factor : 100)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
});

export const formatMoney = (input) => {
    if(typeof input !== 'object' || input === null) {
        return null;
    }

    return `${currencies[input.currency]}${formatPoints(input.amount)}`;
}

export const formatMoneyLegacy = input => `£${formatPoints(input)}`;

export const formatDate = (input) => {
    if (!input) {
        return '';
    }
    return moment(input, input.match(/:/) ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD').format('DD/MM/YYYY');
};

export const unformatDate = (input) => {
    if (!input) {
        return '';
    }
    return moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

export const formatDatetime = input => (
    moment(input, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [@] HH:mm')
);

export const formatMonth = input => months[parseInt(input, 10) - 1];

export const formatQuarter = input => quarters[parseInt(input, 10) - 1];

const formatMap = {
    boolean: input => formatBoolean(input),
    currency: input => formatMoneyLegacy(input),
    date: input => formatDate(input),
    datetime: input => formatDatetime(input),
    month: input => formatMonth(input),
    quarter: input => formatQuarter(input),
};

export const format = (input, type) => (formatMap[type] ? formatMap[type](input) : input);
