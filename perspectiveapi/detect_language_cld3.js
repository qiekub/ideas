// check if dependencies are installed before running

function detectLanguage(text) {
	return new Promise(async (resolve, reject) => {
		const cldFactory_loadModule = require('./node_modules/cld3-asm/dist/cjs/loadModule.js').loadModule
		const cldFactory = await cldFactory_loadModule()
		
		const identifier = cldFactory.create(0, 10000)

		// const result = identifier.findLanguage(text)
		// console.log(result)

		const frequentResult = identifier.findMostFrequentLanguages(text, 1)

		if (frequentResult.length === 0) {
			reject('unkown')
		}else{
			const result = frequentResult[0]
			if (
				result.language === 'und' // unkown
				|| result.probability === 0
				|| result.is_reliable === false
				|| result.proportion === 0
			) {
				reject('unkown')
			}else{
				resolve(result.language)
			}
		}
			
		identifier.dispose()
	})
}


let text;
text = 'ta gueule'
// text = 'This piece of Das ist ein ganz toller Tag hier in dem feinen deutschlnad Този текст е на Български.'
detectLanguage(text)
.then(lang_code => console.log(lang_code))
.catch(error => console.error(error))
