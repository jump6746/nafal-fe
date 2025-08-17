import useCountdown from "../hooks/useCountdown.tsx";

function CountdownTimer({ endDate }: { endDate: string }) {
  const time = useCountdown(endDate);
  return <span>{time}</span>;
}

export default CountdownTimer;
