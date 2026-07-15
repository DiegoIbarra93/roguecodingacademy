import { site } from '../data/site';

export type SeatRequestPayload = {
  name: string;
  email: string;
  course: string;
  message: string;
};

export function buildSeatMailto(payload: SeatRequestPayload): string {
  const subject = `Seat request — ${payload.course || 'General interest'}`;
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Course interest: ${payload.course || 'General interest'}`,
    '',
    'Message:',
    payload.message || '(none)',
    '',
    '— Sent from roguecoding.academy seat request form',
  ].join('\n');

  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${site.email}?${params.toString()}`;
}
