const fetch = require('node-fetch')

const cheerio = require('cheerio')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const virtualConsole = new jsdom.VirtualConsole() // use VirtualConsole to hide parsing errors

const { getMetadata, metadataRuleSets } = require('page-metadata-parser')
const { Readability } = require('@mozilla/readability')

const nGram = require('n-gram')
const stopwords = require('stopwords-iso')

const my_stopwords = 'werbung data edit confirmed stehen' // 'january february march april may june july august september october november december'
const all_stopwords = [
	...new Set(
		Object.values(stopwords)
		.reduce((all_stopwords, words) => {
			all_stopwords = all_stopwords.concat(words)
			return all_stopwords
		}, [])
	),
	...my_stopwords.split(' ')
]



const customRuleSets = {
	charset: {
		rules: [
			['meta[charset]', element => element.getAttribute('charset')],
		],
	},
	keywords: {
		rules: [
			// ['a[class="entry-tag"]', element => element.textContent],
			['meta[name="keywords" i]', element => element.getAttribute('content')],
			['meta[name="news_keywords" i]', element => element.getAttribute('content')],
			['meta[name="sailthru.tags" i]', element => element.getAttribute('content')],
			['meta[name="parsely-tags" i]', element => element.getAttribute('content')],
		],
		processors: [
			(keywords, context) => {
				return keywords
				.split(',')
				.map((keyword) => keyword.trim())
				.filter(keyword => (
					!keyword.startsWith('feed-filter-')
					&& !keyword.startsWith('stream-')
				))
			}
		],
		scorers: [
			(element, score) => {
				// Use the keywords element with the most tags.
				const content = element.getAttribute('content') || ''
				return content.length
			}
		],
	}
}

function getNgram(n_gram_length, tokens){

	// generate n-gram
	let grams = []
	if (n_gram_length === 1) {
		grams = tokens.map(token => [token])
	}else if (n_gram_length > 1) {
		grams = nGram(n_gram_length)(tokens)
	}

	// remove n-grams that contain stopwords AND are less than two letters long
	grams = grams.filter(tokens => {
		let found = false
	
		for (const token of tokens) {
			if (/*token.length <= 2 ||*/ all_stopwords.includes(token.toLowerCase())) {
				found = true
				break
			}
		}
	
		return !found
	})
	grams = grams.map(g => g.join(' ')) // convert token-arrays to strings


	// get the amount of appearance of the n-gram
	let grams_rank = {}
	for (const token of grams) {
		if (!grams_rank[token]) {
			grams_rank[token] = 0
		}
		grams_rank[token] += 1
	}


	grams_rank = Object.entries(grams_rank)
	.filter(g_count => g_count[1] > 1 && g_count[0].length <= 30) // remove n-gram that appear only once AND n-gram that are longer than 30 letters
	.sort((a, b) => b[1] - a[1]) // sort so the with the highest count are first

	// remove n-grams that appear less than the second highst amount times 0.8
	if (grams_rank.length > 1) {
		const limit = ~~(grams_rank[1][1]*0.7) // count of the second item * 0.8
		grams_rank = grams_rank.filter(g_count => g_count[1] >= limit)
	}


	// only return the strings, not the counts
	grams_rank = grams_rank.map(g => g[0])

	return grams_rank
}

function removeURLs(text){
	const regex = /((([\p{Letter}]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[\p{Letter}0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w#_]*)?\??(?:[-\+=,&;%@.\w_]*)#?(?:[.!\/\\w]*))?)/gu
	return text.replace(regex, ' ')
}

function removeTags(text){
	const regex = /<\/?[A-Za-z_-]*?[^>]*?\/?>/g
	return text.replace(regex, ' ')
}

function getKeywords(text){

	text = removeTags(text)
	text = removeURLs(text)

	// remove everything inn brackets
	text = text.replace(/\([^()]*?\)/g, ' ') || ''

	// find tokens
	const tokens = (text.match(/[\p{Letter}0-9]+[\p{Letter}0-9-&+_'/?=,:*;#]*[\p{Letter}0-9*+]/ug) || [])
	.map(token => token.replace(/^[0-9]+$/, ''))
	.filter(token => token !== '')


	// generate n-grams
	let grams = []
	for (let i = 1; i < tokens.length; i++) {
		const generatedGrams = getNgram(i, tokens)
		if (generatedGrams.length === 0) {
			break
		}else{
			grams = [
				...grams,
				...generatedGrams,
			]
		}
	}


	// filter n-grams that exists in another n-gram
	const grams_filtered = grams
	.filter(this_gram => {
		let found = false

		for (let i = 0; i < grams.length; i++) {
			const gram = grams[i]
			if (gram !== this_gram && gram.includes(this_gram)) {
				found = true
				break
			}
		}

		return !found
	})

	// only use the first found spelling
	let grams_one_spelling = {}
	for (const gram of grams_filtered) {
		const gram_lowercase = gram.toLowerCase()
		if (!grams_one_spelling[gram_lowercase]) {
			grams_one_spelling[gram_lowercase] = gram
		}
	}
	grams_one_spelling = Object.values(grams_one_spelling)

	return grams_one_spelling
}

function customTrim(text){
	return (text || '').replace(/(?:^(?:\\n||\s|\v)+|(?:\\n||\s|\v)+$)/gm, '')
}

function parseURL(url){
	return new Promise((resolve, reject) => {
		fetch(url, {
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*;q=0.8',
				'Accept-Encoding': 'gzip, deflate, br',
				// 'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6,de-DE;q=0.4,de;q=0.2',
				// 'Dnt': '1',
				// 'Host': 'httpbin.org',
				// 'Upgrade-Insecure-Requests': '1',
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:80.0) Gecko/20100101 Firefox/80.0',
			}
		})
		.then(async response => {

			if (response.status !== 200) {
				reject(new Error(response.status))
				return null
			}

			let html = await response.text()


			const $ = cheerio.load(html)
			$('.references').remove() // remove wikipedia references

			// find keywords that @mozilla/readability isn't finding
			let foundKeywords = []
			// GitHub
			$('a.topic-tag').each(function(i, elem) {
				foundKeywords.push(customTrim($(this).text()))
			})
			// Tagesschau
			$('a[rel="tag"]').each(function(i, elem) {
				foundKeywords.push(customTrim($(this).text()))
			})
			// Mannschaft
			$('a.entry-tag').each(function(i, elem) {
				foundKeywords.push(customTrim($(this).text()))
			})
			$('.entry-category').each(function(i, elem) {
				foundKeywords.push(customTrim($(this).text()))
			})

			html = $.html()


			const doc = new JSDOM(html, {
				url,
				referrer: "https://google.com/",
				virtualConsole,
				pretendToBeVisual: false,
			})

			const document = doc.window.document
			const article = new Readability(document).parse() || {}
			const metadata = getMetadata(document, url, {
				...metadataRuleSets,
				...customRuleSets,
			})

			if (
				article.siteName === 'Twitter'
				|| metadata.provider === 'Instagram'
			) {
				reject(new Error('Social Media'))
				return null
			}

			delete article.content
			// article.content = (article.content || '').replace(/(?:<!--.*?-->)/gm, '').replace(/\\n/gm, '\n')
			article.textContent = customTrim(article.textContent)

			let generatedKeywords = []
			let text = article.textContent
			if (!(!!article.textContent)) {
				text = metadata.description
			}
			if (!!text) {
				generatedKeywords = getKeywords(text)
			}

			if (!!metadata.keywords) {
				foundKeywords = [
					...foundKeywords,
					...new Set(metadata.keywords),
				]
				delete metadata.keywords
			}

			resolve({
				article,
				metadata,
				foundKeywords,
				generatedKeywords,
			})
		})
		.catch(reject)
	})
}

let url;
url = 'https://www.theverge.com/2020/9/5/21423889/fortnite-epic-apple-preliminary-injunction-filing-ios-mac'
// url = 'https://www.tagesschau.de/inland/spahn-urlaub-coronavirus-101.html'
// url = 'https://www.instagram.com/p/CEl0_C0FDnS/'
// url = 'http://www.anyway-koeln.de/neu-hier/'
// url = 'https://secure.avaaz.org/campaign/en/uyghurs_in_china_loc/'
// url = 'https://twitter.com/qiekub/status/1270493076486840320'
// url = 'https://www.theguardian.com/us-news/2020/sep/05/trump-fox-news-journalist-jennifer-griffin-soldiers-losers'
// url = 'https://www.faz.net/aktuell/politik/wahl-in-amerika/usa-donald-trump-verlangt-entlassung-von-fox-news-korrespondentin-16940220.html'
// url = 'https://ga.de/bonn/stadt-bonn/der-viertwaermste-sommer-aller-zeiten_aid-53089623'
// url = 'https://mannschaft.com/2020/09/05/mehrere-lgbtiq-preistraegerinnen-beim-swiss-diversity-award/'
// url = 'https://wiki.openstreetmap.org/wiki/API_v0.6'
// url = 'https://en.wikipedia.org/wiki/OpenStreetMap'
// url = 'https://map.qiekub.org'
// url = 'https://www.queer.de/bild-des-tages.php?einzel=3146'
// url = 'https://github.com/jsdom/jsdom'
// url = 'https://www.youtube.com/watch?v=uoD5M66p3yU&feature=youtu.be'
// url = 'https://journalofbeautifulbusiness.com/the-purpose-of-capitalism-16663295c935'
// url = 'https://www.zeit.de/2020/37/ostdeutschland-wiederveinigung-zeitzeugen-ost-west-konflikt'
// url = 'https://www.welt.de/politik/ausland/plus215151328/Folgen-der-Pandemie-Londons-City-stirbt-einen-langsamen-Corona-Tod.html'
// url = 'http://www.anyway-koeln.de/lesbische-s__chwule-bisexuelle-und-trans-jugendliche-durch-corona-stark-belastet/'
// url = 'https://www.facebook.com/XRBonn/photos/a.808081589555471/1193554967674796/'
// url = 'https://eji.org/'

parseURL(url)
.then(metadata => {
	console.log(JSON.stringify(metadata,null,4))
})
.catch(error => console.error(error))


