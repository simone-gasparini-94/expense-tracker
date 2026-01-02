export function updateIds(expenses) {
    for (let i = 0; i < expenses.length; i++) {
        expenses[i].id = i + 1;
    }
}

export function checkIdValidity(expenses, id) {
    if (id < 1 || id > expenses.length) {
        throw new Error("Invalid ID");
    }
}

export function printHeader() {
    console.log("ID\t\tDate\t\tDescription\t\tAmount");
}

export function formatString(string, n) {
    let newString;
    if (string.length > n) {
        newString = string.slice(0, n - 3) + "...";
    } else {
        newString = string.padEnd(n, " ");
    }
    return (newString);
}