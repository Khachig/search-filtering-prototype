const fns = {
    amount_ge: (value, data) => {
        return data.transaction_amount >= value;
    },
    amount_le: (value, data) => {
        return data.transaction_amount <= value;
    },
    amount_eq: (value, data) => {
        return data.transaction_amount === value;
    },
    name_includes: (value, data) => {
        return data.transaction_name.includes(value);
    },
    name_is: (value, data) => {
        return data.transaction_name === value;
    },
    retailer_name_includes: (value, data) => {
        return data.retailer_name.includes(value);
    },
    retailer_name_is: (value, data) => {
        return data.retailer_name === value;
    },
    after_date: (value, data) => {
        let transaction_date = new Date(data.transaction_date);
        let comp_date = new Date(value);
        return comp_date < transaction_date;
    },
    onafter_date: (value, data) => {
        let transaction_date = new Date(data.transaction_date);
        let comp_date = new Date(value);
        return comp_date <= transaction_date;
    },
    before_date: (value, data) => {
        let transaction_date = new Date(data.transaction_date);
        let comp_date = new Date(value);
        return comp_date > transaction_date;
    },
    onbefore_date: (value, data) => {
        let transaction_date = new Date(data.transaction_date);
        let comp_date = new Date(value);
        return comp_date >= transaction_date;
    },
    split_with_includes: (value, data) => {
        return data.split_with.includes(value);
    },
    split_with_is: (value, data) => {
        return data.split_with === value;
    },
    array_union: (A, B) => {
        return [...new Set([...A, ...B])];
    },
    array_intersect: (A, B) => {
        const setA = new Set(A);
        const setB = new Set(B);

        let intersection = [];

        for (let i of setB) {
            if (setA.has(i)) {
                intersection.push(i);
            }
        }

        return intersection;
    }
}

export default fns;
