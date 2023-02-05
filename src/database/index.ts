import { createConnection } from "typeorm";

(async () =>
  await createConnection({
    type: "postgres",
    host: "finapi_database",
    port: 5432,
    database: "fin_api",
    username: "kenji153",
    password: "123456789",
  }))();
