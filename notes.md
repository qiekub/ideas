


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


## How to compile a place from answers
- get the 4 latest answers for a specfic place and a question
- get the answer with the highest amount of votes or the latest answer-date
- get the tags of that answer
- overwrite the old place data with these tags


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



(
	God gave me depression, cause he knew, if I only had mania, I would try to overthrough him.
)




## How to compile a place from answers
- get the 4 latest answers for a specfic place and a question
- get the answer with the highest amount of votes or the latest answer-date
- get the tags of that answer
- overwrite the old place data with these tags





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

## unique ids that can change very frequently but stay the same if nothing changed (unique!)
(score: ∞)
- osm-id

## unique references that won't changed (unique!)
(score: 6)
- wikidata
- iata
- icao
- ref:??? (not "ref", but: ref:whc, ref:isil, ref:dhis2, ref:vatin, ref:wmo, ref:wigos, ref:bag, ref:bufa, ...)
- fhrs:id (UK Food Hygiene Rating Scheme)

## geo information that change seldom
(score: 5)
- Lng+Lat match up to the sixs decimal place
- full addr:??? match

## urls that change rarely and are mostly unique (not neccessarly unique!)
(score: 4)
- wikipedia

- website
- facebook
- twitter

- phonenumber
- email
- contact:???

## properties that can change but identify a place (not neccessarly unique!)
(score: 3)
- official_name
- long_name
- name
- short_name
- alt_name

## vague properties that can eventually identify (not neccessarly unique!)
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

## properties that identify a group of places (not unique but can narrow it down in combination!)
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

## any other properties
- ???



https://wiki.openstreetmap.org/wiki/Permanent_ID
https://wiki.openstreetmap.org/wiki/Category:World_wide_external_reference_tag
https://wiki.openstreetmap.org/wiki/Key:iata
https://wiki.openstreetmap.org/wiki/Key:wikidata
https://wiki.openstreetmap.org/wiki/Key:ref

https://w.wiki/GbF
https://w.wiki/GbF redirects to: https://query.wikidata.org/embed.html#SELECT%20%3Fitem%20%3FOSM_key%20%3Fformatter_URL%20WHERE%20%7B%0A%20%20%7B%20%3Fitem%20wdt%3AP1282%20%3FOSM_key.%20%7D%0A%20%20FILTER(STRSTARTS(%3FOSM_key%2C%20'Key%3A'))%20.%0A%20%20FILTER(%3FOSM_key%20NOT%20IN%20('Key%3Aimage'%2C%20'Key%3Aurl'%2C%20'Key%3Awebsite'%2C%20'Key%3Awikidata'%2C%20'Key%3Awikimedia_commons'))%20.%0A%0A%20%20%7B%0A%20%20%20%20%7B%20%3Fitem%20wdt%3AP1630%20%3Fformatter_URL.%20%7D%0A%20%20%20%20UNION%0A%20%20%20%20%7B%20%3Fitem%20wdt%3AP3303%20%3Fformatter_URL.%20%7D%0A%20%20%7D%0A%7D%0A











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












——————————————————————————————————————————


## Impressums Generatoren

https://www.juraforum.de/impressum-generator/



## Datenschutz Generatoren

https://datenschutz-generator.de/



——————————————————————————————————————————


















