const spacyNLP = require("spacy-nlp");
const nlp = spacyNLP.nlp;

async function a(){
	console.log('a')
// Note you can pass multiple sentences concat in one string.
nlp.parse("Bob Brought the pizza to Alice.").then(output => {
  console.log(output);
  console.log(JSON.stringify(output[0].parse_tree, null, 2));
});
 
// Store output into variable
const result = await nlp.parse("Bob Brought the pizza to Alice.");
console.log(result)
}

a()