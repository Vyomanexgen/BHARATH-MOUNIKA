import type { WeddingEvent } from '../config/weddingConfig';

function formatIcsUtc(isoString: string): string {
  const d = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

export function getGoogleCalendarUrl(event: WeddingEvent): string {
  const start = formatIcsUtc(event.calendarStartIso);
  const end = formatIcsUtc(event.calendarEndIso);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Bharath & Mounika — ${event.title}`,
    dates: `${start}/${end}`,
    details: `${event.description}\n\nVenue: ${event.fullAddress}`,
    location: event.fullAddress,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event: WeddingEvent): void {
  const start = formatIcsUtc(event.calendarStartIso);
  const end = formatIcsUtc(event.calendarEndIso);
  const now = formatIcsUtc(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bharath & Mounika Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}-bharath-mounika-2026@wedding`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Bharath & Mounika — ${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.fullAddress}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bharath-mounika-${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

