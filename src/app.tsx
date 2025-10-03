import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/react-router";
import React, {PropsWithChildren} from "react";

export const App = (props: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="og:title"
          content={"Survivor Pool"}
        />
        <meta
          name="og:image"
          content="https://survivor-pool.up.railway.app/public/og.png"
        />
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="/public/globals.css" />
        <title>Survivor Pool</title>
      </head>
      <body>
          <div id="root">{props.children}</div>
          <script type="module" src="/public/client.js"></script>
          <script src="https://cdn.tailwindcss.com" />
      </body>
      {/*<body>*/}
      {/*  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>*/}
        {/*  <ErrorBoundary*/}
        {/*    fallbackRender={({ error }) => <ErrorPage error={error as Error} />}*/}
        {/*  >*/}
        {/*    <ClientProvider>*/}
              {/*<SignedIn>*/}
              {/*  <Routes>*/}
              {/*    <Route path="/" element={<Home />} />*/}
              {/*    <Route path="/rules" element={<Rules />} />*/}
              {/*    <Route path="/pool/:poolId" element={<Pool />} />*/}
              {/*    <Route path="/picks/:poolId" element={<Picks />} />*/}
              {/*    <Route path="/create" element={<Create />} />*/}
              {/*    <Route path="/join/:poolId" element={<Join />} />*/}
              {/*    <Route path="*" element={<NotFound />} />*/}
              {/*  </Routes>*/}
              {/*</SignedIn>*/}
              {/*<SignedOut>*/}
              {/*  <RedirectToSignIn />*/}
              {/*</SignedOut>*/}
            {/*</ClientProvider>*/}
          {/*</ErrorBoundary>*/}
        {/*</ClerkProvider>*/}
      {/*</body>*/}
    </html>
  );
};
