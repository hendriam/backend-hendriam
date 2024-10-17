const users = require('../../data_user');
const { generateToken } = require('../../utilities/jwt');
const ResponseError = require('../../utilities/response-error');

const getToken = (authData) => {
    const isFound = findUser(authData);
    if (isFound.length === 0) {
        throw new ResponseError('User not found', 404);
    }

    const token = generateToken({
        id: isFound[0].id,
        name: isFound[0].name,
        level: isFound[0].level,
    });

    return token;
};

const findUser = (authData) => {
    const data = users.users;
    const filteredData = data.reduce((accumulator, item) => {
        if (item.username === authData.username && item.password === authData.password) {
            accumulator.push(item);
        }
        return accumulator;
    }, []);
    return filteredData;
};

module.exports = { getToken };
