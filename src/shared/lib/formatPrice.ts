export const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 10,
    }).format(price);
