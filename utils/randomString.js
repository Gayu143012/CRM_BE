import randomstring from 'randomstring';

//  Define generateRandomString function
export const generateRandomString = () => {
    let result = randomstring.generate();
    return result;
};
