


frontend
	- written in expo/react-native/javascript
	- screens/pages
		- map
			- search
				- center map at first result
			- place-markers
			- filtering by "tags", "this_is_a_place_for" and age-range
		- place-info
		- add a new place
		- contact
		- imprint + privacy-policy
		- cost vs donations overview to get people to donate
	- on every page
		- share buttons
		- language-chooser

backend
	- graphql-api
		- geocoder
		- get all places in a specific area
		- get full infos of a place
		- add a new place / add an update-proposal
	- database








——————————————————————————————————————————

add / update-proposal {
	existing_id: ID,
	data_of_a_place: {},
}

data of a place {
	"name": "Anyway",
	"lat": 50.9419,
	"lng": 6.9380,
	"address": "Kamekestr. 14, 50672 Köln, Germany",
	"min_age": 14,
	"max_age": 27,
	"website": "http://www.anyway-koeln.de/",
	"this_is_a_place_for": ["queer", "undecided", "hetero-friends"],
	"tags": ["youthcenter", "cafe", "bar"]
}

https://github.com/thomasrosen/queer-centers









✅ geocoder
❓ get all places in a specific area
❓ get full infos of a place
❓ add a new place / add an update-proposal












https://nominatim.openstreetmap.org/search?q=Bonn,%20Germany&format=json&limit=1&addressdetails=0&extratags=0&namedetails=0

https://api.opencagedata.com/geocode/v1/json?key=8a904b5af9c3455fadc6360ad48ac99b&pretty=0&no_annotations=1&limit=1&no_record=1&q=Bonn,%20Germany

https://eu1.locationiq.com/v1/search.php?key=66291d9b656090&limit=1&format=json&q=Bonn,%20Germany













——————————————————————————————————————————



https://developers.google.com/places/supported_types
https://wiki.openstreetmap.org/wiki/Map_Features

https://wiki.openstreetmap.org/wiki/Tag:building%3Dcivic

building=civic

amenity=community_centre
amenity=library
amenity=pub;bar;




——————————————————————————————————————————

https://wiki.openstreetmap.org/wiki/Key:lgbtq
https://wiki.openstreetmap.org/wiki/Key:gay
https://wiki.openstreetmap.org/wiki/OpenQueerMap


http://overpass-turbo.eu/
https://wiki.openstreetmap.org/wiki/Overpass_API
https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL

https://overpass-api.de/api/interpreter?data=[bbox:50.6,7.0,50.8,7.3][out:json][timeout:25];(node[~"^community_centre.*$"~"(lgbt|homosexual|gay)"];node[~"^lgbtq.*$"~"."];node[~"^gay.*$"~"."];node[~"^fetish.*$"~"."];);out;

	[bbox:90,-180,-90,180]

	// [bbox:50.6,7.0,50.8,7.3][out:json][timeout:25];(node[~"."~"lgbt"];node[~"^community_centre.*$"~"(lgbt|homosexual|gay)"];node[~"^lgbtq.*$"~"."];node[~"^gay.*$"~"."];node[~"^fetish.*$"~"."];);out;
	// ----------
	[bbox:50.6,7.0,50.8,7.3]
	[out:json]
	[timeout:25]
	;
	(
		node[~"."~"lgbt"];
		node[~"^community_centre.*$"~"(lgbt|homosexual|gay)"];
		node[~"^lgbtq.*$"~"."];
		node[~"^gay.*$"~"."];
		node[~"^fetish.*$"~"."];
	);
	out;



	// [bbox:50.6,7.0,50.8,7.3][out:json][timeout:25];(node[~"^community_centre.*$"~"(lgbt|homosexual|gay)"];node[~"^lgbtq.*$"~"."];node[~"^gay.*$"~"."];node[~"^fetish.*$"~"."];);out;
	// ----------
	[bbox:50.6,7.0,50.8,7.3]
	[out:json]
	[timeout:25]
	;
	(
		node[~"^community_centre.*$"~"(lgbt|homosexual|gay)"];
		node[~"^lgbtq.*$"~"."];
		node[~"^gay.*$"~"."];
		node[~"^fetish.*$"~"."];
	);
	out;







——————————————————————————————————————————






Place Filters

What?
(  ) Community Centers (Community Centres, Social Facilities)
(  ) Going Out (Bars, Pubs, Nightclubs, …)
(  ) Culture (Museums, Theatres, Historical, Libraries)
(  ) Eating (Cafes, Restaurants)
(  ) Tourism (Hotels, …)
————————————————————————————
(  ) Everything

For whom?
(  ) Only for Trans
(  ) Only for Women
(  ) Only for Men
————————————————————————————
(  ) For all Queers

For whom?
(  ) Women  [Only | Primary]
(  ) Men    [Only | Primary]
————————————————————————————
(  ) For all Queers

More
(  ) For Age Range
	[Min] bis [Max]
	(Only showing places with a known age range.)
(  ) Wheelchair Support


——————————————————————————————————————————

What {
	presets: []
}

For whom?
Only for Women [
	{tags: {gay:"women"}},
	{tags: {"gay:women":"only"}},
	{tags: {"lgbtq:women":"only"}},
}

For Age Range {
	tags: {
		min_age: {$gte: 1234567}, // gte = Matches values that are greater than or equal to a specified value.
		max_age: {$lte: 1234567}, // lte = Matches values that are less than or equal to a specified value.
	},
}

——————————————————————————————————————————


[or
	{and}
]

and: {
	presets: [],
	tags: {
		min_age: {$gte: 1234567}, // gte = Matches values that are greater than or equal to a specified value.
		max_age: {$lte: 1234567}, // lte = Matches values that are less than or equal to a specified value.
	},
}


or: [{and}, {and}]













——————————————————————————————————————————








# What to show?



## What is this?
- Place Type
- Name

## Can I go there?
- Age Range
- Wheelchair support
- Targetgroup (It's only for specific people)
- (Oppening Hours)
- (How can I get there?)

## Want I go there?
- Groups / Events / Campains / Equipment (Games, ...) (What can you do here?)
- Do I know people there? / Will I meet people there?

## Where can I get more info?
- Contact options
- Website
- OpenStreetMap
- Facebook, ...





——————————————————————————————————————————


## Wheelchair support
{
	question: 'Can wheelchair users access this place on their own?',
	answers: [
		{
			name: 'Yes',
			tags: {
				wheelchair: 'yes',
			},
		}
	]
}





## I want to highlight places for young people!
- Is this place good for teenagers?
- Can you go here when your under 18?
























——————————————————————————————————————————



## How to compile a place from answers
- get the 4 latest answers for a specfic place and a question
- get the answer with the highest amount of votes or the latest answer-date
- get the tags of that answer
- overwrite the old place data with these tags





```js
	db.getCollection('Answers').aggregate([
		// START get answers
		/*{$match:{
			"properties.forID": ObjectId("5e743d99d083985272c9bf99"),
		}},*/
		{$sort:{
			"metadata.lastModified": -1
		}},
		{$group:{
			_id: {$concat:[
				{$toString:"$properties.forID"},
				"_",
				{$toString:"$properties.questionID"},
			]},
			docs: {$push:"$$ROOT"},
		}},
		{$project:{
			docs: {$slice:["$docs",0,10]}
		}},
		{$unwind:"$docs"},
		{$replaceRoot:{newRoot:"$docs"}},
		// END get answers
		
		
		// START group answers
		{$group:{
			_id: {$concat:[
				{$toString:"$properties.forID"},
				"_",
				{$toString:"$properties.questionID"},
				"_",
				{$toString:"$properties.answer"}
			]},
			forID: { $first: "$properties.forID" },
			questionID: { $first: "$properties.questionID" },
			answer: { $first: "$properties.answer" },
			count: { $sum: 1 },
		}},
		{$sort:{
			count: -1,
			_id: 1,
		}},
		{$group:{
			_id: {$concat:[
				{$toString:"$forID"},
				"_",
				{$toString:"$questionID"},
			]},
			forID: { $first: "$forID" },
			questionID: { $first: "$questionID" },
			answer: { $first: "$answer" },
			this_answer_count: { $first: "$count" },
			all_answers_count: { $sum: "$count" },
		}},
		{$addFields:{
			confidence: {$divide:["$this_answer_count",{$max:[10,"$all_answers_count"]}]}
		}},
		// END group answers
		
		
		// START compile tags
		{$lookup:{
			from: "Questions",
			localField: "questionID",
			foreignField: "_id",
			as: "question_doc"
		}},
		{$addFields:{
			question_doc: {$arrayElemAt:["$question_doc",0]}
		}},
		{$addFields:{
			// condition: {$ifNull:["$question_doc.properties.condition",null]},
			// question_doc: null,
			tags: {$arrayElemAt:[{ "$setDifference": [
				{ "$map": {
					"input": "$question_doc.properties.possibleAnswers",
					"as": "a",
					"in": { "$cond": [
						{$eq:["$$a.key","$answer"]},
						"$$a.tags",
						false
					]}
				}},
				[false]
			]},0]},
		}},
		// END compile tags
		
		
		// START seperate confidences
		{$addFields:{
			confidences: {$arrayToObject:{$map:{
				input: {$objectToArray:"$tags"},
				as: "a",
				in: {k:"$$a.k",v:"$confidence"}
			}}},
		}},
		// END seperate confidences
		
		
		// START combine tags by forID
		{$sort:{
			confidence: 1,
			_id: 1,
		}},
		{$group:{
			_id: "$forID",
			tags: {$mergeObjects:"$tags"},
			confidences: {$mergeObjects:"$confidences"},
		}},
		// END combine tags by forID
		
		// START for the eye
		{$sort:{
			_id: 1
		}},
	])
```























```js
const __last_n_answers__ = 10
db.getCollection('Answers').aggregate([
    // START get answers
    /*{$match:{
        "properties.forID": ObjectId("5e743d99d083985272c9bfd3"),
    }},*/
    {$sort:{
        "metadata.lastModified": -1
    }},
    {$set:{
        "properties.answer": { $objectToArray: "$properties.answer" },
    }},
    {$unwind: "$properties.answer"},
    {$group:{
        _id: {$concat:[
            {$toString:"$properties.forID"},
            "_",
            {$toString:"$properties.questionID"},
            "_",
            {$toString:"$properties.answer.k"},
        ]},
        docs: {$push:"$$ROOT"},
    }},
    {$set:{
        docs: {$slice:["$docs",0,__last_n_answers__]}
    }},
    {$set:{
        all_answers_count: {$size:"$docs"}
    }},
    {$unwind:"$docs"},
    // END get answers
    
    
    // START group answers
    {$set:{
        "forID": "$docs.properties.forID",
        "questionID": "$docs.properties.questionID",
        "answer": "$docs.properties.answer",
    }},
    {$set:{
         "value_as_string": {$switch:{
            branches: [
                {case: {$eq:[{$type:"$answer.v"},"string"]}, then: "$answer.v"},
            ],
            default: ""
         }},
    }},
    {$group: {
        _id: {$concat:[
            {$toString:"$forID"},
            "_",
            {$toString:"$questionID"},
            "_",
            {$toString:"$answer.k"},
            "_",
            {$toString:"$value_as_string"},
        ]},
        
        forID: { $first: "$forID" },
        questionID: { $first: "$questionID" },
        answer: { $first: "$answer" },
        // value_as_string: { $first: "$value_as_string" },
        
        all_answers_count: { $first: "$all_answers_count" },
        this_answer_count: { $sum: 1 },
    }},
    {$sort:{
        all_answers_count: -1,
        this_answer_count: -1,
        _id: 1,
    }},
    {$group: {
        _id: {$concat:[
            {$toString:"$forID"},
            "_",
            {$toString:"$questionID"},
            "_",
            {$toString:"$answer.k"},
        ]},
        
        forID: { $first: "$forID" },
        questionID: { $first: "$questionID" },
        answer: { $first: "$answer" },
        // value_as_string: { $first: "$value_as_string" },
        
        all_answers_count: { $first: "$all_answers_count" },
        this_answer_count: { $first: "$this_answer_count" },
    }},
    {$set:{
        confidence: {$divide:["$this_answer_count",{$max:[__last_n_answers__,"$all_answers_count"]}]}
    }},
    // END group answers
    
    
    // START compile tags
    {$lookup:{
        from: "Questions",
        localField: "questionID",
        foreignField: "_id",
        as: "question_doc"
    }},
    {$set:{
        question_doc: {$arrayElemAt:["$question_doc",0]}
    }},
    {$set:{
        // question_doc: null,
        tags: {$arrayElemAt:[{ "$setDifference": [
            { "$map": {
                "input": "$question_doc.properties.possibleAnswers",
                "as": "a",
                "in": { "$cond": {
                    if: {$eq:["$$a.key","$answer.k"]},
                    then: { "$cond": {
                        if: {$eq:["$answer.v",true]},
                        then: "$$a.tags",
                        else: {$arrayToObject:{$map:{
                            input: {$objectToArray:"$$a.tags"},
                            as: "a",
                            in: {k:"$$a.k",v: {$switch:{
                                    branches: [
                                        {case: {$and:[
                                            {$eq:[{$type:"$answer.v"},"bool"]},
                                            {$eq:["$answer.v",true]},
                                        ]}, then: "$$a.tags"},

                                        {case: {$eq:[{$type:"$answer.v"},"double"]}, then: "$answer.v"},
                                        {case: {$eq:[{$type:"$answer.v"},"string"]}, then: "$answer.v"},
                                        {case: {$eq:[{$type:"$answer.v"},"int"]}, then: "$answer.v"},
                                        {case: {$eq:[{$type:"$answer.v"},"long"]}, then: "$answer.v"},

                                        // {case: {$eq:[{$type:"$answer.v"},"object"]}, then: {
                                        //     $arrayToObject:{$map:{
                                        //         input: {$objectToArray:"$$a.tags"},
                                        //         as: "a",
                                        //         in: {k:"$$a.k",v:"$$a.v"}
                                        //     }}}
                                        // },
                                    ],
                                    default: false
                                }},
                           }
                        }}},
                    }},
                    else: false
                 }}
            }},
            [false]
        ]},0]},
    }},
    
    {$project:{
        question_doc: false
    }},
    // END compile tags
    
    
    // START seperate confidences
    {$set:{
        confidences: {$arrayToObject:{$map:{
            input: {$objectToArray:"$tags"},
            as: "a",
            in: {k:"$$a.k",v:"$confidence"}
        }}},
    }},
    // END seperate confidences
    
    
    // START combine tags by forID
    {$sort:{
        confidence: 1,
        _id: 1,
    }},
    {$group:{
        _id: "$forID",
        tags: {$mergeObjects:"$tags"},
        confidences: {$mergeObjects:"$confidences"},
    }},
    // END combine tags by forID
    
    // START for the eye
    {$sort:{
        _id: 1
    }},
])
```




















——————————————————————————————————————————



Suggest a question!

What would you want to know?
Which information are we missing?
Which information is missing?
What's missing?





——————————————————————————————————————————







https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?types=country&limit=1&access_token=



https://ilga.org/maps-sexual-orientation-laws
https://ilga.org/trans-legal-mapping-report
https://de.wikipedia.org/wiki/Liste_von_L%C3%A4ndern_nach_pers%C3%B6nlicher_Freiheit#Liste


### Information about all countries in JSON:
https://restcountries.eu/rest/v2/all



——————————————————————————————————————————





Hi Marena,

These are great news!
Thanks for your support and trust in this project!

All data presented is already public (It's currently just from OSM).
I want to add tools to add and edit places. These will be restricted to countries/regions where being queer is legal. I'm probably gonna use a hardcoded list of legal-countries from ilga.org and Forward-Geocoding / the Search-Api to check for legalities. The collected data will be public and regularly published to OSM.

Of course, I'll mention your support on the website. Just give me a day or two to update it.

I currently don't have a useful visitors count. But you can look at usage statistics of the "petacat" account. I used it for the maptiles last month.
From now on, I'll use "qiekub", so everything is named the same.

Best wishes and thanks again,
Thomas









——————————————————————————————————————————

## Links to use wikidata infos:

https://www.npmjs.com/package/wikidata-sdk
https://github.com/maxlath/wikibase-sdk/blob/HEAD/docs/get_entities.md#by-ids











——————————————————————————————————————————

## Accuracy of latitude and longitude?
https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
(Just so this is saved somewhere!)

——————————————————————————————————————————









Donations link for every place











——————————————————————————————————————————






# How to match places from different sources.

If possible, use the following list to find a matching place.
The place with the highest score is the best match.

### unique ids that can change very frequently but stay the same if nothing changed (unique!)
(score: ∞)
- osm-id

### unique references that won't changed (unique!)
(score: 6)
- wikidata
- iata
- icao
- ref:??? (not "ref", but: ref:whc, ref:isil, ref:dhis2, ref:vatin, ref:wmo, ref:wigos, ref:bag, ref:bufa, ...)
- fhrs:id (UK Food Hygiene Rating Scheme)

### geo information that change seldom
(score: 5)
- Lng+Lat match up to the sixs decimal place
- full addr:??? match

### urls that change rarely and are mostly unique (not neccessarly unique!)
(score: 4)
- wikipedia

- website
- facebook
- twitter

- phonenumber
- email
- contact:???

### properties that can change but identify a place (not neccessarly unique!)
(score: 3)
- official_name
- long_name
- name
- short_name
- alt_name

### vague properties that can eventually identify (not neccessarly unique!)
(score: 2)
- wikimedia_commons
- mapillary
- flickr
- url

- int_ref // international
- nat_ref // national
- reg_ref // regional
- loc_ref // local

- icn_ref // international cycle route
- ncn_ref // national cycle route
- rcn_ref // regional cycle route
- lcn_ref // local cycle route

### properties that identify a group of places (not unique but can narrow it down in combination!)
(score: 1)
- ???:wikidata (operator:wikidata, network:wikidata, brand:wikidata, architect:wikidata, artist:wikidata, species:wikidata, subject:wikidata, name:etymology:wikidata, flag:wikidata, ...)
- operator
- network
- brand
- architect
- artist
- species
- subject
- name:etymology
- flag
- cycle_network

### any other properties
- ???



https://wiki.openstreetmap.org/wiki/Permanent_ID
https://wiki.openstreetmap.org/wiki/Category:World_wide_external_reference_tag
https://wiki.openstreetmap.org/wiki/Key:iata
https://wiki.openstreetmap.org/wiki/Key:wikidata
https://wiki.openstreetmap.org/wiki/Key:ref

https://w.wiki/GbF
https://w.wiki/GbF redirects to: https://query.wikidata.org/embed.html#SELECT%20%3Fitem%20%3FOSM_key%20%3Fformatter_URL%20WHERE%20%7B%0A%20%20%7B%20%3Fitem%20wdt%3AP1282%20%3FOSM_key.%20%7D%0A%20%20FILTER(STRSTARTS(%3FOSM_key%2C%20'Key%3A'))%20.%0A%20%20FILTER(%3FOSM_key%20NOT%20IN%20('Key%3Aimage'%2C%20'Key%3Aurl'%2C%20'Key%3Awebsite'%2C%20'Key%3Awikidata'%2C%20'Key%3Awikimedia_commons'))%20.%0A%0A%20%20%7B%0A%20%20%20%20%7B%20%3Fitem%20wdt%3AP1630%20%3Fformatter_URL.%20%7D%0A%20%20%20%20UNION%0A%20%20%20%20%7B%20%3Fitem%20wdt%3AP3303%20%3Fformatter_URL.%20%7D%0A%20%20%7D%0A%7D%0A











```js
	db.getCollection('OsmCache').aggregate([
	    {$match:{
	        $or: [
	            {'properties.osmID':"node/76609838"},
	            {'properties.tags.wikidata':"Q7736161"},
	            {"properties.tags.ref:isil": "NL-0800070000"},
	            {"properties.tags.fhrs:id": "319575"},
	            {'properties.tags.website':"http://www.viaductleeds.com/"},
	            {'properties.tags.phone':"+31 20 523 0900"},
	            {'properties.tags.contact:facebook':"https://www.facebook.com/viaductshowbar/"},
	            {'properties.tags.contact:twitter':"https://twitter.com/ViaductShowBar"},
	            {'properties.tags.contact:youtube':"https://www.youtube.com/user/IHLIA"},
	            {'properties.tags.name':"Schwulenberatung Berlin"},
	            {
	                "properties.tags.addr:housenumber" : "7",
	                "properties.tags.addr:postcode" : "WC2N 4JF",
	                "properties.tags.addr:street" : "Duncannon Street",
	            },
	            {
	                "properties.geometry.location.lng": {
	                    $gt: -2.967460,
	                    $lt: -2.967458
	                },
	                "properties.geometry.location.lat": {
	                    $gt: 56.462151,
	                    $lt: 56.462153
	                },
	            },
	        ]
	    }}
	])
```






```js
	db.getCollection('OsmCache').aggregate([
	    {$addFields:{score:0}},
	    {$addFields:{
	        score: {
	            $add: [
	                "$score",
	                {$cond:{
	                    if: {
	                        $and: [
	                            {$eq:["$properties.osmID","node/937535734"]},
	                        ]
	                    },
	                    then: Infinity,
	                    else: 0
	                }}
	            ]
	        }
	    }},
	    {$addFields:{
	        score: {
	            $add: [
	                "$score",
	                {$cond:{
	                    if: {
	                        $and: [
	                            {$gt: ["$properties.geometry.location.lng", 6.9380895]},
	                            {$lt: ["$properties.geometry.location.lng", 6.9380915000000005]},
	                            {$gt: ["$properties.geometry.location.lat", 50.9419595]},
	                            {$lt: ["$properties.geometry.location.lat", 50.9419615]},
	                        ]
	                    },
	                    then: 1,
	                    else: 0
	                }}
	            ]
	        }
	    }},
	    {$match:{
	        score: {$gt:0}
	    }},
	    {$sort:{
	        score: -1
	    }}
	])
```
















——————————————————————————————————————————




# query changes of queer places

https://overpass-turbo.eu/
https://overpass-api.de/api/status

	[out:json][timeout:240][bbox:50.94185334042605,6.937584578990935,50.94250824312336,6.938645392656326]; // world
	(  
	  // node[~"."~"lgbt"];
	  node[~"^community_centre.*$"~"(lgbt|homosexual|gay)"];
	  (node[~"^lgbtq.*$"~"."]; - node[~"^lgbtq.*$"~"(welcome|no)"];);
	  (node[~"^gay.*$"~"."]; - node[~"^gay.*$"~"(welcome|no)"];);
	  (node[~"^fetish.*$"~"."]; - node[~"^fetish.*$"~"(welcome|no)"];);
	);
	out qt;
	// out;
	// out meta;


	[bbox:-84.92832092949963,-180,89.80838338696837,180][out:json][timeout:240];(node[~"^community_centre.*$"~"(lgbt|homosexual|gay)"](newer:"2020-04-20T16:43:16Z");(node[~"^lgbtq.*$"~"."](newer:"2020-04-20T16:43:16Z");-node[~"^lgbtq.*$"~"(welcome|no)"];);(node[~"^gay.*$"~"."](newer:"2020-04-20T16:43:16Z");-node[~"^gay.*$"~"(welcome|no)"];);(node[~"^fetish.*$"~"."](newer:"2020-04-20T16:43:16Z");-node[~"^fetish.*$"~"(welcome|no)"];););out qt;





——————————————————————————————————————————




# TODO 2020.04.23 00:29
* ✅ Geschindigkeit von Overpass-Query vergleichen (mit welcome|no VS ohne) -> ohne ist zirka ein drittel schneller.
* ✅ OSM Orte zu Antworten umwandeln
* ✅ OSM Antworten in die Datenbank speichern
* Quellen-Angaben besser abspeichern (Datensatz Info bei jeder Antwort.)
* Bei generieren der Orte die Quellen-Angaben-IDs und die Antwort-IDs dazuspeichern.
* Parser
* Fragen hinzufügen
	- Adresse
* Should the answers really be saved as single answer or a compined changeset?








——————————————————————————————————————————


```json

"osmID" : "node/268917395",
"tags": {
	"provided_for:homosexual" : "yes",
	"fax" : "+49 233 690 98",
	"health_facility:type" : "counselling_centre",
}

"osmID" : "node/289829475",
"tags" : {
	"fhrs:authority" : "Lambeth",
	"fhrs:id" : "483951",
	"fhrs:inspectiondate" : "2009-05-22",
	"fhrs:rating" : "5",
}

```











——————————————————————————————————————————










## Impressums Generatoren

https://www.juraforum.de/impressum-generator/



## Datenschutz Generatoren

https://datenschutz-generator.de/











——————————————————————————————————————————













# Search Autocomplete

https://api.mapbox.com/geocoding/v5/mapbox.places/Bonn.json?autocomplete=true&limit=5&language=de&access_token=












——————————————————————————————————————————






# Email


Hi Nicki,

I finally found time to answer! 😅


## Datasets:
I already knew about adding GeoJSON in leaflet and mapbox-gl. Or to directly add data in the studio.
I'm thinking more about merging datasets into my database so the infos displayed use multiple soures. (Of course with attribution and just if it's legally possible.)

I think I found a way that works okay and can be expanded for other datasets.
I'll add new place infos from other datasets as changesets. But before adding try to find out if the place is already in the db by comparing the information. (You can find my basic probably not helpful notes here: https://github.com/qiekub/ideas/blob/master/notes.md#how-to-match-places-from-different-sources)


## Map localization:
I've read through your information. It's probably the best to switch from leaflet to mapbox-gl.
As I currently want to add more urgent features first (spam-prevention, search, getting more help, ...), I opened an issue on GitHub to track ideas for the map-translation. (https://github.com/qiekub/map/issues/7)


## Spam prevention:
I thought about recaptcha but aren't sure about sending data to Google. The GDPR implications are pretty huge. And more important, I want to prevent forced outings through social media addvertisements.

I didn't know about retext. 😃 As of my understanding, it's mainly created for English. But I like that it doens't rely on a third-party-service like https://perspectiveapi.com/

As a start, I save a cookie to just use the latest submission from each user. And overall just the most entered information. So changing an information takes more time and user/devices. (Yes, I know how weak of a protection this is. 🙈)

I've created an issue to track ideas on spam prevention. (https://github.com/qiekub/map/issues/8)


## Further development:
Of course I'm gonna develop as much as I can. **My mind has way to many ideas!!! 🥳**
But to keep the project going, I need more people and probably funding sometime in future. Both aren't huge problems but any suggestions are welcome. (I guess I should mention that I'm not asking Mapbox for funding.)


Best,
Thomas




# WhatsApp


Hi Nicki, it Thomas 👋

Hope your doing well!


I had to deal with a few personal issues last week but I finally wrote you answer per email.

Adding places should now work as expected on desktop browsers. I'm adding features as I can amke time for it.

I'm currently talking with people in the german LGBTQ-community to resolve the most urgent problems before promoting the map and to get more developers.
The current feedback is overwhelming!!! 🥳




——————————————————————————————————————————







































# Who is welcome at a place?







https://wiki.openstreetmap.org/wiki/Key:lgbtq
https://wiki.openstreetmap.org/wiki/Key:gay
https://wiki.openstreetmap.org/wiki/Key:community_centre:for
https://wiki.openstreetmap.org/wiki/Proposed_features/Visitors_orientation
https://wiki.openstreetmap.org/wiki/MapBeks


## Keys

The key `lgbtq:primary` already exist and is in wide use. The new sub-keys are there to clarify this key.

lgbtq:primary = yes / no

lgbtq:primary:for = ...
lgbtq:only:for = ...
lgbtq:welcomes = ...
lgbtq:rejects = ...


## Values

- queer / all_queer / yes
- bpoc (black and people of color)

- women
- men

- gay
- lesbian
- bi
- pan
- trans
- cis
- inter
- non_binary
- genderfluid
- ace
- ...

- twinks
- bears

- homosexual (would include gay and lesbian)





primary
majority
only
welcome
friendly
no
yes
gay_and_friends







# mongodb query to get all queer related tags:

```js
	db.getCollection('CompiledPlaces').aggregate([
	    {$project:{tags:{$objectToArray:"$properties.tags"}}},
	    {$unwind:"$tags"},
	    {$match:{
	        "tags.k": {$not:{$in:[
	            "website",
	            "contact:website",
	            "facebook",
	            "description",
	            "contact:email",
	            "brand",
	            "min_age",
	            "osm_id",
	            "operator",
	            "wikipedia",
	            "twitter",
	            "preset",
	            "opening_hours:url",
	            "official_name",
	            "name",
	            "note",
	            "contact:facebook",
	            "email",
	            "instagram",
	            "contact:instagram",
	            "contact:linkedin",
	            "contact:twitter",
	        ]}},
	    }},
	    {$sort:{"tag.k":-1}},
	    
	    {$project:{
	        key: "$tags.k",
	        value: "$tags.v",
	        tag: {$concat: ["$tags.k", " = ", { $convert: { input: "$tags.v", to: "string" } } ]}
	    }},
	    
	    {$addFields: { is_queer: { $regexMatch: { input: "$tag", regex: /lgbt|trans|lesbian|gay|fetish/ }  } } },
	    {$match:{is_queer:true}},
	    {$group:{
	        _id:"$tag",
	        key:{$first:"$key"},
	        value:{$first:"$value"},
	        count:{$sum:1},
	    }},
	    {$addFields: {
	        _id: {$concat: ["(", { $convert: { input: "$count", to: "string" } }, ")     ", "$_id"]}
	    }},
	    {$sort:{count:-1,key:1,value:1}},
	    {$group:{
	        _id:null,
	        tags:{$push:"$_id"},
	    }},
	])
```

## Result

```json
	{
	    "_id" : null,
	    "tags" : [ 
	        "(563)     lgbtq = primary", 
	        "(460)     gay = yes", 
	        "(94)     gay = welcome", 
	        "(54)     gay:men = only", 
	        "(52)     gay:men = yes", 
	        "(43)     lgbtq = welcome", 
	        "(30)     community_centre:for = lgbtq", 
	        "(23)     gay:women = yes", 
	        "(23)     lgbtq = yes", 
	        "(17)     lgbtq:men = primary", 
	        "(13)     lgbtq:men = only", 
	        "(11)     gay:transgender = yes", 
	        "(9)     lgbtq:cruising = yes", 
	        "(8)     lgbtq:women = primary", 
	        "(7)     audience = gay", 
	        "(7)     gay = only", 
	        "(6)     lgbtq:male = primary", 
	        "(5)     gay = men", 
	        "(4)     gay:women = only", 
	        "(4)     lgbtq = only", 
	        "(4)     lgbtq:bears = primary", 
	        "(4)     lgbtq:bears = yes", 
	        "(3)     gay = majority", 
	        "(3)     gay:women = welcome", 
	        "(2)     lgbtq = friendly", 
	        "(2)     lgbtq:female = primary", 
	        "(2)     type = gay", 
	        "(1)     audience = gay_and_friends", 
	        "(1)     club = gay", 
	        "(1)     club = lgbtq", 
	        "(1)     community_centre = youth_centre;lgbtq", 
	        "(1)     community_centre:for = juvenile;lgbtq", 
	        "(1)     gay = Yes", 
	        "(1)     gay:only = no", 
	        "(1)     gayfriendly = yes", 
	        "(1)     lesbian = yes", 
	        "(1)     lgbtq:men = yes", 
	        "(1)     lgbtq:women = yes", 
	        "(1)     sauna = gay", 
	        "(1)     social_facility:for = lgbt", 
            "(1)     community_centre:for = homosexual;bisexual;transgender"
	    ]
}
```



-----------------




lgbtq:primary:for = ...
lgbtq:only:for = ...
lgbtq:welcomes = ...
lgbtq:rejects = ...


audience:only:for = men
audience:primary:for = lgbtq
audience:welcomes = gay men lgbtq women
audience:rejects = ...







**Can only and pimary be combined to only have three questions?**
audience:primary:for = lgbtq
audience:welcomes = gay women bpoc
audience:rejects = men







* = only						->	audience:only:for = *
* = primary|majority			->	audience:primary:for = *
* = yes|welcome					->	audience:welcomes = *

audience = gay					->	audience:primary:for = gay
gayfriendly = yes				->	audience:welcomes = gay
gay:transgender = yes			->	audience:welcomes = transgender

social_facility:for = lgbt		->	audience:primary:for = lgbtq
community_centre = lgbtq		->	audience:primary:for = lgbtq
community_centre:for = lgbtq	->	audience:primary:for = lgbtq

audience = gay_and_friends		->	audience:primary:for = gay
sauna = gay						->	audience:primary:for = gay

⚠️ lgbtq:cruising = yes			->	amenity = cruising

lgbtq:men = primary			 	->	audience:primary:for = men
lgbtq:male = primary			->	audience:primary:for = men

        "(563)     lgbtq = primary", 
        "(460)     gay = yes", 
        "(94)     gay = welcome", 
        "(54)     gay:men = only", 
        "(52)     gay:men = yes", 
        "(43)     lgbtq = welcome", 
        "(30)     community_centre:for = lgbtq", 
        "(23)     gay:women = yes", 
        "(23)     lgbtq = yes", 
        "(17)     lgbtq:men = primary", 
        "(13)     lgbtq:men = only", 
        "(11)     gay:transgender = yes", 
        "(9)     lgbtq:cruising = yes", 
        "(8)     lgbtq:women = primary", 
        "(7)     audience = gay", 
        "(7)     gay = only", 
        "(6)     lgbtq:male = primary", 
        "(5)     gay = men", 
        "(4)     gay:women = only", 
        "(4)     lgbtq = only", 
        "(4)     lgbtq:bears = primary", 
        "(4)     lgbtq:bears = yes", 
        "(3)     gay = majority", 
        "(3)     gay:women = welcome", 
        "(2)     lgbtq = friendly", 
        "(2)     lgbtq:female = primary", 
        "(2)     type = gay", 
        "(1)     audience = gay_and_friends", 
        "(1)     club = gay", 
        "(1)     club = lgbtq", 
        "(1)     community_centre = youth_centre;lgbtq", 
        "(1)     community_centre:for = juvenile;lgbtq", 
        "(1)     gay = Yes", 
        "(1)     gay:only = no", 
        "(1)     gayfriendly = yes", 
        "(1)     lgbtq:men = yes", 
        "(1)     lgbtq:women = yes", 
        "(1)     sauna = gay", 
        "(1)     social_facility:for = lgbt"








**lgbtq, gay, ... could be wikidata-ids**

wikidata:audience:only:for = ...
wikidata:audience:primary:for = ...
wikidata:audience:welcomes = ...
wikidata:audience:rejects = ...






-----------------


## OR: Every audience has its own tag.

lgbtq:men == audience:men

lgbtq:men = only / primary / welcome / no
audience:men = only / primary / welcome / no

wikidata:audience:Q12345 = only / primary / welcome / no




## Values

only			->	only
primary			->	primary
lgbtq			->	primary
gay				->	primary
majority		->	primary
gay_and_friends	->	primary
welcome			->	welcome
yes				->	welcome
friendly		->	welcome



## Keys

lgbtq				-> queer
gay					-> queer
gay:women			-> women
lgbtq:female		-> women
gay:men				-> men
lgbtq:men			-> men
lgbtq:male			-> men
gay:transgender		-> trans
homosexual			-> sexuality:gay
bisexual			-> sexuality:bi
juvenile			-> youth
youth_centre		-> youth

lgbtq:bears			-> bears
lgbtq:cruising		-> queer:cruising



## Special Tags

community_centre:for = homosexual;bisexual;transgender	-> audience:sexuality:gay = primary | audience:sexuality:bi = primary | audience:trans = primary
community_centre:for = lgbtq							-> audience:queer = primary
community_centre:for = juvenile;lgbtq					-> audience:queer = primary | audience:youth = primary
community_centre = youth_centre;lgbtq					-> audience:queer = primary | audience:youth = primary
social_facility:for = lgbt								-> audience:queer = primary
type = gay												-> audience:queer = primary
sauna = gay												-> audience:queer = primary
club = gay												-> audience:queer = primary
club = lgbtq											-> audience:queer = primary
audience = gay											-> audience:queer = primary
audience = gay_and_friends								-> audience:queer = primary | audience:? = primary
gayfriendly = yes										-> audience:queer = welcome
gay = men												-> audience:men = primary
gay:only = no											-> ?















-----------------











https://www.netguru.com/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native

```xml
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png">
```

```xml
<meta name="apple-mobile-web-app-capable" content="yes" />
<link href="/apple_splash_2048.png" sizes="2048x2732" rel="apple-touch-startup-image" />
<link href="/apple_splash_1668.png" sizes="1668x2224" rel="apple-touch-startup-image" />
<link href="/apple_splash_1536.png" sizes="1536x2048" rel="apple-touch-startup-image" />
<link href="/apple_splash_1125.png" sizes="1125x2436" rel="apple-touch-startup-image" />
<link href="/apple_splash_1242.png" sizes="1242x2208" rel="apple-touch-startup-image" />
<link href="/apple_splash_750.png" sizes="750x1334" rel="apple-touch-startup-image" />
<link href="/apple_splash_640.png" sizes="640x1136" rel="apple-touch-startup-image" />
```

```js
// Detects if device is on iOS 
const isIos = () => {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
	this.setState({ showInstallMessage: true });
}
```













-----------------














absurd illustrations that make sense









-----------------


















































