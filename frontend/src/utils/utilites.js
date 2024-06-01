const replaceChar = '#';
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getCode = (string) => {
    return string.toLowerCase().replaceAll(' ', replaceChar);
}

export const getName = (string) => {
    return capitalizeFirstLetter(string).replaceAll(replaceChar, ' ');
}