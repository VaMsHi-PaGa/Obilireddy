import { useEffect, useState } from 'react';

/** Returns the current Date, updating every 30s (enough for a taskbar clock). */
export function useClock(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
}
