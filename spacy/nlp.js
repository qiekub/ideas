const spacy = require('spacy');
 
(async function() {
    const nlp = spacy.load('en_core_web_sm');
    const doc = await nlp('This is a text about Facebook.');
    for (let ent of doc.ents) {
        console.log(ent.text, ent.label);
    }
    for (let token of doc) {
        console.log(token.text, token.pos, token.head.text);
    }
})();