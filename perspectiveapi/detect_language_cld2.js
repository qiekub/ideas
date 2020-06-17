// check if dependencies are installed before running

const cld = require('cld')

let text;
text = 'Du bist ein toller Mensch!'
text = 'You are really bad!'
// text = '347348764587'

cld.detect(text)
.then(result => {
  console.log(JSON.stringify(result,null,4))
})
.catch(error => console.error(error))