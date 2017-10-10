const rp = require('request-promise-native');
const {createRestObject} = require('./rest-object');

module.exports.get = async function get(resourceName, id, options) {
    const url = `${options.url}/${resourceName}/${id}`;

    if (options.logger) {
        options.logger(`GET ${url}`);
    }

    const data = await rp.get(url, {
        json: true,
    });
    return createRestObject(data, resourceName, options);
}

module.exports.post = async function post(resourceName, data, options) {
    const url = `${options.url}/${resourceName}`;

    if (options.logger) {
        options.logger(`POST ${url}\n${JSON.stringify(data)}`);
    }

    const responseData = await rp.post(url, {
        body: data,
        json: true,
    });
    return createRestObject(responseData, resourceName, options);
}

module.exports.patch = async function patch(resourceName, data, options) {
    const url = `${options.url}/${resourceName}/${data.id}`;

    if (options.logger) {
        options.logger(`PATCH ${url}\n${JSON.stringify(data)}`);
    }

    const responseData = await rp.patch(url, {
        body: data,
        json: true,
    });
    return createRestObject(responseData, resourceName, options);
}

module.exports.put = async function put(resourceName, data, options) {
    const url = `${options.url}/${resourceName}/${data.id}`;

    if (options.logger) {
        options.logger(`PUT ${url}\n${JSON.stringify(data)}`);
    }

    const responseData = await rp.put(url, {
        body: data,
        json: true,
    });
    return createRestObject(responseData, resourceName, options);
}

module.exports.remove = async function remove(resourceName, id, options) {
    const url = `${options.url}/${resourceName}/${id}`;

    if (options.logger) {
        options.logger(`DELETE ${url}`);
    }

    const data = await rp.delete(url, {
        json: true,
    });
    return createRestObject(data, resourceName, options);
}
