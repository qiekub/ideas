const Bert = require('bert-as-service')
const bert = new Bert('192.168.2.102:5556')
 
bert.vectorize(['Hello world'])
.then(embeddings => {
  console.log(embeddings)
})
.catch(error => console.error(error))