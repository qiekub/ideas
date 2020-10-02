




head
branch
commit
tree
blob (binary large object)





# Objects

``` JS
BLOB {
	_id
	sha1-hash-of-itself
	sha256-hash-of-itself

	content
}

TREE {
	_id
	sha1-hash-of-itself
	sha256-hash-of-itself

	files [
		{
			file-name (Its own name)
			object-hash (The hash of the object its pointing to)
			object-type (Type of the object its pointing to)
			object-permissions (The unix-file-permissions of the object its pointing to)
		}
	]
}

COMMIT {
	_id
	sha1-hash-of-itself
	sha256-hash-of-itself

	tree (The tree its pointing to)
	parent-commit (Its parent commit)

	author (Some metadata)
	committer (Some metadata)
	commit-message (Some metadata)
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

# Functions

``` JS

rebase (branch-from, branch-to)
merge (branch-from, branch-to)
...

```






40-char SHA1 hash
























