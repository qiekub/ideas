# Changeset Approvel Process

## Changeset Overview

## Decision
- Reject
- Approve (I fact-checked everything!)
- Approve (Seams okay but I didn't check the data.)
- Skip


## Database

``` JS
{
	_id: '',
	__typename: 'Doc',
	properties: {
		__typename: 'Edge',
		edgeType: '',	// rejects / approves / skipped / fact_checked / visited / opened / ...
		fromID: '',		// actionTakenBy
		toID: '',		// actionTakenOn
		tags: {
			comment: '',
			...
		},
	},
	metadata: {},
}
```