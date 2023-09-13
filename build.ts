await Bun.build({
  entrypoints: ["./src/frontend/main.tsx"],
  outdir: "./public",
});

const mainJsFile = Bun.file("./public/main.js");
let mainJsText = await mainJsFile.text();
const bunEnvironmentVariables = mainJsText
  .match(/(?<=process.env.).*? /g)
  ?.map((match) => match.trim());
bunEnvironmentVariables?.forEach((env) => {
  const bunEnv = Bun.env[env];
  if (!bunEnv) {
    throw new Error(`Missing environment variable ${env}`);
  }
  mainJsText = mainJsText.replace(`process.env.${env}`, `"${bunEnv}"`);
});

await Bun.write(mainJsFile, mainJsText);
