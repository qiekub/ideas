const natural = require('natural')
const stemmer_es = require('stemmer_es')
const stemmer_de = require('snowball-german')

const stemmers = {
	// nl: natural.PorterStemmerNl, // Dutch // does not work
	en: natural.PorterStemmer.stem, // English
	// en: natural.LancasterStemmer.stem, // English
	fa: natural.PorterStemmerFa.stem, // Farsi
	fr: natural.PorterStemmerFr.stem, // French
	id: natural.StemmerId.stem, // Indonesian
	it: natural.PorterStemmerIt.stem, // Italian
	ja: natural.StemmerJa, // Japanese
	no: natural.PorterStemmerNo.stem, // Norwegian
	pt: natural.PorterStemmerPt.stem, // Portugese
	ru: natural.PorterStemmerRu.stem, // Russian
	// es: natural.PorterStemmerEs.stem, // Spanish // does not work
	es: stemmer_es.stem, // Spanish
	sv: natural.PorterStemmerSv.stem, // Swedish
	de: stemmer_de, // German
}

const window_size = 5
const pad_start = {
	token: 'S',
	// entity: '',
	// start: 0,
	// end: 0,
}
const pad_end = {
	token: 'E',
	// entity: '',
	// start: 0,
	// end: 0,
}

function replaceURLs(text, replacer=''){
	const regex = /((([\p{Letter}]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[\p{Letter}0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w#_]*)?\??(?:[-\+=,&;%@.\w_]*)#?(?:[.!\/\\w]*))?)/gu
	return text.replace(regex, replacer)
}

function replaceTags(text, replacer=''){
	const regex = /<\/?[A-Za-z_-]*?[^>]*?\/?>/g
	return text.replace(regex, replacer)
}

function customTrim(text){
	if (!(!!text)) {
		return ''
	}

	text = text.replace(/\s*\n{2,}\s*/g, '\n\n') // remove multi-lines
	text = text.replace(/(?:^(?:\\n||\s|\v)+|(?:\\n||\s|\v)+$)/g, '') // remove whitespace

	return text
}

function getTokens(text, language){

	text = text.toLowerCase()

	let stemmer = null
	if (stemmers.hasOwnProperty(language)) {
		stemmer = stemmers[language]
	}

	let tokens = []
	const matches = text.matchAll(/[\p{Letter}0-9_]*/ug)
	for (const match of matches) {
		if (match[0] !== '') {
			tokens.push({
				token: (!!stemmer ? stemmer(match[0]) : match[0]),
				start: match.index,
				end: match.index + match[0].length,
			})
		}
	}

	return tokens
}

function removeClutter(text){
	// text = replaceTags(text, 'XMLTAG')
	text = replaceURLs(text, 'URL')
	text = text.replace(/[0-9]/g, '_') // replace numbers
	// text = text.replace(/\([^()]*?\)/g, ' ') // remove everything inn brackets
	text = text.replace(/[^\s\n\p{Letter}0-9_]/ug, '') // remove any non-word chars
	text = customTrim(text)
	return text
}

function getTokenByLine(text){
	const lines = (text || '').split('\n')
	.filter(line => line !== '' && !line.startsWith('---'))
	.map(line => {
		line = line.split(' ')
		.map(token => {
			token = token.split('/')
			return {
				token: token.shift(),
				entity: token[0] || '',
			}
		})
		return line
	})

	return lines
}

module.exports = {
	window_size,
	pad_start,
	pad_end,
	replaceURLs,
	replaceTags,
	customTrim,
	getTokens,
	removeClutter,
	getTokenByLine,
}