const { running_mode } = require('../config.json');
function onRun(res) {
    if (running_mode == "debug") return res.set({ 'Running': 'debug', 'Supervised': 'Vazquez Cesar', 'X-Powered-By': 'Private-Eng.', 'Version': '1.0', 'Showing': 'Real-time' });
}
function firstRun(app, bodyParser, morgan, compression) {
    if (running_mode == "debug") {
        app.use(morgan('dev'), compression());
    } else {
        app.use(morgan('combined'), compression());
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(require('express-status-monitor')());
}
function pool_hand(mysql, v) {
    const pool = mysql.createPool({
        host: v.host_db,
        user: v.user_db,
        database: v.name_db,
        password: v.pass_db,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    return pool;
}

module.exports = { onRun: onRun, firstRun: firstRun, pool_hand: pool_hand }