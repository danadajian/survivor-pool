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
  const { data } = trpc.hello.useQuery();

  return (
    <div>
      <h1 className="text-red-400">Test</h1>
      {data ? <div>{data}</div> : <div>Loading...</div>}
    </div>
  );
};
