const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',

    minute: '2-digit',
});

export function formatTime(date) {
    if (!(date instanceof Date)) {
        console.error('date in formatTime is not Date prototype: ', date);
        return null;
    }
    return timeFormatter.format(date);
}

export function calcTimeAgo(currentDate, time) {
    if (!(currentDate instanceof Date)) {
        currentDate = new Date(currentDate);
    }
    if (!(time instanceof Date)) {
        time = new Date(time);
    }

    const diffMs = currentDate.getTime() - time.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (!diffSec || diffSec < 60) return 'now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;

    return `${Math.floor(diffSec / 86400)}d ago`;
}
