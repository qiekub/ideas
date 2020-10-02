# mapping GIT to Document-Graph




# Objects

``` JS
Document {
	_id: MongoObjectID
	hash: SHA256 (sha256 hash of itself)
	properties: {}
}

EdgeTree {
	_id: MongoObjectID
	hash: SHA256 (sha256 hash of itself)

	edges: [
		{
			edgeType: 
			object-hash (The hash of the object its pointing to)
			object-type: BLOB / TREE / COMMIT (Type of the object its pointing to)
			object-permissions: DocumentHash (A hash of the document containing the permissions)
		}
	]
}

Commit {
	_id: MongoObjectID
	hash: SHA256 (sha256 hash of itself)

	tree: EdgeTreeHash (The tree its pointing to)
	parent: CommitHash (Its parent commit)

	committer: DocumentHash (A hash pointing to the person)
	message: String (The commit message)
	timestamp: Date
}

Head {
	_id: MongoObjectID
	commit: CommitHash
}
```


## property types

``` JS
Metadata {
	__typename: 'Metadata',

	author (Some metadata)
	committer (Some metadata)
	commit-message (Some metadata)
}

Permission {
	__typename: 'Permission',
}

Tags {
	__typename: 'Tags',
	...
}
```






# References

``` JS
BRANCH {
	_id (A unique idenifier for the branch)

	branch-name (Its own name. Probably "master" and "changes".)
	commit-hash (The hash of the commit its pointing to)
}

HEAD {
	_id (A unique idenifier for the head)

	branch-name (The name of the branch its pointing to)
	commit-hash (The hash of the commit its pointing to)
}
```














node = tree
edge = file / document



object types



tree {
	hash   // of arms
	edges [
		{
			type   // tree / file
			name   // name of relation/edge/file
			hash   // hash of content (document or tree). to find it in the db
		}
	]
}


Types {
	tree {
		hash: Hash
	}
	edge {
	}
}


document types:
properties {
	key: value
}





head
-> commit
	-> tree
		-> object (key-value-pairs)
			-> key: value

		-> tree













