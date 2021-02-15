require("dotenv-safe").config();

export default {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USRENAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  migrations: [
    process.env.TYPEORM_TYPE === "management"
      ? "src/management/**/*.ts"
      : "src/migration/**/*.ts",
  ],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir:
      process.env.TYPEORM_TYPE === "management"
        ? "src/management"
        : "src/migration",
    subscribersDir: "src/subscriber",
  },
};
