export class DatabaseConfig {
    type: "mysql" | "postgres" | "sqlite";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};
