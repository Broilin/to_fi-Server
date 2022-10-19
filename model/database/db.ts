import { Pool } from "pg";

const pool = new Pool({
  host: "ls-16818a7acd43707733f2c2ee11d1ba32baaadba1.cisbzdqir9fu.ap-northeast-2.rds.amazonaws.com",
  user: "dbmasteruser",
  password: "indlseba49343!",
  port: 5432,
  database: "dbmaster",
});

export default pool;
