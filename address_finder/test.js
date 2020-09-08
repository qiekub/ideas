const fs = require('fs')
const natural = require('natural')
const NGrams = natural.NGrams
const { removeClutter, getTokens, customTrim, pad_start, pad_end, window_size } = require('./functions.js')


function loadClassifier(language, modelFolderPath){
	let classifier = null

	if (!(!!language)) {
		console.error('Missing language.')
		return
	}

	if (!(!!modelFolderPath)) {
		modelFolderPath = './model/'
	} else if (!modelFolderPath.endsWith('/')) {
		modelFolderPath += '/'
	}

	const filepath = `${modelFolderPath}${language}.txt`

	if (fs.existsSync(filepath)) {
		const modelText = fs.readFileSync(filepath, 'utf-8')
		classifier = natural.BayesClassifier.restore(JSON.parse(modelText))
	}

	return classifier
}

function classify(classifier, tokensByLines){
	let results = []

	const n = window_size
	const middleIndex = ~~(n*0.5)
	const pad_start_token = pad_start.token
	const pad_end_token = pad_end.token

	for (const tokensByLine of tokensByLines) {
		const ngrams = NGrams.ngrams(tokensByLine, n, pad_start, pad_end)
		const line_results = []
		for (const ngram of ngrams) {
			const token_data = ngram[middleIndex]
			if (!!token_data) {
				const ngram_tokens = ngram.map(token_data => token_data.token)
				const token = token_data.token
				if (token !== pad_start_token && token !== pad_end_token) {
					const entity = classifier.classify(ngram_tokens) || ''
					line_results.push({
						...token_data,
						entity,
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

const language = 'de'
let text = 'Wo liegt Aachen?'
text = removeClutter(text)

const tokensByLines = text2tokensByLines(text, language)

const classifier = loadClassifier(language, null)
const result = classify(classifier, tokensByLines)
console.log(result)


