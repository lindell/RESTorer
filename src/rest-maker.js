const request = require('./request-maker');

class RestMaker {
    constructor(options) {
        this.options = options;
    }

    get(names) {
        const resourceName = this.options.buildResourceName(names);
        return (id) => request.get(resourceName, id, this.options);
    }

    post(names) {
        const resourceName = this.options.buildResourceName(names);
        return (data) => request.post(resourceName, data);
    }

    patch(names) {
        const resourceName = this.options.buildResourceName(names);
        return (data) => request.patch(resourceName, data);
    }

    remove(names) {
        const resourceName = this.options.buildResourceName(names);
        return (data) => request.remove(resourceName, id);
    }
}

module.exports = RestMaker;
