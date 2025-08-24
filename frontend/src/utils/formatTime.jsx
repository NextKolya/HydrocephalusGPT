const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
});

export function formatTime(date) {
    return timeFormatter.format(date);
}
export function calcTimeAgo(date, time) {
    const timeAgo = date - time;

    return timeFormatter.format(timeAgo);
}
