import type { Kysely } from 'kysely'
import type { DB } from '../kysely-codegen.ts'
import { usernameToEmail } from '../utils.ts'

/**
 * Data from Camellia Sinensis.
 *
 * © 2026 Camellia Sinensis
 *
 * @see https://camellia-sinensis.com
 */
export async function seed(db: Kysely<DB>): Promise<void> {
	const user = await db
		.insertInto('users')
		.values({
			name: 'Camellia Sinensis',
			username: 'camellia-sinensis',
			email: usernameToEmail('camellia-sinensis'),
			email_verified: false,
			role: 'user',
		})
		.returning('id')
		.executeTakeFirstOrThrow()

	const category = await db
		.insertInto('categories')
		.values([
			{
				name: 'Teas',
				slug: 'teas',
				summary: 'Discover the highest quality teas, selected directly from the tea gardens.',
				image:
					'https://camellia-sinensis.com/theme/camellia/resources/assets/images/products/headers/tea.jpg',
				user: user.id,
			},
		])
		.returning(['id'])
		.executeTakeFirstOrThrow()

	const items = await db
		.insertInto('items')
		.values([
			{
				name: 'Assam Breakfast Organic',
				slug: 'assam-breakfast-organic',
				image: 'https://live.staticflickr.com/65535/51420419975_8d593fb4ed_b.jpg',
				description: `From the vast plains of Assam in India, the Banaspaty garden offers us this black tea with uniform and slightly broken leaves.

Its liquor is straightforward and full-bodied with aromas typical of tobacco, malt and fruit (plum).

With or without a cloud of milk! A comforting tea for mornings or to accompany a dessert.`,
				user: user.id,
			},
			{
				name: 'Cerise Rubis',
				slug: 'cerise-rubis',
				image: 'https://live.staticflickr.com/65535/54841816595_ac05123b78_b.jpg',
				description: `Combining plump pieces of fruit and flower petals, this colourful and flavourful herbal tea offers enticing tastes of sweets and fresh strawberries.

The infusion draws out delicious tangy flavours from the apple, hibiscus and cherry.

A fruity gem worth sharing.

**Ingredients**: Apple, rosehip shell, hibiscus flowers, hibiscus, Morello cherry, flavouring (Cherry), red rose petals, flavouring (redfruit), flavouring (cream)`,
				user: user.id,
			},
			{
				name: 'Ceylan New Vithanakande',
				slug: 'ceylan-new-vithanakande',
				image: 'https://live.staticflickr.com/1470/25229588154_8be4f8c154_o.jpg',
				description: `Here is a beautiful black tea from Sri Lanka. In its dry leaf form, the silver luster of its buds offers refined contrast to the oxidized and very uniform leaves.

Its dark liquor is full and glossy, amply developing its full bodied character which is malty and sweet. The nuances dried prunes bring dynamism to this tea with the classic taste of Sri Lanka.

The finish is also typical with minty notes of wintergreen.`,
				user: user.id,
			},
			{
				name: 'Dong Ding Mr. Nen Yu (roasted)',
				slug: 'dong-ding-mr-nen-yu-roasted',
				image: 'https://live.staticflickr.com/65535/52234222770_03876d7ef9_b.jpg',
				summary: 'Frozen Summit',
				description: `The expertise of Mr. Nen Yu is doubly honored here with this tasty cooking of Dong Ding, wulong tea from Taiwan.

The dark khaki leaves exhibit from their infusion intoxicating fragrances of berries (raspberry jam), honey and toast. Its liquor, rich and creamy, reveals a nice balance between its woody and vegetal aspects.

This generous tea also features an exotic finish of pineapple and flowers.`,
				user: user.id,
			},
			{
				name: 'Gunpowder Organic',
				slug: 'gunpowder-organic',
				image: 'https://live.staticflickr.com/65535/54280683932_7c891ae7fa_b.jpg',
				description: `Well-known for its strong taste, Gunpowder green tea has long dominated the Chinese export market.

Omnipresent in Maghreb (most of all in Morocco), it has been used to prepare the famous mint tea for more than two centuries. Our Gunpowder comes from organic culture in Hunan province (China). Its bold green taste bears the expected intensity of the style.

It can be drunk as is for its intense vitality or with fresh mint leaves for a smoother moment.`,
				user: user.id,
			},
			{
				name: 'Gyokuro Shizuoka Organic',
				slug: 'gyokuro-shizuoka-organic',
				image: 'https://live.staticflickr.com/65535/51236517931_f20954ce48_b.jpg',
				summary: 'Jade Dew',
				description: `The Okabe farmers cooperative in Japan offers us this green tea in the gyokuro style produced following the covered method of cultivation, giving it its characteristic taste from shade.

The soft green liquor is sweet, full, and imbued with intense hints of green vegetable (spinach) and berries.

A mellow and textured tea for traditional style enthusiasts.`,
				user: user.id,
			},
			{
				name: 'Hojicha Isagawa Organic',
				slug: 'hojicha-isagawa-organic',
				image: 'https://live.staticflickr.com/65535/51504676214_3fcd4bb344_b.jpg',
				description: `A well balanced Japanese green tea made from a blend of leaves and stems, roasted to its characteristic taste and ochre colour.

Its crystal clear, brick-red liquor is smooth and silky, giving generous and comforting aromas of hardwood, toasted cereals and hazelnuts.

Among the classics of Japan, this everyday tea is often offered after a meal.`,
				user: user.id,
			},
			{
				name: 'Jingning Yin Zhen',
				slug: 'jingning-yin-zhen',
				image: 'https://live.staticflickr.com/7615/27395551950_a7e7198036_o.jpg',
				summary: 'Silver Needles',
				description: `Worthy of the expertise of Mr. He, this superb Chinese white tea is of uniform, smooth and fine buds.

The infusion offers rich flavors of oats, fruit (ripe banana) and flowers, nuanced by a peppery accent on the palate. Its rosy liquor is sweet, oily and full. Well balanced, it evolves to a minty and thirst quenching finish. To be savoured in tranquillity!

This lot is exclusive to our tea house and produced according to our specifications.`,
				user: user.id,
			},
			{
				name: 'Kenya Kangaita',
				slug: 'kenya-kangaita',
				image: 'https://live.staticflickr.com/65535/51286114429_a18f307140_b.jpg',
				description: `This black tea from Kenya was cultivated in the Rift Valley from plants of the Assamica variety (the same grown in the Nilgiris, in Southern India).

It was transformed using the Orthodox Method, which is odd for a region that is accustomed to producing more industrial type teas (CTC).

The vigorous liquor is spicy (pepper), slightly camphorous, fruity and malty. A brown sugar taste concludes the matter beautifully. The aromatics are well balanced and the tannins well structured.

This tea is sure to please fans of black teas that are strong but not too harsh.`,
				user: user.id,
			},
			{
				name: 'Labrador Tea Grade One',
				slug: 'labrador-tea-grade-one',
				image: 'https://live.staticflickr.com/65535/49249615736_e807a0031d_b.jpg',
				description: `Labrador Tea, or Greenland Ledon, is not related to the tea plant, but its therapeutic virtues are sought after, just like those of Camellia Sinensis. This wild harvest comes from areas of the wetlands of Lac St-Jean where the plant basks in warm sun rays.

The presence of stems may seem surprising at first glance, but the stems contain a great concentration of the benefits associated with Labrador Tea. The infusion is delicately tart, herbal and reminiscent of fir and dill.

Its essential oil is considered to be anti-inflammatory, antibacterial and effective in treating various broncho-pulmonary ailments. Labrador Tea is also known for a multitude of other benefits related to the menstrual cycle and insomnia among others.

**Please note**: Due to its high concentration in tannins, extreme high doses may cause stomach pain or cramps. Avoid excessive consumption. Not recommended during early pregnancy or for small children.

**Ingredients**: Buds, stems and small leaves of Labrador tea (Rhododendron groenlandicum)`,
				user: user.id,
			},
			{
				name: 'Long Jing Zhejiang',
				slug: 'long-jing-zhejiang',
				image: 'https://live.staticflickr.com/65535/51255872363_5076cdbd6f_b.jpg',
				summary: 'Dragon Well from Zhejiang',
				description: `A great Chinese classic whole leaf green tea with a bright tint of jade. Our producer Mr. He masters marvelously this "Dragonwell" style.

A clear green liquor, brisk and tasty with elegant floral and grassy notes well structured with an edge of fresh hazelnut.

This lot is exclusive to our tea house and produced according to our specifications.`,
				user: user.id,
			},
			{
				name: 'Maple Tea',
				slug: 'maple-tea',
				image: 'https://live.staticflickr.com/65535/52050679574_0d05a8edb2_b.jpg',
				description: `Creating a maple tea that tastes 100% authentic and natural was a challenge we decided to tackle with enthusiasm! After quite a bit of research, we can say that we have found the perfect pairing of two terroirs: Nilgiri Coonoor from our South India Tea Studio and pure maple sugar from St. Ferdinand in Québec. The result is a sweet malty delight.

Vibrant and balanced, the black tea's classic malty, sweet profile perfectly supports the rich flavours of the delicious natural maple.

Try it with a splash of milk. A pure delight with exquisite balance!`,
				user: user.id,
			},
			{
				name: 'Meng Ding Huang Ya',
				slug: 'meng-ding-huang-ya',
				image: 'https://live.staticflickr.com/957/41134206254_66d6d7542b_o.jpg',
				summary: 'Yellow bud from Meng Ding',
				description: `This famous yellow tea composed almost entirely of buds comes from Sichuan province (China).

Its magnificent young shoots are selected before being covered with the fine hairs typical of that grade of imperial picking! Its light yellow liquor is sweet and tasty. Bold hazelnut aromas are complemented by hints of vanilla and herbs.

The finish is supported by its creamy texture and sweet taste. In the tradition of great teas, it is preferably enjoyed in a gaiwan in a careful ambiance!`,
				user: user.id,
			},
			{
				name: 'Meng Ding Jin Jun Mei',
				slug: 'meng-ding-jin-jun-mei',
				image: 'https://live.staticflickr.com/65535/54500682222_1be98f5046_b.jpg',
				summary: "Meng Ding's Golden Steed Eyebrow",
				description: `Here is a superb Chinese black tea from the province of Sichuan. Largely made up of fine golden buds, its beauty and floral fragrances leave no one indifferent.

The savoury notes of wild rose are accompanied by light tastes of cocoa and aromatic wood in a tea with a rich ochre colour. The roundness of the liqueur perfectly complements the gourmet flavours.

A delight for the palate, nose and eyes alike.`,
				user: user.id,
			},
			{
				name: 'Nepal Autumn Jun Chiyabari Organic',
				slug: 'nepal-autumn-jun-chiyabari-organic',
				image: 'https://live.staticflickr.com/65535/53071402209_d01e481604_b.jpg',
				summary: 'Lot J-319',
				description: `From magnificent Nepalese gardens, only a short distance from Darjeeling, the delicate leaves and golden buds of this black tea from an autumn harvest have been transformed with care and expertise.

The resulting liquor is sweet and light, displaying its rich floral perfumes of honey with subtle fruity (apple) and chocolate accents.

Simply exquisite!`,
				user: user.id,
			},
			{
				name: 'Pu er Shou 2003 Orange Label',
				slug: 'pu-er-shou-2003-orange-label',
				image: 'https://live.staticflickr.com/817/41035668252_563b443233_b.jpg',
				description: `Created with the expertise of the great factories of the late 20th century, this shou Pu er is identified with the tea character "cha" in orange print.

The aromas of leather, stone and damp wood emerge from the rinsing of the leaves. Its brown liquor is crystalline and softly deploys its sweet mineral flavors, evoking the purity of a spring water!

Incense and candied fruit nuances enhance this balanced and refreshing tea.`,
				user: user.id,
			},
			{
				name: 'Shan Lin Xi',
				slug: 'shan-lin-xi',
				image: 'https://live.staticflickr.com/65535/51293831692_25bcdeca9f_b.jpg',
				description: `The mountain of Shan Lin Xi (Taiwan) is steep, imposing and highly exposed to the natural elements. Its wild character seems to be reflected in the wulong tea produced in this region.

Cultivated at high altitude in the garden of Mr Nen Yu, this harvest offers an amazing roundness and complexity. Its aromas of ground cherry and wheat grass evolve towards a presence of fresh vanilla, pineapple and flowers.

Its creamy texture culminates in a slightly sweet coconut finish.`,
				user: user.id,
			},
			{
				name: 'Tea Studio | 2022 Nilgiri Maocha',
				slug: 'tea-studio-2022-nilgiri-maocha',
				image: 'https://live.staticflickr.com/65535/52002569683_6b54d2899a_b.jpg',
				description: `Introducing the very first Indian Maocha, produced in the style of the Chinese Pu er sheng, at the Tea Studio, our tea factory in the Nilgiri mountains. Another experimental project that highlights the great potential of this innovative studio.

The leaves are rolled into long twists, creating a luminous liquor with a smooth texture. The usual vegetal vivacity of a young sheng is slightly softened by the leaf material. Apricot scents and delicate orange flavours combine with floral notes. The lingering effect on the palate is one of awakening and bliss.

Dynamic and passionate, the Camellia Sinensis team is proud to take on a new role in the industry (producer), with the Tea Studio.

The Tea Studio is a factory in the Nilgiris (Tamil Nadu), created in collaboration with a group of Indian partners.

We joined forces with our respective expertise to propel this innovative project managed entirely by a local team of women.

An inspiring project instilled with the same values as our tea houses.`,
				user: user.id,
			},
			{
				name: 'Vietnam Sung Do',
				slug: 'vietnam-sung-do',
				image: 'https://live.staticflickr.com/65535/54135373421_7f81ce22a8_b.jpg',
				description: `A new arrival of black tea from the breathtaking Sung Dô region in northern Vietnam. This remote, mountainous region is home to 250-year-old tea bushes grown with the greatest respect for the environment. Light rolling and fine sorting give the very long leaves a charming twisted shape.

The tea also benefits from the presence of numerous buds, giving it a round, silky texture. This is enhanced by slightly spicy aromas (white pepper). Luscious notes of sponge taffy combine with flavours of tobacco and dried tropical fruit (mango) finishing with a menthol note.

A soothing tea that will delight fans of Chinese black teas.`,
				user: user.id,
			},
			{
				name: 'Wupperthal Rooibos Organic',
				slug: 'wupperthal-rooibos-organic',
				image: 'https://live.staticflickr.com/65535/51375289607_686f642fc5_b.jpg',
				description: `Rooibos is a plant of the legume family that originates exclusively from the Cederberg Mountains in South Africa. Commonly called "red tea", Rooibos has nothing to do with the Camellia Sinensis plant. It contains no caffeine and is high in minerals and antioxidants.

This plain version gives the liquor a bright red colour and has rich fruity (cooked cherry), cereal (malt) and sour aromas, giving the cup a warm, gourmet feel.`,
				user: user.id,
			},
			{
				name: 'Zhenghe Hong Gong Fu',
				slug: 'zhenghe-hong-gong-fu',
				image: 'https://live.staticflickr.com/65535/51250549760_9ab49056f0_b.jpg',
				description: `The major producing region of Fujian in China brings us a black tea with small dark leaves, coppery buds and fragrances of opulent flowers (peony), musk, and sweet spices.

On the palate, its sweet taste combines with a range of woody (conifer) and fruity aromas. Supple and balanced, its liquor offers a lovely gourmet persistence of cocoa and peanut oil.

A must for any fan of black tea.`,
				user: user.id,
			},
		])
		.returning(['id'])
		.execute()

	await db
		.insertInto('category_items')
		.values(items.map(item => ({ category: category.id, item: item.id })))
		.execute()

	const attributes = await db
		.insertInto('attributes')
		.values([
			{ name: 'Cultivar', slug: 'cultivar', type: 'text', user: user.id },
			{ name: 'Producer', slug: 'producer', type: 'text', user: user.id },
			{ name: 'Altitude (m)', slug: 'altitude', type: 'number', user: user.id },
			{ name: 'Date of harvest', slug: 'date-of-harvest', type: 'date', user: user.id },
			{ name: 'Certified by', slug: 'certified-by', type: 'text', user: user.id },

			{ name: 'Caffeine (mg)', slug: 'caffeine', type: 'number', user: user.id },
			{ name: 'Antioxidants (μmol)', slug: 'antioxidants', type: 'number', user: user.id },

			{ name: 'Earthy', slug: 'earthy', type: 'number', user: user.id },
			{ name: 'Floral', slug: 'floral', type: 'number', user: user.id },
			{ name: 'Fruity', slug: 'fruity', type: 'number', user: user.id },
			{ name: 'Spice', slug: 'spice', type: 'number', user: user.id },
			{ name: 'Vegetal', slug: 'vegetal', type: 'number', user: user.id },
			{ name: 'Woody', slug: 'woody', type: 'number', user: user.id },
		])
		.returning(['id'])
		.execute()

	await db
		.insertInto('category_attributes')
		.values(attributes.map(attribute => ({ category: category.id, attribute: attribute.id })))
		.execute()

	const [
		assam_breakfast_organic,
		cerise_rubis,
		ceylan_new_vithanakande,
		dong_ding_mr_nen_yu_roasted,
		gunpowder_organic,
		gyokuro_shizuoka_organic,
		hojicha_isagawa_organic,
		jingning_yin_zhen,
		kenya_kangaita,
		labrador_tea_grade_one,
		long_jing_zhejiang,
		maple_tea,
		meng_ding_huang_ya,
		meng_ding_jin_jun_mei,
		nepal_autumn_jun_chiyabari_organic,
		pu_er_shou_2003_orange_label,
		shan_lin_xi,
		tea_studio_2022_nilgiri_maocha,
		vietnam_sung_do,
		wupperthal_rooibos_organic,
		zhenghe_hong_gong_fu,
	] = items

	if (
		!assam_breakfast_organic ||
		!cerise_rubis ||
		!ceylan_new_vithanakande ||
		!dong_ding_mr_nen_yu_roasted ||
		!gunpowder_organic ||
		!gyokuro_shizuoka_organic ||
		!hojicha_isagawa_organic ||
		!jingning_yin_zhen ||
		!kenya_kangaita ||
		!labrador_tea_grade_one ||
		!long_jing_zhejiang ||
		!maple_tea ||
		!meng_ding_huang_ya ||
		!meng_ding_jin_jun_mei ||
		!nepal_autumn_jun_chiyabari_organic ||
		!pu_er_shou_2003_orange_label ||
		!shan_lin_xi ||
		!tea_studio_2022_nilgiri_maocha ||
		!vietnam_sung_do ||
		!wupperthal_rooibos_organic ||
		!zhenghe_hong_gong_fu
	)
		throw new Error('Some of the created items are missing', { cause: { items } })

	const [
		cultivar,
		producer,
		altitude,
		date_of_harvest,
		certified_by,
		caffeine,
		antioxidants,
		earthy,
		floral,
		fruity,
		spice,
		vegetal,
		woody,
	] = attributes

	if (
		!cultivar ||
		!producer ||
		!altitude ||
		!date_of_harvest ||
		!certified_by ||
		!caffeine ||
		!antioxidants ||
		!earthy ||
		!floral ||
		!fruity ||
		!spice ||
		!vegetal ||
		!woody
	)
		throw new Error('Some of the created attributes are missing', { cause: { attributes } })

	await db
		.insertInto('attribute_values')
		.values([
			{
				item: assam_breakfast_organic.id,
				attribute: cultivar.id,
				value_text: 'Assamica clonal TV4 & TV22',
			},
			{
				item: assam_breakfast_organic.id,
				attribute: producer.id,
				value_text: 'Mr. Dibjyoti Mahanta',
			},
			{ item: assam_breakfast_organic.id, attribute: altitude.id, value_number: 300 },
			{ item: assam_breakfast_organic.id, attribute: date_of_harvest.id, value_date: '2025-07-22' },
			{
				item: assam_breakfast_organic.id,
				attribute: certified_by.id,
				value_text: 'Ecocert Canada',
			},
			{ item: assam_breakfast_organic.id, attribute: caffeine.id, value_number: 22 },
			{ item: assam_breakfast_organic.id, attribute: antioxidants.id, value_number: 650 },
			{ item: assam_breakfast_organic.id, attribute: earthy.id, value_number: 0 },
			{ item: assam_breakfast_organic.id, attribute: floral.id, value_number: 0 },
			{ item: assam_breakfast_organic.id, attribute: fruity.id, value_number: 1 },
			{ item: assam_breakfast_organic.id, attribute: spice.id, value_number: 0 },
			{ item: assam_breakfast_organic.id, attribute: vegetal.id, value_number: 0 },
			{ item: assam_breakfast_organic.id, attribute: woody.id, value_number: 2 },
			{ item: cerise_rubis.id, attribute: earthy.id, value_number: 0 },
			{ item: cerise_rubis.id, attribute: floral.id, value_number: 0 },
			{ item: cerise_rubis.id, attribute: fruity.id, value_number: 3 },
			{ item: cerise_rubis.id, attribute: spice.id, value_number: 0 },
			{ item: cerise_rubis.id, attribute: vegetal.id, value_number: 0 },
			{ item: cerise_rubis.id, attribute: woody.id, value_number: 0 },
			{ item: ceylan_new_vithanakande.id, attribute: cultivar.id, value_text: 'Assamica' },
			{ item: ceylan_new_vithanakande.id, attribute: altitude.id, value_number: 150 },
			{ item: ceylan_new_vithanakande.id, attribute: date_of_harvest.id, value_date: '2025-09-15' },
			{ item: ceylan_new_vithanakande.id, attribute: caffeine.id, value_number: 88 },
			{ item: ceylan_new_vithanakande.id, attribute: antioxidants.id, value_number: 2108 },
			{ item: ceylan_new_vithanakande.id, attribute: floral.id, value_number: 0 },
			{ item: ceylan_new_vithanakande.id, attribute: fruity.id, value_number: 1 },
			{ item: ceylan_new_vithanakande.id, attribute: woody.id, value_number: 3 },
			{ item: ceylan_new_vithanakande.id, attribute: earthy.id, value_number: 0 },
			{ item: ceylan_new_vithanakande.id, attribute: spice.id, value_number: 0 },
			{ item: ceylan_new_vithanakande.id, attribute: vegetal.id, value_number: 0 },
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: cultivar.id, value_text: 'Qing Xing' },
			{
				item: dong_ding_mr_nen_yu_roasted.id,
				attribute: producer.id,
				value_text: 'Mr. Chen, Nen Yu',
			},
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: altitude.id, value_number: 900 },
			{
				item: dong_ding_mr_nen_yu_roasted.id,
				attribute: date_of_harvest.id,
				value_date: '2026-04-22',
			},
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: earthy.id, value_number: 0 },
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: floral.id, value_number: 1 },
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: fruity.id, value_number: 0 },
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: spice.id, value_number: 1 },
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: vegetal.id, value_number: 1 },
			{ item: dong_ding_mr_nen_yu_roasted.id, attribute: woody.id, value_number: 2 },
			{ item: gunpowder_organic.id, attribute: cultivar.id, value_text: 'Bi Chun Zao' },
			{ item: gunpowder_organic.id, attribute: producer.id, value_text: 'Mr. Fanxin Liu' },
			{ item: gunpowder_organic.id, attribute: altitude.id, value_number: 840 },
			{ item: gunpowder_organic.id, attribute: date_of_harvest.id, value_date: '2024-06-20' },
			{ item: gunpowder_organic.id, attribute: certified_by.id, value_text: 'Ecocert Canada' },
			{ item: gunpowder_organic.id, attribute: earthy.id, value_number: 1 },
			{ item: gunpowder_organic.id, attribute: floral.id, value_number: 0 },
			{ item: gunpowder_organic.id, attribute: fruity.id, value_number: 0 },
			{ item: gunpowder_organic.id, attribute: spice.id, value_number: 0 },
			{ item: gunpowder_organic.id, attribute: vegetal.id, value_number: 3 },
			{ item: gunpowder_organic.id, attribute: woody.id, value_number: 1 },
			{ item: gyokuro_shizuoka_organic.id, attribute: cultivar.id, value_text: 'Assemblage' },
			{ item: gyokuro_shizuoka_organic.id, attribute: producer.id, value_text: "Coop d'Okabe" },
			{ item: gyokuro_shizuoka_organic.id, attribute: altitude.id, value_number: 500 },
			{
				item: gyokuro_shizuoka_organic.id,
				attribute: date_of_harvest.id,
				value_date: '2025-05-13',
			},
			{
				item: gyokuro_shizuoka_organic.id,
				attribute: certified_by.id,
				value_text: 'Ecocert Canada',
			},
			{ item: gyokuro_shizuoka_organic.id, attribute: caffeine.id, value_number: 78 },
			{ item: gyokuro_shizuoka_organic.id, attribute: antioxidants.id, value_number: 2311 },
			{ item: gyokuro_shizuoka_organic.id, attribute: earthy.id, value_number: 0 },
			{ item: gyokuro_shizuoka_organic.id, attribute: floral.id, value_number: 1 },
			{ item: gyokuro_shizuoka_organic.id, attribute: fruity.id, value_number: 0 },
			{ item: gyokuro_shizuoka_organic.id, attribute: spice.id, value_number: 0 },
			{ item: gyokuro_shizuoka_organic.id, attribute: vegetal.id, value_number: 3 },
			{ item: gyokuro_shizuoka_organic.id, attribute: woody.id, value_number: 0 },
			{ item: hojicha_isagawa_organic.id, attribute: cultivar.id, value_text: 'Yabukita' },
			{ item: hojicha_isagawa_organic.id, attribute: producer.id, value_text: 'Mr. Osada' },
			{ item: hojicha_isagawa_organic.id, attribute: altitude.id, value_number: 400 },
			{ item: hojicha_isagawa_organic.id, attribute: date_of_harvest.id, value_date: '2025-05-18' },
			{
				item: hojicha_isagawa_organic.id,
				attribute: certified_by.id,
				value_text: 'Ecocert Canada',
			},
			{ item: hojicha_isagawa_organic.id, attribute: caffeine.id, value_number: 41 },
			{ item: hojicha_isagawa_organic.id, attribute: antioxidants.id, value_number: 862 },
			{ item: hojicha_isagawa_organic.id, attribute: earthy.id, value_number: 0 },
			{ item: hojicha_isagawa_organic.id, attribute: floral.id, value_number: 0 },
			{ item: hojicha_isagawa_organic.id, attribute: fruity.id, value_number: 0 },
			{ item: hojicha_isagawa_organic.id, attribute: spice.id, value_number: 0 },
			{ item: hojicha_isagawa_organic.id, attribute: vegetal.id, value_number: 0 },
			{ item: hojicha_isagawa_organic.id, attribute: woody.id, value_number: 3 },
			{ item: jingning_yin_zhen.id, attribute: cultivar.id, value_text: 'Fuding Da Bai' },
			{ item: jingning_yin_zhen.id, attribute: producer.id, value_text: 'Mr. He Wei Zhong' },
			{ item: jingning_yin_zhen.id, attribute: altitude.id, value_number: 500 },
			{ item: jingning_yin_zhen.id, attribute: date_of_harvest.id, value_date: '2026-04-03' },
			{ item: jingning_yin_zhen.id, attribute: caffeine.id, value_number: 26 },
			{ item: jingning_yin_zhen.id, attribute: antioxidants.id, value_number: 577 },
			{ item: jingning_yin_zhen.id, attribute: earthy.id, value_number: 0 },
			{ item: jingning_yin_zhen.id, attribute: floral.id, value_number: 2 },
			{ item: jingning_yin_zhen.id, attribute: fruity.id, value_number: 1 },
			{ item: jingning_yin_zhen.id, attribute: spice.id, value_number: 0 },
			{ item: jingning_yin_zhen.id, attribute: vegetal.id, value_number: 3 },
			{ item: jingning_yin_zhen.id, attribute: woody.id, value_number: 0 },
			{ item: kenya_kangaita.id, attribute: cultivar.id, value_text: 'Assamica' },
			{ item: kenya_kangaita.id, attribute: producer.id, value_text: 'Mr. Kaburi' },
			{ item: kenya_kangaita.id, attribute: altitude.id, value_number: 2100 },
			{ item: kenya_kangaita.id, attribute: date_of_harvest.id, value_date: '2024-03-09' },
			{ item: kenya_kangaita.id, attribute: caffeine.id, value_number: 63 },
			{ item: kenya_kangaita.id, attribute: antioxidants.id, value_number: 2147 },
			{ item: kenya_kangaita.id, attribute: floral.id, value_number: 0 },
			{ item: kenya_kangaita.id, attribute: fruity.id, value_number: 1 },
			{ item: kenya_kangaita.id, attribute: woody.id, value_number: 2 },
			{ item: kenya_kangaita.id, attribute: earthy.id, value_number: 1 },
			{ item: kenya_kangaita.id, attribute: spice.id, value_number: 0 },
			{ item: kenya_kangaita.id, attribute: vegetal.id, value_number: 0 },
			{ item: labrador_tea_grade_one.id, attribute: earthy.id, value_number: 0 },
			{ item: labrador_tea_grade_one.id, attribute: floral.id, value_number: 0 },
			{ item: labrador_tea_grade_one.id, attribute: fruity.id, value_number: 2 },
			{ item: labrador_tea_grade_one.id, attribute: spice.id, value_number: 0 },
			{ item: labrador_tea_grade_one.id, attribute: vegetal.id, value_number: 2 },
			{ item: labrador_tea_grade_one.id, attribute: woody.id, value_number: 1 },
			{ item: long_jing_zhejiang.id, attribute: cultivar.id, value_text: 'Long Jing 43' },
			{ item: long_jing_zhejiang.id, attribute: producer.id, value_text: 'Mr. He Wei Zhong' },
			{ item: long_jing_zhejiang.id, attribute: altitude.id, value_number: 500 },
			{ item: long_jing_zhejiang.id, attribute: date_of_harvest.id, value_date: '2025-04-12' },
			{ item: long_jing_zhejiang.id, attribute: caffeine.id, value_number: 59 },
			{ item: long_jing_zhejiang.id, attribute: antioxidants.id, value_number: 2760 },
			{ item: long_jing_zhejiang.id, attribute: earthy.id, value_number: 0 },
			{ item: long_jing_zhejiang.id, attribute: floral.id, value_number: 1 },
			{ item: long_jing_zhejiang.id, attribute: fruity.id, value_number: 0 },
			{ item: long_jing_zhejiang.id, attribute: spice.id, value_number: 0 },
			{ item: long_jing_zhejiang.id, attribute: vegetal.id, value_number: 3 },
			{ item: long_jing_zhejiang.id, attribute: woody.id, value_number: 1 },
			{ item: meng_ding_huang_ya.id, attribute: cultivar.id, value_text: 'Ming Shan no 9' },
			{ item: meng_ding_huang_ya.id, attribute: producer.id, value_text: 'Mr. Zhang Qian' },
			{ item: meng_ding_huang_ya.id, attribute: altitude.id, value_number: 400 },
			{ item: meng_ding_huang_ya.id, attribute: date_of_harvest.id, value_date: '2026-03-11' },
			{ item: meng_ding_huang_ya.id, attribute: earthy.id, value_number: 0 },
			{ item: meng_ding_huang_ya.id, attribute: floral.id, value_number: 0 },
			{ item: meng_ding_huang_ya.id, attribute: fruity.id, value_number: 0 },
			{ item: meng_ding_huang_ya.id, attribute: spice.id, value_number: 0 },
			{ item: meng_ding_huang_ya.id, attribute: vegetal.id, value_number: 1 },
			{ item: meng_ding_huang_ya.id, attribute: woody.id, value_number: 2 },
			{ item: meng_ding_jin_jun_mei.id, attribute: cultivar.id, value_text: 'Ming Shan no 9' },
			{ item: meng_ding_jin_jun_mei.id, attribute: producer.id, value_text: 'Mr. Zhang Qian' },
			{ item: meng_ding_jin_jun_mei.id, attribute: altitude.id, value_number: 750 },
			{ item: meng_ding_jin_jun_mei.id, attribute: date_of_harvest.id, value_date: '2026-03-12' },
			{ item: meng_ding_jin_jun_mei.id, attribute: earthy.id, value_number: 0 },
			{ item: meng_ding_jin_jun_mei.id, attribute: floral.id, value_number: 2 },
			{ item: meng_ding_jin_jun_mei.id, attribute: fruity.id, value_number: 1 },
			{ item: meng_ding_jin_jun_mei.id, attribute: spice.id, value_number: 0 },
			{ item: meng_ding_jin_jun_mei.id, attribute: vegetal.id, value_number: 0 },
			{ item: meng_ding_jin_jun_mei.id, attribute: woody.id, value_number: 1 },
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: cultivar.id, value_text: 'Clonal' },
			{
				item: nepal_autumn_jun_chiyabari_organic.id,
				attribute: producer.id,
				value_text: 'Mr. Gyawali, Bachan',
			},
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: altitude.id, value_number: 1850 },
			{
				item: nepal_autumn_jun_chiyabari_organic.id,
				attribute: date_of_harvest.id,
				value_date: '2025-10-16',
			},
			{
				item: nepal_autumn_jun_chiyabari_organic.id,
				attribute: certified_by.id,
				value_text: 'Ecocert Canada',
			},
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: earthy.id, value_number: 0 },
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: floral.id, value_number: 1 },
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: fruity.id, value_number: 1 },
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: spice.id, value_number: 0 },
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: vegetal.id, value_number: 1 },
			{ item: nepal_autumn_jun_chiyabari_organic.id, attribute: woody.id, value_number: 2 },
			{ item: pu_er_shou_2003_orange_label.id, attribute: cultivar.id, value_text: 'Da Ye' },
			{ item: pu_er_shou_2003_orange_label.id, attribute: earthy.id, value_number: 3 },
			{ item: pu_er_shou_2003_orange_label.id, attribute: floral.id, value_number: 0 },
			{ item: pu_er_shou_2003_orange_label.id, attribute: fruity.id, value_number: 1 },
			{ item: pu_er_shou_2003_orange_label.id, attribute: spice.id, value_number: 0 },
			{ item: pu_er_shou_2003_orange_label.id, attribute: vegetal.id, value_number: 0 },
			{ item: pu_er_shou_2003_orange_label.id, attribute: woody.id, value_number: 1 },
			{ item: shan_lin_xi.id, attribute: cultivar.id, value_text: 'Qing Xing' },
			{ item: shan_lin_xi.id, attribute: producer.id, value_text: 'Mr. Chen, Nen Yu' },
			{ item: shan_lin_xi.id, attribute: altitude.id, value_number: 1500 },
			{ item: shan_lin_xi.id, attribute: date_of_harvest.id, value_date: '2026-04-30' },
			{ item: shan_lin_xi.id, attribute: antioxidants.id, value_number: 750 },
			{ item: shan_lin_xi.id, attribute: earthy.id, value_number: 0 },
			{ item: shan_lin_xi.id, attribute: floral.id, value_number: 2 },
			{ item: shan_lin_xi.id, attribute: fruity.id, value_number: 1 },
			{ item: shan_lin_xi.id, attribute: spice.id, value_number: 0 },
			{ item: shan_lin_xi.id, attribute: vegetal.id, value_number: 1 },
			{ item: shan_lin_xi.id, attribute: woody.id, value_number: 0 },
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: cultivar.id, value_text: 'Assamica' },
			{
				item: tea_studio_2022_nilgiri_maocha.id,
				attribute: producer.id,
				value_text: 'Ms. Muskan Khanna',
			},
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: altitude.id, value_number: 1850 },
			{
				item: tea_studio_2022_nilgiri_maocha.id,
				attribute: date_of_harvest.id,
				value_date: '2022-03-16',
			},
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: earthy.id, value_number: 0 },
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: floral.id, value_number: 1 },
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: fruity.id, value_number: 2 },
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: spice.id, value_number: 0 },
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: vegetal.id, value_number: 1 },
			{ item: tea_studio_2022_nilgiri_maocha.id, attribute: woody.id, value_number: 0 },
			{ item: vietnam_sung_do.id, attribute: cultivar.id, value_text: 'Théiers sauvages' },
			{ item: vietnam_sung_do.id, attribute: producer.id, value_text: 'Mr. Giang Aly' },
			{ item: vietnam_sung_do.id, attribute: altitude.id, value_number: 1000 },
			{ item: vietnam_sung_do.id, attribute: date_of_harvest.id, value_date: '2025-04-21' },
			{ item: vietnam_sung_do.id, attribute: floral.id, value_number: 0 },
			{ item: vietnam_sung_do.id, attribute: fruity.id, value_number: 2 },
			{ item: vietnam_sung_do.id, attribute: woody.id, value_number: 1 },
			{ item: vietnam_sung_do.id, attribute: earthy.id, value_number: 1 },
			{ item: vietnam_sung_do.id, attribute: spice.id, value_number: 1 },
			{ item: vietnam_sung_do.id, attribute: vegetal.id, value_number: 0 },
			{
				item: wupperthal_rooibos_organic.id,
				attribute: certified_by.id,
				value_text: 'Ecocert Canada',
			},
			{ item: wupperthal_rooibos_organic.id, attribute: earthy.id, value_number: 0 },
			{ item: wupperthal_rooibos_organic.id, attribute: floral.id, value_number: 0 },
			{ item: wupperthal_rooibos_organic.id, attribute: fruity.id, value_number: 2 },
			{ item: wupperthal_rooibos_organic.id, attribute: spice.id, value_number: 0 },
			{ item: wupperthal_rooibos_organic.id, attribute: vegetal.id, value_number: 0 },
			{ item: wupperthal_rooibos_organic.id, attribute: woody.id, value_number: 1 },
			{ item: zhenghe_hong_gong_fu.id, attribute: cultivar.id, value_text: 'Zhenghe Da Bai' },
			{ item: zhenghe_hong_gong_fu.id, attribute: producer.id, value_text: 'Mr. Yang Mao Wang' },
			{ item: zhenghe_hong_gong_fu.id, attribute: altitude.id, value_number: 900 },
			{ item: zhenghe_hong_gong_fu.id, attribute: date_of_harvest.id, value_date: '2025-04-15' },
			{ item: zhenghe_hong_gong_fu.id, attribute: floral.id, value_number: 1 },
			{ item: zhenghe_hong_gong_fu.id, attribute: fruity.id, value_number: 0 },
			{ item: zhenghe_hong_gong_fu.id, attribute: woody.id, value_number: 2 },
			{ item: zhenghe_hong_gong_fu.id, attribute: earthy.id, value_number: 1 },
			{ item: zhenghe_hong_gong_fu.id, attribute: spice.id, value_number: 1 },
			{ item: zhenghe_hong_gong_fu.id, attribute: vegetal.id, value_number: 0 },
		])
		.execute()
}
