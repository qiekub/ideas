const crypto = require('crypto')

function getBinarySize(string) {
    return Buffer.byteLength(string, 'utf8')
    // return Buffer.from(text).length
}

const getSHA1 = text => crypto.createHash('sha1').update(text).digest('hex')
const getSHA256 = text => crypto.createHash('sha256').update(text).digest('hex')

let text = 'foo'
// text = '⑤'
text = `tree c1b95da3101311e2f6267470d5611b1c5a3117ad
parent 209ceed66834f6dbe7281b3486caf2cdb4f71677
author Thomas Rosen <thomas.rosen@me.com> 1591635877 +0200
committer Thomas Rosen <thomas.rosen@me.com> 1591635877 +0200

added HIV-Facilities in the Philippines`

// text = text.replace(/\n/g, '')

const type = 'commit' // blob tree commit tag
const header = `${type} ${getBinarySize(text)}\0`
text = header+text

let expected = 'fff22b778ad0c8e0b364a6bd84ffb32ce160bdac'
    // expected = '60051953c239686456fecf7767d9bf833e245e2d'

console.log('e: ', expected)
console.log('g: ', getSHA1(text))
console.log('t: ', text)


// fff22b778ad0c8e0b364a6bd84ffb32ce160bdac



// foo = 19102815663d23f8b75a47e7a01965dcdc96468c