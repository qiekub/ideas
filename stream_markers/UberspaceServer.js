// const fs = require('fs')
const async = require('async')
const express = require('express')

// const { inspect } = require('util')

const getMongoDbContext = require('../getMongoDbContext.js')

const { delegateToSchema, mockServer } = require('apollo-server-express')
const { graphql } = require('graphql')
const executableSchema = require('./executableSchema.js')

const gqlServer = require('./server.js')
const app = gqlServer()
const port = 11692 // "api2" in english alphabet letter positions
const host = '192.168.2.102' // '0.0.0.0'
const urlpath = '/graphql/v1'

// const cacheFolderPath = './cache/'
// const cacheFilePath = cacheFolderPath+'cache.json'



// let cache = {} // TODO this should be done by ApolloServer

// if (!fs.existsSync(cacheFolderPath)) {
// 	fs.mkdirSync(cacheFolderPath)
// }
// if (fs.existsSync(cacheFilePath)) {
// 	fs.readFile(cacheFilePath, 'utf8', (error, data)=>{
// 		cache = JSON.parse(data)
// 	})
// }

// function getCacheKey(query, args, context){
// 	return inspect({query, args, context})
// }

// function loadMarkers(query, args, context, callback){
// 	graphql(executableSchema, query, null, context, args)
// 	.then(({data})=>{
// 		const markers_data = data.markers

// 		callback(markers_data)

// 		const cacheKey = getCacheKey(query, args, context)
// 		cache[cacheKey] = JSON.stringify(markers_data)
// 		fs.writeFile(cacheFilePath, JSON.stringify(cache), error=>{
// 			if (error) {
// 				console.error(error)
// 			}
// 		})
// 	})
// 	.catch(error=>console.error)
// }
// function getMarkers(query, args, context, callback){
// 	const cacheKey = getCacheKey(query, args, context)
// 	if (!!cache[cacheKey]) {
// 		callback(JSON.parse(cache[cacheKey]))
// 		loadMarkers(query, args, context, ()=>{
// 			// console.info('reloaded markers cache')
// 		})
// 	}else{
// 		loadMarkers(query, args, context, callback)
// 	}
// }

app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*'])
	res.append('Access-Control-Allow-Methods', '*')
	res.append('Access-Control-Allow-Headers', '*')
	next()
})

// app.get('/markers/', async (req, res) => {

// 	console.log('request')

// 	const query = `
// 		query($languages: [String]){
// 			markers{
// 				_id
// 				originalTypename
// 				name (languages: $languages){
// 					text
// 					language
// 				}
// 				lng
// 				lat
// 				preset
// 				status
// 				tags
// 			}
// 		}
// 	`
// 	const args = {
// 		languages: ['en','de'], // load all languages supported by the frontend
// 	}

// 	const context = {
// 		mongodb: await getMongoDbContext(),
// 		profileID: req.profileID,
// 	}

// 	getMarkers(query, args, context, marker_data=>{
// 		async.eachLimit(marker_data, 1, (marker, callback)=>{
// 			res.write(JSON.stringify(marker))
// 			callback()
// 		}, error=>{
// 			res.end()
// 		})
// 	})
// })

// app.use('/static', express.static(__dirname))

app.listen(port, host, () => {
	console.log(`App listening at http://${host}:${port}${urlpath}`)
})
