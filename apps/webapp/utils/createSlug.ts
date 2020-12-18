import slugify from 'slugify';

export const createSlug = (text: string) => {
	return slugify(text, { lower: true });
};
