import { trpc } from "./trpc";
import { ClientProvider } from "./client-provider";

export const App = () => {
  return (
    <ClientProvider>
      <Component />
    </ClientProvider>
  );
};

export const Component = () => {
  const { data } = trpc.games.useQuery();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-red-400">Test</h1>
      <div>{data.week.number}</div>
    </div>
  );
};
