import groceries from "./MOCK_DATA.json" assert {type: "json"};
import instructions from "./instructions.json" assert {type: "json"};
import fns from "./functions.js";

const pretty_print = (data) => {
    console.log(`ID: ${data.id} bought ${data.transaction_name} from ${data.retailer_name} for $${data.transaction_amount} ${data.split_with ? 'with ' + data.split_with : ''}`);
}

const filter_values = (data, filterFunc, filterArg) => {
    return data.filter(d => filterFunc(filterArg, d));
}

const array_union = (A, B) => {
    return [...new Set([...A, ...B])];
}

const array_intersect = (A, B) => {
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

const runInstruction = (ins, data) => {
    if (!Array.isArray(ins)) {
        return ins;
    }

    const [fName, ...args] = ins;

    if (fName.toLowerCase() === "or") {
        return array_union(runInstruction(args[0], data), runInstruction(args[1], data));
    }
    else if (fName.toLowerCase() === "and") {
        return array_intersect(runInstruction(args[0], data), runInstruction(args[1], data));
    }
    else {
        return filter_values(data, fns[fName], ...args);
    }
}

// Each instruction in instructions.js represents a separate filtered search
instructions.filter_instructions.forEach(inst => {
    let result = runInstruction(inst, groceries);
    console.log(`Instruction: ${inst}`);
    result.forEach(r => pretty_print(r));
    console.log("\n");
});
