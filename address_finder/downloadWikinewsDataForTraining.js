const fs = require('fs')
const async = require('async')
const { parseURL } = require('./parseURL.js')
const { removeClutter, getTokens, customTrim, createTokenFile, loadFileInfos, saveFileInfos } = require('./tagger.js')

const striptags = require('striptags')

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const virtualConsole = new jsdom.VirtualConsole() // use VirtualConsole to hide parsing errors


function getTrainDataFromWiki(text, language){

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

		return node.textContent
		.split('\n')
		.map(line => {
			line = removeClutter(line)

			let tokens = getTokens(line, language)
			.map(token => token.token)

			if (tokens.length < 2) {
				return false
			}

			if (tag !== '') {
				tokens = tokens.map(token => token+'/'+tag)
			}

			return tokens.join(' ')
		})
		.filter(Boolean)
		.join('\n')
	})
	.filter(Boolean)
	.join(' ')

	return text
}

function downloadStep(url, folderpath, callback) {
	parseURL(url)
	.then(metadata => {
		let newInfo = null

		const language = metadata.language

		if (!!language && metadata.siteName === 'Wikimedia Foundation, Inc.') {
			const train_data = getTrainDataFromWiki(metadata['content:html'], language)
			const textID = createTokenFile(train_data, folderpath)
			if (textID) {
				newInfo = {
					textID,
					language,
					url: metadata.url,
				}
			}
		}else{
			console.error('ERROR: Site is not "Wikimedia Foundation, Inc.".')
		}

		callback(newInfo)
	})
	.catch(error => {
		console.error(error)
		callback(null)
	})
}


const folderpath = 'wikinews'
const howOften = 10
const batchSize = 10
let url = 'https://en.wikinews.org/wiki/Special:Random'
// url = 'https://en.wikinews.org/wiki/Germany_says_Alexei_Navalny_poisoned_with_Novichok'

let startedCounter = 0
let finishedCounter = 0

const infos = loadFileInfos(folderpath)

async.eachLimit(Array(howOften).fill(0), batchSize, (nothing, callback) => {
	startedCounter += 1
	console.log('Starting '+startedCounter+' of '+howOften)

	downloadStep(url, folderpath, newInfo=>{
		if (newInfo) {
			infos.push(newInfo)
		}
		finishedCounter += 1
		console.log('Finished '+finishedCounter+' of '+howOften)

		if (finishedCounter % batchSize === 0) {
			saveFileInfos(infos, folderpath, ()=>{
				callback()
			})
		}else{
			callback()
		}
	})
}, error => {
	saveFileInfos(infos, folderpath, ()=>{
		console.log('DONE')
		process.exit()
	})
})


