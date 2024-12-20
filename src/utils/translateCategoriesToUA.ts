import type { TCategory, TSubcategory } from '@/store/categories-store/types';

export const translateCategoriesToUA = (data: TCategory[]): TCategory[] => {
	const translations: Record<string, string> = {
		'Alco and Tobacco': 'Алкоголь',
		beers: 'пиво',
		champage: 'шампанське',
		cognac: 'коньяк',
		liquor: 'лікер',
		low_alcohol: 'слабоалкогольні',
		other: 'інше',
		vermouth: 'вермут',
		vodka: 'горілка',
		wine: 'вино',
		Beverages: 'Напої',
		drinks: 'напої',
		energo_drinks: 'енергетики',
		juice: 'сік',
		kvas: 'квас',
		mineral_water: 'мінеральна вода',
		Confectionery: 'Кондитерські вироби',
		bisquit: 'бісквіт',
		candy_bars: 'батончики',
		candys: 'цукерки',
		chocolate: 'шоколад',
		coockies: 'печиво',
		crackers: 'крекери',
		croissants: 'круасани',
		dragge: 'драже',
		east_sweets: 'східні солодощі',
		gum: 'жувальна гумка',
		pasta: 'макарони',
		pies: 'пироги',
		waffle: 'вафлі',
		'Frozen Products': 'Заморожені продукти',
		dough: 'тісто',
		dumplings: 'пельмені',
		frozen_foods: 'Овочі',
		frozen_meals: 'Напівфабрикати',
		icecream: 'морозиво',
		'Fruits and vegetables': 'Фрукти та овочі',
		fruits: 'фрукти',
		greens: 'зелень',
		mushrooms: 'гриби',
		nuts: 'горіхи',
		salats: 'салати',
		vegetables: 'овочі',
		'House goods': 'Побутові товари',
		air_freshners: 'освіжувачі повітря',
		cleaners: 'засоби для очищення',
		for_dishes: 'для посуду',
		powder: 'порошок',
		'Meat and Delicacies': "М'ясо та делікатеси",
		delicacy: 'делікатеси',
		kovbasa: 'ковбаса',
		meat: "м'ясо",
		sausages: 'сосиски',
	};

	return data.map((category) => ({
		...category,
		title: translations[category.title] || category.title,
		subcategories: category.subcategories.map((sub: TSubcategory) => ({
			...sub,
			title: translations[sub.title] || sub.title, // Translate subcategory title
		})),
	}));
};
