// check if dependencies are installed before running

const Perspective = require('perspective-api-client')
const PERSPECTIVE_API_KEY = 'AIzaSyBqACeB0ia2lLTvicifoNoWaXPIGuOEMcQ'
const perspective = new Perspective({apiKey: PERSPECTIVE_API_KEY})

// const cld = require('cld')

// const LanguageDetect = require('languagedetect')
// const lngDetector = new LanguageDetect()
// lngDetector.setLanguageType('iso2')

const cldFactory_loadModule = require('./node_modules/cld3-asm/dist/cjs/loadModule.js').loadModule


 
const attributes_peer_lang = {
	en: [
		'TOXICITY',
		'SEVERE_TOXICITY',

		// 'TOXICITY_FAST',
		'IDENTITY_ATTACK',
		'INSULT',
		'PROFANITY',
		'THREAT',
		
		'SEXUALLY_EXPLICIT',
		'FLIRTATION',

		'ATTACK_ON_AUTHOR',
		'ATTACK_ON_COMMENTER',
		'INCOHERENT',
		'INFLAMMATORY',
		'LIKELY_TO_REJECT',
		'OBSCENE',
		'SPAM',
		'UNSUBSTANTIAL',
	],
	fr: [
		'TOXICITY',
		'SEVERE_TOXICITY',

		'IDENTITY_ATTACK_EXPERIMENTAL',
		'INSULT_EXPERIMENTAL',
		'PROFANITY_EXPERIMENTAL',
		'THREAT_EXPERIMENTAL',
	],
	es: [
		'TOXICITY',
		'SEVERE_TOXICITY',

		'IDENTITY_ATTACK_EXPERIMENTAL',
		'INSULT_EXPERIMENTAL',
		'PROFANITY_EXPERIMENTAL',
		'THREAT_EXPERIMENTAL',
	],
	de: [
		'TOXICITY',
		'SEVERE_TOXICITY',

		'INSULT',
		'PROFANITY',
		'THREAT',
	],
	it: [
		'TOXICITY',
		'SEVERE_TOXICITY',

		'IDENTITY_ATTACK',
		'INSULT',
		'PROFANITY',
		'THREAT',
	],
	pt: [
		'TOXICITY',
		'SEVERE_TOXICITY',

		'IDENTITY_ATTACK',
		'INSULT',
		'PROFANITY',
		'THREAT',
	],
}
const attribute_synonyms = {
	'TOXICITY_FAST': 'TOXICITY',
	'IDENTITY_ATTACK_EXPERIMENTAL': 'IDENTITY_ATTACK',
	'INSULT_EXPERIMENTAL': 'INSULT',
	'PROFANITY_EXPERIMENTAL': 'PROFANITY',
	'THREAT_EXPERIMENTAL': 'THREAT',
}

function detectLanguage_cld3(text) {
	return new Promise(async (resolve, reject) => {
		const cldFactory = await cldFactory_loadModule()
		
		const identifier = cldFactory.create(0, 10000)

		// const result = identifier.findLanguage(text)

		const frequentResult = identifier.findMostFrequentLanguages(text, 1)

		if (frequentResult.length === 0) {
			reject('unkown language')
		}else{
			const result = frequentResult[0]
			if (
				result.language === 'und' // unkown
				|| result.probability === 0
				|| result.is_reliable === false
				|| result.proportion === 0
			) {
				reject('unkown language')
			}else{
				resolve(result.language)
			}
		}
			
		identifier.dispose()
	})
}

function getPerspectiveScores(lang_code, text){
	return new Promise((resolve, reject) => {
		const attributes = attributes_peer_lang[lang_code]
		if (attributes && attributes.length > 0) {
			perspective.analyze({
				comment: {
					text: text,
				},
				spanAnnotations: false,
				languages: [lang_code],
				doNotStore: true,
			}, {
				attributes: attributes,
				doNotStore: true,
				stripHTML: true,
				truncate: true,
			})
			.then(result => {
				const scores = {}
		
				for (const key in result.attributeScores) {
					const key2use = !!attribute_synonyms[key] ? attribute_synonyms[key] : key
					scores[key2use] = result.attributeScores[key].summaryScore.value
				}
		
				resolve({
					scores,
					languages: result.languages,
					detectedLanguages: result.detectedLanguages,
				})
			})
			.catch(error => reject(error))
		}else{
			reject('language is not supported')
		}
	})
}

function getScores(text){
	return new Promise(async (resolve, reject) => {
		detectLanguage_cld3(text)
		.then(lang_code => {
			getPerspectiveScores(lang_code, text)
			.then(resolve)
			.catch(reject)
		})
		.catch(reject)
	})
}


let text;
text = 'Du bist ein toller Mensch!'
text = 'You are really bad! Du bist ein toller Mensch!'
text = 'You are really bad!'
// text = '347348764587'
// text = 'ta gueule'
text = 'vous êtes en colère'
getScores(text)
.then(result => {
	console.log(JSON.stringify(result, null, 2))
})
.catch(error => {
	console.log(error)
})



