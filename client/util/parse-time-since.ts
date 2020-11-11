const presets = [
  { name: 'minute', threshold: 60 },
  { name: 'hour', threshold: 24 },
  { name: 'day', threshold: 30 },
  { name: 'month', threshold: 12 },
  { name: 'year', threshold: 10000 },
];

const parse = (t, controller = 0) => {
  if (!t) return 'Just now';

  const { name, threshold } = presets[controller];

  if (t < threshold)
    return `${Math.floor(t)} ${name}${Math.floor(t) == 1 ? '' : 's'} ago`;
  return parse(t / threshold, controller + 1);
};

export const parseTimeSince = (parseSince: string | Date) =>
  parse(
    Math.floor((Date.now() - new Date(parseSince).getTime()) / (1000 * 60))
  );
