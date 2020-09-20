const { parseURL } = require('./parseURL.js')
const { removeClutter, getTokens, customTrim } = require('./tagger.js')

const striptags = require('striptags')

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const virtualConsole = new jsdom.VirtualConsole() // use VirtualConsole to hide parsing errors


function getTrainDataFromWiki(text){

	text = striptags(text, ['a'])
	text = customTrim(text)

	const doc = new JSDOM(text, {
		url,
		referrer: "https://google.com/",
		virtualConsole,
		pretendToBeVisual: false,
	})

	text = [...doc.window.document.querySelector('body').childNodes]
	.map(node => {
		if (node.textContent === '') {
			return false
		}

		let tag = ''
		if (!!node.classList) {
			if (
				node.classList.contains('mw-redirect')
				|| node.classList.contains('extiw')
			){
				tag = (node.nodeName === 'A' ? 'ENTITY' : '')
			}
		}

		let text = node.textContent
		text = removeClutter(text)

		let tokens = getTokens(text)
		.map(token => token.token)

		if (tag !== '') {
			tokens = tokens.map(token => token+'/'+tag)
		}

		return tokens.join(' ')
	})
	.filter(Boolean)
	.join(' ')

	return text
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
url = 'https://en.wikinews.org/wiki/Germany_says_Alexei_Navalny_poisoned_with_Novichok'
// url = 'https://en.wikipedia.org/wiki/French_Revolutionary_Wars'
url = 'https://en.wikinews.org/wiki/Special:Random'
// url = 'https://en.wikinews.org/wiki/False_security_alarm_in_Bradford,_England'
// url = 'https://en.wikinews.org/wiki/Jordan_Lloyd_wins_US_Big_Brother_11'

parseURL(url)
.then(metadata => {

	let train_data = null
	if (metadata.siteName === 'Wikimedia Foundation, Inc.') {
		metadata.train_data = getTrainDataFromWiki(metadata['content:html'])
	}

	console.log(JSON.stringify(metadata,null,4))
})
.catch(error => console.error(error))


