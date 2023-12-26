type DurationProps = {
  seconds: number;
};
function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string: number) {
  return ("0" + string).slice(-2);
}

export default function Duration({ seconds }: DurationProps) {
  return <time dateTime={`P${Math.round(seconds)}S`}>{format(seconds)}</time>;
}
