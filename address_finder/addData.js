const fs = require('fs')
const { getTokens, customTrim, removeClutter } = require('./functions.js')

function appendTokens(text, language, dataFolderPath) {
	if (!(!!text) || !(!!language)) {
		console.error('Missing text or language.')
		return
	}

	if (!(!!dataFolderPath)) {
		dataFolderPath = './data/'
	} else if (!dataFolderPath.endsWith('/')) {
		dataFolderPath += '/'
	}

	if (!fs.existsSync(dataFolderPath)) {
		fs.mkdirSync(dataFolderPath)
	}

	const tokensToAppend = text
	.split('\n')
	.map(line => 
		getTokens(line, language)
		.map(v => v.token)
		.join(' ')
	)

	const filepath = `${dataFolderPath}${language}.txt`
	fs.appendFileSync(filepath, '\n---\n'+tokensToAppend.join('\n'))
	console.info('Appended to '+filepath)
}



////////////////////////////////////////////////////////////////


const language = 'de'
let text = `
	wir bauen in 3 wochen 42 tolle Schlößer am rhein
	Bonn ist toll!
	Wo liegt Bonn?
	Wo liegt Berlin?
`
text = removeClutter(text)
appendTokens(text, language, null)





