export default (expenses) => {
    return expenses.reduce((prevVal, currExpense) => prevVal + currExpense.amount, 0);
}
