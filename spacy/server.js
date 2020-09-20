/*

const spacyNLP = require('spacy-nlp')
const serverPromise = spacyNLP.server({ port: 96135 });

serverPromise
.then(()=>{
	const nlp = spacyNLP.nlp;
	 
	nlp.parse('Bob Brought the pizza to Alice.').then(output => {
		console.log(output);
		console.log(JSON.stringify(output[0].parse_tree, null, 2));
	});
})

// S 19
// P 16
// A 1
// C 3
// Y 25
//
// 19 16 1 3 25
// 19161 

*/


// const spacy = require('./node_modules/spacy/src/index.js')
const spacy = require('spacy')

const spacy_load = spacy.default.load

// console.log('spacy', spacy.default.load)

async function a() {
    const nlp = spacy_load('en_core_web_sm', 'http://spacy.qiekub.org')
    const doc = await nlp('This is a text about Facebook.')
    // for (let ent of doc.ents) {
    //     console.log(ent.text, ent.label)
    // }
    // for (let token of doc) {
    //     console.log(token.text, token.pos, token.head.text)
    // }
}

setTimeout(() => {
	a()
}, 1000)
