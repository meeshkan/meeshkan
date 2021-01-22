export const getDateInEightBaseFormat = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return `${yyyy}-${(mm > 9 ? '' : '0') + mm}-${(dd > 9 ? '' : '0') + dd}`;
};
