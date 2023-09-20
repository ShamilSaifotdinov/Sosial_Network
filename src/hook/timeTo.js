import { Timestamp } from 'firebase/firestore';

export const TStoDate = (timeValue) => new Timestamp(timeValue.seconds, timeValue.nanoseconds).toDate()

export const LocaleDate = (value) => new Date(value).toLocaleString("ru-RU", dateOption)

const dateOption = {
    year: 'numeric', month: 'long', day: 'numeric'
}

export const LocaleTime = (value) => new Date(value).toLocaleTimeString("ru-RU", {
    hour: '2-digit',
    minute: '2-digit',
})