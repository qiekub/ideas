// api.giphy.com/v1/gifs/search
// 

const fs = require('fs')
const axios = require('axios')

const api_key = 'DLuCPGyW6pEgx7f6mY8uPHSZcsCLd9vs'

// // Optionally the request above could also be done as
// axios.get('http://api.giphy.com/v1/gifs/search', {
//     params: {
//     	api_key,
//     	q: 'Volt',
//     	limit: 1,
//     }
//   })
//   .then(function (response) {
//     console.log(JSON.stringify(response.data, null, 2));
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

const gif_data = fs.readFileSync('./queermap_test.gif', {
	encoding: 'binary',
})

/*
// Optionally the request above could also be done as
axios.post('https://upload.giphy.com/v1/upload?api_key='+api_key, JSON.stringify({
    api_key,
    username: 'thomasrosen',
    file: gif_data,
    // source_image_url: './queermap_test.gif',
    tags: 'qiekub, test',
    source_post_url: 'https://map.qiekub.org/',
  }), {
  headers: {
    // 'Content-Type': 'application/json',
    // 'Content-Length': data.length,
  	// 'Content-Type': 'application/json', // 'multipart/form-data',
  }
  })
  .then(function (response) {
    console.log(response);
    // console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(function (error) {
    console.log(error);
  })

*/




const https = require('https')

const data = JSON.stringify({
    api_key: api_key,
    username: 'thomasrosen',
    // file: gif_data,
    source_image_url: 'https://images.squarespace-cdn.com/content/v1/5a52d1f2edaed8620f2aa1b5/1516380290302-NG05QGZYYOSLNIL8WLO7/ke17ZwdGBToddI8pDm48kATsp3JsZdmbPTNem4KYYE5Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIoNoOd3eUTp9p0QLYabKGbytQWpvtnq4ZfRnpAM3elUY/iwannagobed.gif?format=1500w%5C',
    tags: 'qiekub, test',
    source_post_url: 'https://map.qiekub.org/',
  })

// let searchParams = new URLSearchParams()
// searchParams.set('api_key', api_key)

let options = {
  // url: 'https://upload.giphy.com/v1/gifs?api_key='+api_key,
  hostname: 'upload.giphy.com',
  port: 443,
  path: '/v1/gifs',
  method: 'POST',
  // searchParams: searchParams,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

                //   https://upload.giphy.com/v1/upload?api_key=
options = new URL('https://upload.giphy.com/v1/gifs')
options.searchParams.set('api_key', api_key)
// options.searchParams.set('source_image_url', 'https://images.squarespace-cdn.com/content/v1/5a52d1f2edaed8620f2aa1b5/1516380290302-NG05QGZYYOSLNIL8WLO7/ke17ZwdGBToddI8pDm48kATsp3JsZdmbPTNem4KYYE5Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIoNoOd3eUTp9p0QLYabKGbytQWpvtnq4ZfRnpAM3elUY/iwannagobed.gif?format=1500w%5C')
// options.searchParams.set('username', 'thomasrosen')
// options.searchParams.set('api_key', api_key)
// options.searchParams.set('api_key', api_key)

console.log('options', options+'')

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()



