const fs = require('fs')
const shell = require('shelljs')
const natural = require('natural')
const md5 = require('md5')



const snowball = require('snowball')
const language_codes = {
	da: 'Danish',
	nl: 'Dutch',
	en: 'English',
	fi: 'Finnish',
	fr: 'French',
	de: 'German',
	hu: 'Hungarian',
	it: 'Italian',
	no: 'Norwegian',
	pt: 'Portuguese',
	ro: 'Romanian',
	ru: 'Russian',
	es: 'Spanish',
	sv: 'Swedish',
	tr: 'Turkish', 
}
function stem(word, language){
	if (!!word && !!language && !!language_codes[language]) {
		const stemmer = new snowball(language_codes[language])
		stemmer.setCurrent(word)
		stemmer.stem()
		return stemmer.getCurrent()
	}
	
	return word
}

// const stemmer_es = require('stemmer_es')
// const stemmer_de = require('snowball-german')
// const stemmers = {
// 	// nl: natural.PorterStemmerNl, // Dutch // does not work
// 	en: natural.PorterStemmer.stem, // English
// 	// en: natural.LancasterStemmer.stem, // English
// 	fa: natural.PorterStemmerFa.stem, // Farsi
// 	fr: natural.PorterStemmerFr.stem, // French
// 	id: natural.StemmerId.stem, // Indonesian
// 	it: natural.PorterStemmerIt.stem, // Italian
// 	ja: natural.StemmerJa, // Japanese
// 	no: natural.PorterStemmerNo.stem, // Norwegian
// 	pt: natural.PorterStemmerPt.stem, // Portugese
// 	ru: natural.PorterStemmerRu.stem, // Russian
// 	// es: natural.PorterStemmerEs.stem, // Spanish // does not work
// 	es: stemmer_es.stem, // Spanish
// 	sv: natural.PorterStemmerSv.stem, // Swedish
// 	de: stemmer_de, // German
// }

// const snowball = require('node-snowball')
// const stemmers = {
// 	ar: word => snowball.stemword(word, 'arabic'),
// 	eu: word => snowball.stemword(word, 'basque'),
// 	ca: word => snowball.stemword(word, 'catalan'),
// 	da: word => snowball.stemword(word, 'danish'),
// 	nl: word => snowball.stemword(word, 'dutch'),
// 	en: word => snowball.stemword(word, 'english'),
// 	fi: word => snowball.stemword(word, 'finnish'),
// 	fr: word => snowball.stemword(word, 'french'),
// 	de: word => snowball.stemword(word, 'german'),
// 	el: word => snowball.stemword(word, 'greek'),
// 	hi: word => snowball.stemword(word, 'hindi'),
// 	hu: word => snowball.stemword(word, 'hungarian'),
// 	id: word => snowball.stemword(word, 'indonesian'),
// 	ga: word => snowball.stemword(word, 'irish'),
// 	it: word => snowball.stemword(word, 'italian'),
// 	lt: word => snowball.stemword(word, 'lithuanian'),
// 	ne: word => snowball.stemword(word, 'nepali'),
// 	no: word => snowball.stemword(word, 'norwegian'),
// 	pt: word => snowball.stemword(word, 'portuguese'),
// 	es: word => snowball.stemword(word, 'spanish'),
// 	sv: word => snowball.stemword(word, 'swedish'),
// 	ro: word => snowball.stemword(word, 'romanian'),
// 	ru: word => snowball.stemword(word, 'russian'),
// 	ta: word => snowball.stemword(word, 'tamil'),
// 	tr: word => snowball.stemword(word, 'turkish'),
// }

const window_size = 5
const windowMiddle = Math.round(window_size*0.5) // window_size-2
const pad_start = {
	token: 'S',
	entity: '',
	// start: 0,
	// end: 0,
}
const pad_end = {
	token: 'E',
	entity: '',
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

	let tokens = []
	const matches = text.matchAll(/[\p{Letter}0-9_]*/ug) // matchAll needs node-v12
	for (const match of matches) {
		if (match[0] !== '') {
			tokens.push({
				token: stem(match[0], language),
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
	.filter(line =>
		line.includes('/') // lines should have a tag
		&& line !== '' // line should not be empty
		&& !line.startsWith('---') // lines should not be a article seperator
	)
	.map(line => {
		let tokens = line.split(' ')
		
		if (tokens.length < 2) {
			return false
		}

		return tokens.map(token => {
			token = token.split('/')
			return {
				token: token.shift(),
				entity: token[0] || '',
			}
		})
	})
	.filter(Boolean)

	return lines
}

function text2tokens(text){
	return text
	.split('\n')
	.map(line =>
		getTokens(line, language)
		.map(v => v.token)
		.join(' ')
	)
	.join('\n')
}

/*
function appendTokens(text, language, wrapperFolderPath) {
	if (!(!!text) || !(!!language)) {
		console.error('Missing text or language.')
		return
	}

	const default_folder_path = 'untitled_data'
	wrapperFolderPath = wrapperFolderPath || default_folder_path
	const dataFolderPath = `./${wrapperFolderPath}/data/`

	if (!fs.existsSync(dataFolderPath)) {
		shell.mkdir('-p', dataFolderPath)
	}

	const filepath = `${dataFolderPath}${language}.txt`
	fs.appendFileSync(filepath, '\n---\n'+text)
	console.info('Appended to '+filepath)
}
*/

function createTokenFile(text, folderPath) {
	if (!(!!text) || !(!!folderPath)) {
		console.error('Missing text or folderPath.')
		return null
	}

	const dataFolderPath = `./${folderPath}/data/`
	if (!fs.existsSync(dataFolderPath)) {
		shell.mkdir('-p', dataFolderPath)
	}

	const textID = md5(text)

	const filepath = `${dataFolderPath}${textID}.txt`
	if (!fs.existsSync(filepath)) {
		fs.writeFileSync(filepath, text)
		console.info('Saved to '+filepath)

		return textID
	}

	return null
}

function loadFileInfos(folderPath){
	if (!(!!folderPath)) {
		console.error('Missing folderPath.')
		return []
	}

	const filepath = `./${folderPath}/datainfos.json`

	if (!fs.existsSync(filepath)) {
		return []
	}

	return JSON.parse(fs.readFileSync(filepath, 'utf-8')) || []
}

function saveFileInfos(infos, folderpath, callback) {
	if (!(!!infos) || !(!!folderpath)) {
		console.error('Missing infos or folderpath.')
		return
	}

	const wrapperFolderPath = `./${folderpath}/`

	if (!fs.existsSync(wrapperFolderPath)) {
		shell.mkdir('-p', wrapperFolderPath)
	}

	const filepath = `${wrapperFolderPath}datainfos.json`
	fs.writeFileSync(filepath, JSON.stringify(infos,null,4))
	console.info('Saved infos to '+filepath)

	if (callback) {
		callback()
	}
}

module.exports = {
	window_size,
	windowMiddle,
	pad_start,
	pad_end,
	replaceURLs,
	replaceTags,
	customTrim,
	getTokens,
	removeClutter,
	getTokenByLine,
	text2tokens,
	// appendTokens,
	createTokenFile,
	loadFileInfos,
	saveFileInfos,
}