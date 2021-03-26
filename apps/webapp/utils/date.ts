export const getDateInEightBaseFormat = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return `${yyyy}-${(mm > 9 ? '' : '0') + mm}-${(dd > 9 ? '' : '0') + dd}`;
};

export const daysUntilDate = (date: Date): number =>
	Math.ceil((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));

export const lastNDays = (n: number): Date[] => {
	return [...Array(n).keys()]
		.map((i) => {
			const date = new Date();
			date.setDate(date.getDate() - i);
			return date;
		})
		.reverse();
};

export const isSameDay = (dateA: Date, dateB: Date): boolean => {
	return (
		dateA.getDate() === dateB.getDate() &&
		dateA.getMonth() === dateB.getMonth() &&
		dateA.getFullYear() === dateB.getFullYear()
	);
};
