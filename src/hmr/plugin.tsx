import Elysia from "elysia";
import React from "react";

const reloadMessage = "reload";

const buildHotReloadScript = (app: Elysia, webSocketPath: string) => `
function hotReload() {
  const socket = new WebSocket("ws://${app.server?.hostname}:${app.server?.port}/${webSocketPath}");
  socket.onmessage = (message) => {
    if (message.data === "${reloadMessage}") {
      location.reload()
    }
  };
  console.log('Hot reload enabled.');
}
hotReload();
`;

export const HmrScript = ({
  app,
  webSocketPath = "ws",
}: {
  app: Elysia;
  webSocketPath?: string;
}) => (
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: buildHotReloadScript(app, webSocketPath),
    }}
  />
);

declare global {
  // eslint-disable-next-line no-var
  var ws: typeof Elysia.arguments;
}

export const hmrPlugin = ({ webSocketPath = "ws" } = {}) => {
  const app = new Elysia({
    name: "elysia-hmr",
  });
  global.ws?.send(reloadMessage);
  app.ws(`/${webSocketPath}`, {
    open: (ws) => {
      global.ws = ws;
    },
  });
  return app;
};
