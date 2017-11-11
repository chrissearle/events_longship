import React from 'react';
import moment from 'moment';
import 'moment/locale/nb';

moment.locale("nb");

function standardFormat(date) {
    return date.format("DD. MMM YYYY [kl.] HH:mm");
}

export function formatDate(date) {
    return standardFormat(moment(date).local());
}

export function formatDuration(from, to) {
    const fromDate = moment(from);
    const toDate = moment(to);

    const fromFormatted = standardFormat(fromDate.local());
    let toFormatted = standardFormat(toDate.local());
    let sep = <br/>;

    if (fromDate.isSame(toDate, 'day')) {
        sep = ' - ';
        toFormatted = toDate.local().format("HH:mm");
    }

    return (<span>{fromFormatted}{sep}{toFormatted}</span>);
}