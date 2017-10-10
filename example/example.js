const restorer = require('../src');

(async function() {
    const rest = restorer.create({
        url: 'https://jsonplaceholder.typicode.com'
    });

    const user = await rest.getUser(1);
    console.log(user);

    user.name = "Johan Lindell";
    await user.save();
})();
