# TagGroups

const TagGroups = {
	name: {
		'name': String,
		'name:en': String,
	}
}


name:en:plaintext = 'hello world'
name:de:plaintext = 'hallo welt'

name:en = 'hello world'
name:en:format = 'plaintext'
name:de = 'hallo welt'
name:de:format = 'plaintext'

name = 'hello world'
name:lang = 'en'
name:format = 'plaintext'

name: {
	en: 'hello world'
	de: 'hallo welt'
	format: 'plaintext'
}

name: [
	{
		value: 'hello world'
		lang: 'en'
		format: 'plaintext'
	},
	{
		value: 'hallo welt'
		lang: 'de'
		format: 'plaintext'
	},
]



date:year = 2020
date:year_is_set = true
date:month = null
date:month_is_set = false
date:day = 1
date:day_is_set = true











