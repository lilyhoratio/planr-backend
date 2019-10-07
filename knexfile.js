module.exports = {
  // development: {
  //   client: "sqlite3",
  //   useNullAsDefault: true,
  //   connection: {
  //     filename: "./data/corporate-events.db3"
  //   },
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run("PRAGMA foreign_keys = ON", done);
  //     }
  //   },
  //   migrations: {
  //     directory: "./data/migrations"
  //   },
  //   seeds: {
  //     directory: "./data/seeds"
  //   }
  // },

  // Using Postgres results in: "Error: duplicate key value violates unique constraint "users_pkey"" >> remove PK ids from seed files
  development: {
    client: "pg",
    connection: {
      host: "db",
      database: "corporate-events",
      port: 5432,
      user: "postgres",
      password: process.env.POSTGRES_PASSWORD || "docker"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/corporate-events-test.db3"
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
