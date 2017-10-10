const requestMaker = require('./request-maker');

module.exports.createRestObject = function createRestObject(data, resourceName, options) {
    const handler = {
        get(target, key) {
            if (key === 'remove') {
                return () => requestMaker.remove(resourceName, data.id, options);
            }
            if (key === 'save') {
                return () => requestMaker.put(resourceName, data, options);
            }

            return target[key];
        }
    };

    return new Proxy(data, handler);
};
