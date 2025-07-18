import NotFound from "./not-found.tsx";

export default function Error({ status }: { status: number }) {
  if (status == 404) return <NotFound />;
  return (
    <div>
      Error status: <strong>{status}</strong>
    </div>
  );
}
