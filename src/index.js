const RestMaker = require('./rest-maker');

const defaultOptions = {
    // The functions used to split the call name. Will return an array of names, all in lower case
    split: (name) => {
        let splited = [];

        const firstRegexp = /[a-z]+/;
        const restRegexp = /[A-Z][a-z]+/g

        const firstMatch = name.match(firstRegexp);
        if (!firstMatch) {
            throw new Error(`Can't match key ${name}`);
        }
        const first = firstMatch[0];

        splited.push(first);

        const restOfString = name.slice(first.length);

        let match;
        do {
            match = restRegexp.exec(restOfString);
            if (match) {
                splited.push(match[0].toLowerCase());
            }
        } while (match);

        return splited;
    },
    buildResourceName: (names) => {
        // Join names with "-" and add a "s" to the last one
        return [...names.slice(0, -1), names.slice(-1)[0] + 's'].join('-');
    },
    logger: undefined,
    //logger: text => {console.log(text)},
};

function RESTorer(userOptions) {
    const options = {...defaultOptions, ...userOptions};

    const handler = {
        get(target, key) {
            const splitedKey = options.split(key);
            const firstKeyPart = splitedKey[0];

            if (firstKeyPart === "get") {
                return target.get(splitedKey.slice(1));
            }

            if (firstKeyPart === "create") {
                return target.post(splitedKey.slice(1));
            }

            if (firstKeyPart === "update") {
                return target.patch(splitedKey.slice(1));
            }

            if (firstKeyPart === "delete") {
                return target.delete(splitedKey.slice(1));
            }
        }
    };

    var target = new RestMaker(options);

    return new Proxy(target, handler);
}

module.exports.create = RESTorer;
