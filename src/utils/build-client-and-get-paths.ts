import path from "path";

import { environmentVariables } from "../env";

export async function buildClientAndGetPaths() {
  const { outputs } = await Bun.build({
    entrypoints: ["./src/client.tsx"],
    outdir: "./public",
    minify: true,
    naming: "[dir]/[name]-[hash].[ext]",
    define: {
      "process.env.CLERK_PUBLISHABLE_KEY": JSON.stringify(
        environmentVariables.CLERK_PUBLISHABLE_KEY,
      ),
    },
  });
  const absolutePathToBundleFile = outputs[0]?.path;
  if (!absolutePathToBundleFile)
    throw new Error("Path to bundle file is missing.");
  const relativePathToBundleFile = `/${path.relative(process.cwd(), absolutePathToBundleFile).replace(/\\/g, "/")}`;
  const bundleHashMatch = relativePathToBundleFile.match(
    /-(?<hash>[^./]+)\.[^.]+$/,
  );
  const bundleHash = bundleHashMatch?.groups?.hash ?? bundleHashMatch?.[1];
  const relativePathToGlobalsCss = bundleHash
    ? `/public/globals-${bundleHash}.css`
    : "/public/globals.css";

  return { relativePathToBundleFile, relativePathToGlobalsCss };
}
