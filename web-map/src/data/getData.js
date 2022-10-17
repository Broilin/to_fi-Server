const pg = require('knex')({
  client: 'pg',
  connection: {
    host: 'ls-16818a7acd43707733f2c2ee11d1ba32baaadba1.cisbzdqir9fu.ap-northeast-2.rds.amazonaws.com',
    port: 5432,
    user: 'dbmasteruser',
    password: 'indlseba49343!',
    database: 'dbmaster',
  },
});

export default async function readToiletInfo() {
  pg.select('id', 'x', 'y')
    .from('public."toiletInfo"')
    .then(function (rows) {
      console.log(rows[0]);
      console.log(rows[1]);
    });
}
