import { Currency } from '../constants/Currency';
const million = 1e6;

const LeosConverter = (value: number | string): string | boolean => {
    if (!value) {
        console.error('value is undefined');
        return false;
    }
    const price = +value;
    return price < million ? `${price} ${Currency.Ls}` : `${price / million} ${Currency.Z}`;
};

export default LeosConverter;
