await Bun.build({
  entrypoints: ["./src/frontend/main.tsx"],
  outdir: "./public",
  minify: true,
});

const mainJsFile = Bun.file("./public/main.js");
let mainJsText = await mainJsFile.text();
const environmentVariables = mainJsText
  .match(/(Bun|process)\.env\.(.*?)?(?=\W)/g)
  ?.map((match) => match.trim());
environmentVariables?.forEach((envString) => {
  const envVarName = envString.split(".")[2] ?? "";
  const bunEnv = process.env[envVarName];
  if (!bunEnv) {
    throw new Error(`Missing environment variable ${envVarName}`);
  }
  mainJsText = mainJsText.replace(envString, `"${bunEnv}"`);
});

await Bun.write(mainJsFile, mainJsText);
