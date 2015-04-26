var r = require(
    '../node_modules/loopback-connector-rethinkdb/node_modules/rethinkdb');

var dataSources = require('../server/dataSources');
var db = dataSources.rethinkdb;

var sampleData = require('./sampledata.json');

r.connect({
    host: db.host,
    port: db.port
}, function(err, conn) {
    if (err) throw err;

    r.db('test').tableCreate('customer').run(conn, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });

    r.table('customer').insert(sampleData).run(conn, function(err,
        result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });

    conn.close(function(err) {
        if (err) throw err;
    });
});
