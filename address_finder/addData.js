const fs = require('fs')
const { getTokens, customTrim, removeClutter, text2tokens, appendTokens } = require('./tagger.js')

const language = 'de'
// let text = `
// 	wir bauen in 3 wochen 42 tolle Schlößer am rhein
// 	Bonn ist toll!
// 	Wo liegt Bonn?
// 	Wo liegt Berlin?
// `
let text = 'Der Drachenfels ist super!'
text = removeClutter(text)
text = text2tokens(text)
appendTokens(text, language, null)


