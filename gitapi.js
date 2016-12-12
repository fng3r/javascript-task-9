https = require('https');
fs = require('fs');


var TOKEN;
try {
    TOKEN = fs.readFileSync('token.txt', 'utf-8').trim();
} catch (e) {
    TOKEN = '';
}

var API_URL = 'api.github.com';

exports.getRepos = function (org, callback) {
    var options = {
            host: API_URL,
            method: 'GET',
            path: '/orgs/' + org + '/repos',
            headers: {
                'User-Agent': 'node.js',
                Authorization: 'token ' + TOKEN
            }
    };

    https.request(options, requestCallback.bind(null, callback)).end();
};

exports.getRepo = function (repo, callback) {
    var options = {
        hostname: API_URL,
        path: '/repos/urfu-2016/' + repo,
        headers: {
            'user-agent': 'node.js',
            Authorization: 'token ' + TOKEN
        }
    };

    https.request(options, requestCallback.bind(null, callback)).end();
};

exports.getReadme = function (owner, repo, callback) {
    var options = {
        host: API_URL,
        method: 'GET',
        encoding: 'utf8',
        path: '/repos/' + owner + '/' + repo + '/readme',
        headers: {
            'User-Agent': 'node.js',
            'Content-type': 'text/plain',
            Authorization: 'token ' + TOKEN
        }
    };

    https.request(options, requestCallback.bind(null, callback)).end();
};

function requestCallback(callback, res) {
    var data = '';

    res.on('error', callback);

    res.on('data', function (chunk) {
        data += chunk;
    });

    res.on('end', function () {
        callback(null, JSON.parse(data));
    });
}

var mainCallback = function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(new Buffer(data.content, 'base64').toString());
        console.log();
    }
};

// exports.getRepos(mainCallback);
exports.getReadme('urfu-2016', 'markup-task-1', mainCallback);
