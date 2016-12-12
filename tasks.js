'use strict';

var api = require('./gitapi.js');
var flow = require('./flow.js');

/**
 * Сделано задание на звездочку
 * Реализовано получение html
 */
exports.isStar = true;

/**
 * Получение списка задач
 * @param {String} category – категория задач (javascript или markup)
 * @param {Function} callback
 */
exports.getList = function (category, callback) {
    api.getRepos('urfu-2016', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            callback(null, data
                .filter(function (item) {
                    return item.name.indexOf(category + '-task') !== -1;
                })
                .map(function (item) {
                    return item.name + ': ' + item.description;
                }));
        }
    });
};

/**
 * Загрузка одной задачи
 * @param {String} task – идентификатор задачи
 * @param {Function} callback
 */
exports.loadOne = function (task, callback) {
    flow.serial([
        function (next) {
            api.getRepo(task, callback())
    })
};

var mainCallback = function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
};

console.log(exports.getList('javascript', console.log));
