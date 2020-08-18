


doc {
	scopes [
		'maintainer',
		'public',
		...
	]
}

person {
	roles: ['public']
}


https://sirv.com/help/articles/users-roles-permissions/

https://support.code42.com/Administrator/6/Monitoring_and_managing/Best_practices_for_custom_roles_and_permissions













``` JS
db.getCollection('Changesets').aggregate([
		{$match:{
			"properties.forID": {$in: [ObjectId("5f2a59ab15943e426b26bb0e")]},
		}},
		{$lookup:{
			from: 'Edges',
			let: {
				changesetID: '$_id',
			},
			pipeline: [
				{$match:{
					$expr:{$and:[
						{$in: ['$properties.edgeType', ["approved", "rejected"]] },
						{$eq: ['$properties.toID',  '$$changesetID']},
					]}
				}},
				{$sort:{
					"metadata.lastModified": 1,
				}},
				{$limit: 1},
				{$project:{
					_id: false,
					edgeType: '$properties.edgeType',
				}},
			],
			as: 'edges_doc',
		}},

		{$set:{
			"tags": { $objectToArray: "$properties.tags" },
			"forID": "$properties.forID",
			"antiSpamUserIdentifier": "$properties.antiSpamUserIdentifier",
			"lastModified": "$metadata.lastModified",
			"edge_doc": { $arrayElemAt: [ "$edges_doc", 0 ] },
		}},
		{$unset: ["__typename","properties","metadata","edges_doc"]},

		{$unwind: "$tags"},
		{$set:{
			"key": "$tags.k",
			"value": "$tags.v",
		}},
		{$unset: "tags"},

		{$lookup:{
			from: 'Edges',
			let: {
				changesetID: '$_id',
				tagKey: '$key',
			},
			pipeline: [
				{$match:{
					$expr:{$and:[
						{$in: ['$properties.edgeType', ["approvedTag", "rejectedTag"]] },
						{$eq: ['$properties.toID',  '$$changesetID']},
						{$eq: ['$properties.tags.forTag',  '$$tagKey']},
					]}
				}},
				{$sort:{
					"metadata.lastModified": 1,
				}},
				{$limit: 1},
				{$project:{
					_id: true,
					edgeType: '$properties.edgeType',
				}},
			],
			as: 'edges_tags',
		}},

		{$set:{
			"edge_tag": { $arrayElemAt: [ "$edges_tags", 0 ] },
		}},
		{$set:{
			"doc_decision": '$edge_doc.edgeType',
			"tag_decision": '$edge_tag.edgeType',
		}},
		{$set:{
			doc_decision: { $ifNull: [ "$doc_decision", null ] },
			tag_decision: { $ifNull: [ "$tag_decision", null ] },
		}},
		{$unset: ['edges_tags','edge_doc','edge_tag']},

		// START restrict to the latest answer per antiSpamUserIdentifier (and place and key).
		{$sort:{
			"lastModified": 1,
			"_id": 1,
		}},
		{$group:{
			_id: {$concat:[
				{$toString:"$antiSpamUserIdentifier"},
				"_",
				{$toString:"$forID"},
				"_",
				{$toString:"$key"},
			]},
			doc: {$first:"$$ROOT"},
		}},
		{$replaceRoot:{newRoot:"$doc"}},
		// END restrict to the latest answer per antiSpamUserIdentifier (and place and key).

		{$sort:{
			"key": 1,
			"value": 1,
			"lastModified": 1
		}},
])
```


