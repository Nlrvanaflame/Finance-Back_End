module.exports = {
  development: {
    username: "postgres",
    password: "sword666",
    database: "finannce",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "sword666",
    database: "test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  },
  production: {
    username: "postgres",
    password: "sword666",
    database: "finannce",
    host: "localhost",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
