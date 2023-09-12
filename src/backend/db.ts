import postgres from "postgres";
import { environmentVariables } from "./env";

export async function callDb() {
  const sql = postgres(environmentVariables.POSTGRES_URL);

  await sql`INSERT INTO picks ${sql([
    { id: 1, name: "Dan", author: "Adajian" },
  ])}`;
  const results = await sql`SELECT * FROM picks`;
  console.log("results", results);
  return results;
}
