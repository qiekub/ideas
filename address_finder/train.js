const fs = require('fs')
const natural = require('natural')
const NGrams = natural.NGrams
const { getTokenByLine, pad_start, pad_end, window_size } = require('./functions.js')

function getDataText(language, dataFolderPath){
	let text = ''

	if (!(!!dataFolderPath)) {
		dataFolderPath = './data/'
	} else if (!dataFolderPath.endsWith('/')) {
		dataFolderPath += '/'
	}

	const filepath = `${dataFolderPath}${language}.txt`
	if (fs.existsSync(filepath)) {
		text = fs.readFileSync(filepath, 'utf-8')
	}

	return text
}

function getTrainData(tokensByLines){
	const n = window_size
	let trainData = []

	for (const tokensByLine of tokensByLines) {
		const new_ngrams = NGrams.ngrams(tokensByLine, n, pad_start, pad_end)
		trainData = trainData.concat(new_ngrams)
	}

	return trainData
}

function loadClassifier(language, modelFolderPath){
	let classifier = null

	// if (!(!!language)) {
	// 	console.error('Missing language.')
	// 	return
	// }

	// if (!(!!modelFolderPath)) {
	// 	modelFolderPath = './model/'
	// } else if (!modelFolderPath.endsWith('/')) {
	// 	modelFolderPath += '/'
	// }

	// const filepath = `${modelFolderPath}${language}.txt`

	// if (fs.existsSync(filepath)) {
	// 	const modelText = fs.readFileSync(filepath, 'utf-8')
	// 	classifier = natural.BayesClassifier.restore(JSON.parse(modelText))
	// }else{
		classifier = new natural.BayesClassifier()
	// }

	return classifier
}

function train(classifier, trainData){
	for (const tokens of trainData) {
		const middle_entity = (tokens[~~(tokens.length*0.5)].entity || '').toUpperCase()
		classifier.addDocument(tokens.map(token => token.token), middle_entity)
	}

	classifier.train()

	return classifier
}

function saveModel(model, language, modelFolderPath) {
	if (!(!!model) || !(!!language)) {
		console.error('Missing model or language.')
		return
	}

	if (!(!!modelFolderPath)) {
		modelFolderPath = './model/'
	} else if (!modelFolderPath.endsWith('/')) {
		modelFolderPath += '/'
	}

	if (!fs.existsSync(modelFolderPath)) {
		fs.mkdirSync(modelFolderPath)
	}

	const filepath = `${modelFolderPath}${language}.txt`
	fs.writeFileSync(filepath, JSON.stringify(model))
	console.info('Saved model to '+filepath)
}



////////////////////////////////////////////////////////////////



const language = 'de'

const text = getDataText(language)
const tokensByLines = getTokenByLine(text)
const trainData = getTrainData(tokensByLines)

const classifier = loadClassifier(language, null)
train(classifier, trainData)
saveModel(classifier, language, null)


