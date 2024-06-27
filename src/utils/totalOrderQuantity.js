export const totalOrderQuantity = (array) => {
    const total = array.reduce((acc, curItem) => {
        // Check if curItem is not null or undefined
        if (curItem && curItem.quantity) {
            return acc + curItem.quantity;
        }
        return acc;
    }, 0);
    return total;
}
