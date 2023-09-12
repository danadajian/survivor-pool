import { t } from "elysia";
import { TypeCompiler } from "@sinclair/typebox/compiler";

const processEnv = process.env;
const env = t.Object({
  PORT: t.Optional(t.String()),
  GAMES_API_URL: t.String({ minLength: 1 }),
  POSTGRES_URL: t.String({ minLength: 1 }),
});
const schema = TypeCompiler.Compile(env);
const envIsValid = schema.Check(processEnv);
if (!envIsValid) {
  throw new Error(
    `Environment schema invalid for ${schema.Errors(processEnv).First()?.path}`,
  );
}

export const environmentVariables = processEnv;
