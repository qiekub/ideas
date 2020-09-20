const fs = require('fs')
const natural = require('natural')
const NGrams = natural.NGrams
const { removeClutter, getTokens, customTrim, pad_start, pad_end, window_size, windowMiddle } = require('./tagger.js')


function loadClassifier(language, folderPath){
	if (!(!!language) || !(!!folderPath)) {
		console.error('Missing language or folderpath.')
		return
	}

	const filepath = `./${folderPath}/models/${language}.json`
	if (fs.existsSync(filepath)) {
		const modelText = fs.readFileSync(filepath, 'utf-8')
		return natural.BayesClassifier.restore(JSON.parse(modelText))
	}

	return null
}

function classify(classifier, tokensByLines){
	if (!(!!classifier)) {
		console.error('Missing classifier.')
		return false
	}

	let results = []

	const pad_start_token = pad_start.token
	const pad_end_token = pad_end.token

	for (const tokensByLine of tokensByLines) {
		const ngrams = NGrams.ngrams(tokensByLine, window_size, pad_start, pad_end)
		const line_results = []
		for (const ngram of ngrams) {
			const token_data = ngram[windowMiddle]
			if (!!token_data) {
				const ngram_tokens = ngram.map(token_data => token_data.token)
				const token = token_data.token
				if (
					token !== pad_start_token
					&& token !== pad_end_token
				) {
					// const entities = (classifier.getClassifications(ngram_tokens) || [])
					// .map(classification => ({
					// 	label: classification.label,
					// 	value: classification.value*10000000000000000000
					// }))
					// .filter(classification => classification.value > 1)
					// .shift()

					line_results.push({
						...token_data,
						entity: classifier.classify(ngram_tokens) || '',
					})
				}
			}
		}
		results.push(line_results)
	}

	return results
}

function text2tokensByLines(text, language){
	return text
	.split('\n')
	.map(line => getTokens(line, language))
}

const folderPath = 'wikinews'
const language = 'en'
let text = 'Wo liegt Aachen?'
// text = 'wo liegt der drachenfels'
// text = removeClutter(text)
text = 'yesterday the french/ENTITY television authority the csa ordered eutelsat/ENTITY a satellite/ENTITY television/ENTITY broadcaster to stop transmitting the tv station sahar_ operated by the iranian/ENTITY government'
// text = 'the record industry claims kazaa not only enables but encourages copyright infringement record industry lawyer tony bannon argued that as kazaa collected information from its users through spyware and sold it to advertisers the companys claim that it had no control over the software was completely mind boggling'
// text = 'in reply india are ___ at stumps having lost wasim jaffer for __ runs just before the close of play'
// text = `thursday was the second day of play in the third/ENTITY test/ENTITY at the resumed their first innings at ____ australia took the remaining four wickets before the lunch break mahendra/ENTITY singh/ENTITY dhoni/ENTITY __ and irfan/ENTITY pathan/ENTITY __ both fell in successive overs india reached ___ all out with the loss of anil/ENTITY kumble/ENTITY for one run and r/ENTITY p/ENTITY singh/ENTITY for a australia struggled early on as irfan pathan dismissed both australian openers for less than ten runs each and michael/ENTITY hussey/ENTITY was caught behind without scoring at lunch australia were ___ the next session australia played well despite losing ricky/ENTITY ponting/ENTITY __ and michael/ENTITY clarke/ENTITY __ coming to the tea break with a score of ____ however in the last session of the day india took five wickets sending australia all out with a score of ___ after fifty overs andrew/ENTITY symonds/ENTITY was australias top scorer with __ runs while adam/ENTITY gilchrist/ENTITY made __ r/ENTITY p/ENTITY singh/ENTITY took four wickets for india`
// text = 'thursdai februari __ ____ us/ENTITY medicar/ENTITY drug benefit cost estim rise to ___ billion in latest congression/ENTITY budget/ENTITY offic/ENTITY cbo estim'
text = 'her royal high crown/ENTITY princess/ENTITY mari/ENTITY of/ENTITY denmark/ENTITY has given birth to a healthi babi boy at a copenhagen hospit at approxim ___ am local time this morn end mani month of wait for the royal famili the danish public and much of the world the babi weigh in at __ kilogram and __ centimet long'
text = 'the woman was arrest on march __ when she took her daughter to a hotel near detroit/ENTITY metropolitan/ENTITY airport/ENTITY where she was to meet the investig who agre to take pornograph photo of the girl for a fee after the woman met the investig she offer him to have sex with her daughter for addit money also she offer the undercov investig herself for a fee accord to the detroit free press'
text = 'this round mark the last v_ supercar race at the pukekoh/ENTITY park/ENTITY raceway/ENTITY new/ENTITY zealand/ENTITY the ____ new zealand round of the seri will compet on a temporari street circuit in press releas'
text = text.replace(/\/ENTITY/g, '')

// const tokensByLines = text2tokensByLines(text, language)
const tokensByLines = text.split('\n').map(line => line.split(' ').map(token => ({token:token})))

const classifier = loadClassifier(language, folderPath)
const result = classify(classifier, tokensByLines)
console.log(result)


