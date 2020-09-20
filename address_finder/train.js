const fs = require('fs')
const async = require('async')
const shell = require('shelljs')
const natural = require('natural')
const NGrams = natural.NGrams
const { getTokenByLine, pad_start, pad_end, window_size, windowMiddle, loadFileInfos } = require('./tagger.js')



function getDataText(text_info, folderpath){
	if (!(!!text_info) || !(!!folderpath)) {
		console.error('Missing text_info or folderpath.')
		return
	}

	const dataFolderPath = `./${folderpath}/data/`

	const filepath = `${dataFolderPath}${text_info.textID}.txt`
	if (fs.existsSync(filepath)) {
		return fs.readFileSync(filepath, 'utf-8')
	}

	return null
}

function getTrainData(tokensByLines){
	let trainData = []

	for (const tokensByLine of tokensByLines) {
		const new_ngrams = NGrams.ngrams(tokensByLine, window_size, pad_start, null)
		trainData = trainData.concat(new_ngrams)
	}

	return trainData
}

function addDocument(classifier, trainData, addDocument_callback){
	const pad_start_token = pad_start.token
	const pad_end_token = pad_end.token

	for (const tokens of trainData) {
		if (tokens.length === window_size) {
			const middle = tokens[windowMiddle]
			const middle_token = middle.token || null
			const middle_entity = middle.entity || null
			if (
				!! middle_entity
				&& middle_entity !== ''
				&& middle_token !== null
				&& middle_token !== pad_start_token
				&& middle_token !== pad_end_token
			) {
				classifier.addDocument(
					tokens.map(token => token.token),
					middle_entity.toUpperCase()
				)
			}
		}
	}

	if (addDocument_callback) {
		addDocument_callback()
	}
}

function train(folderpath, language, train_callback){
	if (!(!!folderpath) || !(!!language) || !(!!train_callback)) {
		console.error('Missing folderpath or language or train_callback.')
		return
	}

	const classifier = new natural.BayesClassifier()

	const infos = loadFileInfos(folderpath)
	.filter(text_info => text_info.language === language)
	.slice(0, 1000)

	console.info('Loaded '+infos.length+' documents.')

	async.each(infos, (text_info, each_callback) => {
		const text = getDataText(text_info, folderpath)

		if (!!text) {
			const tokensByLines = getTokenByLine(text)
			const trainData = getTrainData(tokensByLines)
	
			addDocument(classifier, trainData, ()=>{
				each_callback()
			})
		}else{
			each_callback()
		}
	}, error => {
		console.info('Added documents.')

		const saveBatchSize = 10000

		classifier.events.on('trainedWithDocument', train_step_info => {
			console.info('At '+train_step_info.index+' of '+train_step_info.total+'.')

			if (train_step_info.index % saveBatchSize === 0) {
				saveModel(classifier, language, folderpath, ()=>{})
			}
		})

		console.info('Training...')
		classifier.train()
		console.info('Trained.')

		saveModel(classifier, language, folderpath, ()=>{
			train_callback()
		})
	})
}




/*
function loadClassifier(language, wrapperFolderPath){
	let classifier = null

	// if (!(!!language)) {
	// 	console.error('Missing language.')
	// 	return
	// }

	// const modelFolderPath = `./${wrapperFolderPath}/model/`

	// const filepath = `${modelFolderPath}${language}.json`

	// if (fs.existsSync(filepath)) {
	// 	const modelText = fs.readFileSync(filepath, 'utf-8')
	// 	classifier = natural.BayesClassifier.restore(JSON.parse(modelText))
	// }else{
		classifier = new natural.BayesClassifier()
	// }

	return classifier
}
*/

function saveModel(classifier, language, folderpath, callback) {
	if (!(!!classifier) || !(!!language) || !(!!folderpath)) {
		console.error('Missing classifier or language or folderpath.')
		return
	}

	const modelFolderPath = `./${folderpath}/models/`
	if (!fs.existsSync(modelFolderPath)) {
		shell.mkdir('-p', modelFolderPath)
	}

	const filepath = `${modelFolderPath}${language}.json`
	fs.writeFileSync(filepath, JSON.stringify(classifier))
	console.info('Saved model to '+filepath)

	if (callback) {
		callback()
	}
}



////////////////////////////////////////////////////////////////



const language = 'en'
const folderpath = 'wikinews'

train(folderpath, language, ()=>{
	console.log('DONE')
	process.exit()
})


