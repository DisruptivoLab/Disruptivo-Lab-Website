export function getTimeAgo(date: string | Date, locale: 'es' | 'en' = 'es'): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  const labels = {
    es: {
      year: 'a',
      month: 'm',
      day: 'd',
      hour: 'h',
      minute: 'min',
      second: 's',
      now: 'ahora'
    },
    en: {
      year: 'y',
      month: 'mo',
      day: 'd',
      hour: 'h',
      minute: 'min',
      second: 's',
      now: 'now'
    }
  };

  const l = labels[locale];

  if (diffYear > 0) return `${diffYear}${l.year}`;
  if (diffMonth > 0) return `${diffMonth}${l.month}`;
  if (diffDay > 0) return `${diffDay}${l.day}`;
  if (diffHour > 0) return `${diffHour}${l.hour}`;
  if (diffMin > 0) return `${diffMin}${l.minute}`;
  if (diffSec > 10) return `${diffSec}${l.second}`;
  return l.now;
}
