import moment from 'moment';
import 'moment/locale/nb';

moment.locale("nb");

export function formatDate(date) {
    return moment(date).local().format("D[.] MMMM YYYY [- kl.] HH:mm");
}