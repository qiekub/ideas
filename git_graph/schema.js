const {gql} = require('apollo-server-express')

// scalar Date
// scalar Time
// scalar DateTime
//
// scalar Timestamp

const schema = gql`
	scalar Hash
	scalar JSON
	scalar JSONObject



	type Head {
		permanentID: ID # To reference it outside the db.
		commit: Hash # Hash of the commit its pointing to. It's pointing to an Object.
	}



	type Object {
		hash: Hash # Hash of the content.
		content: Content
	}
	union Content = Commit | Tree | Edge | KeyValuePairs | SingleValue | NumberValue | BooleanValue | DateTime | CreativeWork | Locale


	type Commit {
		tree: Hash
		parents: [Hash] # Hash to the parent commits
		committer: String
		message: String
		timestamp: DateTime
	}


	"This is like a git-tree or a folder or a graph-node."
	type Tree {
		edges: [Hash] # [Edge]
		properties: Content
	}


	"This is like a line in a git-tree, graph-edge or -relation."
	type Edge {
		label: EdgeLabel # Name of relation/edge/file. Can be any string.
		
		to: Hash # (The hash of the object its pointing to)
		permissions: Hash # (A hash of the document containing the permissions)	

		properties: Content
	}
	"Try to use schema.org properties, wikidata properties or osm tags."
	enum EdgeLabel {
		acceptedAnswer
		suggestedAnswer
		followUpQuestions
	}


	type KeyValuePairs {
		pairs: JSONObject
	}
	type SingleValue {
		value: JSON # Could be any scalar, so it's json, to imcompass thas.
	}
	type NumberValue {
		number: Number
	}
	type BooleanValue {
		boolean: Boolean
	}

	type DateTime {
		timestamp: Number
		iso_8601: String

		year: Number
		month: Number
		day: Number
		hours: Number
		minutes: Number
		seconds: Number
		milliseconds: Number

		yearIsSet: Boolean
		monthIsSet: Boolean
		dayIsSet: Boolean
		hoursAreSet: Boolean
		minutesAreSet: Boolean
		secondsAreSet: Boolean
		millisecondsAreSet: Boolean
	}


	type CreativeWork {
		encodingFormat: MimiTypeString
		locale: Hash # inLanguage

		title: String # headline
		text: String # the main text content
		name: String # In one word

		# keywords
		# license
		# thumbnailUrl
		# translationOfWork
		# workTranslation

		# alternateName
		# description
		# disambiguatingDescription
		# image
		# sameAs
		# url
	}
	enum MimiTypeString {
		text/plain
		text/html
		text/markdown
	}


	type Locale {
		iso_639_1: String
		iso_639_2: String
		iso_639_3: String
		iso_639_5: String
		glottolog: String
		linguascale: String # (wikidata:P1396) Linguascale of the Linguasphere Observatory

		country: String # ISO 3166-1 alpha-2
		region: String # ISO 3166-2

		script: String # ISO 15924 Code
	}







	type QuestionTemplate {
		question: Hash # Content
		expectedAnswerTypes: [InputType]
		followUpQuestions: [Hash]
	}
	enum InputType {
		Text
		DateTime
		NumberValue
		BooleanValue

		# address
		# audience
		# text
		# geo
		# preset
		# button
	}
	type Question {
		isBasedOn: Hash # QuestionTemplate
		about: Hash # Content

		# acceptedAnswer: [Hash] # Content
		# suggestedAnswer: [Hash] # Content
	}

`

/*
	title: metadata.title || article.title,					Text
	description: metadata.description || article.excerpt,	Text
	'content:html': article.content,						Text
	'content:plaintext': article.textContent,				Text
	byline: article.byline,									Text
	dir: article.dir,										Boolean / String
	length: article.length,									Number
	siteName: article.siteName || metadata.provider,		Text

	'keywords:found': foundKeywords,						[String] / [Tag/Category]
	'keywords:generated': generatedKeywords,				[String] / [Tag/Category]
	'og:type': og_type,										String / Tag/Category

	language												String / Locale
*/


/*



https://map.qiekub.org/view/5f645b7dddc03a2cab14ef86/
https://map.qiekub.org/view/5f645b80ddc03a4f4214ef8d/










	scalar JSON
	scalar JSONObject
	scalar DateTime

	type Text {
		text: String
		language: String
	}

	type Marker {
		_id: ID
		originalTypename: String
		name(languages: [String]): [Text]
		lng: Float
		lat: Float
		preset: String
		status: String
		tags: JSONObject
	}

	type GeoCoordinate {
		"Longitude"
		lng: Float
		"Latitude"
		lat: Float
	}
	type Boundingbox {
		northeast: GeoCoordinate
		southwest: GeoCoordinate
	}
	type GeoData {
		location: GeoCoordinate
		boundingbox: Boundingbox
		_viewport: Boundingbox
	}
	
	type SearchInfo {
		query: String
		results: [GeoSearchResult]
	}
	type GeoSearchResult {
		placeID: ID
		preset: String
		name: [Text]
		address: String
		geometry: GeoData
	}

	"""
	lgbtq:welcomes = undecided;friends;family;trans;inter;gay;hetero;bi;lesbian;woman;man
	lgbtq_58_welcomes: String
	formatted_address: String
	formatted_phone_number: String
	international_phone_number: String
	"""
	type Place {
		name(languages: [String]): [Text]
		description(languages: [String]): [Text]

		geometry: GeoData

		"node/0123456789"
		osmID: ID

		tags(keys: [String]): JSONObject
		confidences(keys: [String]): JSONObject
		changesetIDs(keys: [String]): JSONObject
	}

	type Changeset {
		forID: ID
		tags: JSONObject

		"Links and any other reference"
		sources: String
		
		fromBot: Boolean

		"osm / qiekub"
		dataset: ID

		"anything to identify the user who created the change"
		antiSpamUserIdentifier: ID
	}
	input Changeset_Input {
		forID: ID
		tags: JSONObject

		"Links and any other reference"
		sources: String
		
		fromBot: Boolean

		"osm / qiekub"
		dataset: ID

		"anything to identify the user who created the change"
		antiSpamUserIdentifier: ID
	}

	type Question {
		question(languages: [String]): [Text]
		in_one_word(languages: [String]): [Text]
		description(languages: [String]): [Text]
		icon: String
		possibleAnswers: [Answer]
	}
	type Answer {
		inputtype: String
		inputOptions: JSONObject
		namespace: String
		parsers: [String]
		key: String
		icon: String
		title(languages: [String]): [Text]
		description(languages: [String]): [Text]
		followUpQuestionIDs: [ID]
		tags: JSONObject
		hidden: Boolean
	}

	type Profile {
        displayName: String
	}
	type Account {
        uid: String
        provider: String
        username: String
        displayName: String
        forProfileID: ID
	}
	type Session {
		profileID: ID
		user_agent: String
		started: DateTime
		expires: DateTime
		lastModified: DateTime
	}

	type Edge {
		edgeType: EdgeTypes
		fromID: ID
		toID: ID
		tags(keys: [String]): JSONObject
	}
	input Edge_Input {
		edgeType: EdgeTypes
		fromID: ID
		toID: ID
		tags: JSONObject
	}

	"EdgeTypes are in past-tense."
	enum EdgeTypes {
		approved
		approvedTag
		rejected
		rejectedTag
		deleted
	}

	type Metadata {
		lastModified: DateTime
		created: DateTime
	}
	type Error {
		error: String
	}



	union Properties = Error | Edge | Place | Changeset | Question | Text | Session | Account
	type Doc {
		_id: ID
		properties: Properties
		metadata: Metadata
	}
`
*/


