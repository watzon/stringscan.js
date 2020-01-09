<!--
 Copyright (c) 2020 Chris Watson
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# StringScan.js

[![view on npm](http://img.shields.io/npm/v/stringscan.svg)](https://www.npmjs.org/package/stringscan)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

JavaScript implementation of Ruby/Crystal's StringScanner. Useful for writing tokenizers.


# API Reference
<a name="module_stringscan.StringScanner"></a>

### stringscan~StringScanner
**Kind**: inner class of [<code>stringscan</code>](#module_stringscan)  

* [~StringScanner](#module_stringscan.StringScanner)
    * [.offset](#module_stringscan.StringScanner+offset) ⇒ <code>number</code>
    * [.offset](#module_stringscan.StringScanner+offset)
    * [.rest](#module_stringscan.StringScanner+rest)
    * [.scan(pattern)](#module_stringscan.StringScanner+scan) ⇒ <code>string</code> \| <code>null</code>
    * [.scanUntil(pattern)](#module_stringscan.StringScanner+scanUntil) ⇒ <code>string</code> \| <code>null</code>
    * [.skip(pattern)](#module_stringscan.StringScanner+skip) ⇒ <code>number</code> \| <code>null</code>
    * [.skipUntil(pattern)](#module_stringscan.StringScanner+skipUntil) ⇒ <code>number</code> \| <code>null</code>
    * [.check(pattern)](#module_stringscan.StringScanner+check) ⇒ <code>string</code> \| <code>null</code>
    * [.checkUntil(pattern)](#module_stringscan.StringScanner+checkUntil) ⇒ <code>string</code> \| <code>null</code>
    * [.charAt(index)](#module_stringscan.StringScanner+charAt) ⇒ <code>string</code> \| <code>null</code>
    * [.eos()](#module_stringscan.StringScanner+eos) ⇒ <code>boolean</code>
    * [.reset()](#module_stringscan.StringScanner+reset)
    * [.terminate()](#module_stringscan.StringScanner+terminate)
    * [.peek()](#module_stringscan.StringScanner+peek)
    * [.take()](#module_stringscan.StringScanner+take)
    * [.toString()](#module_stringscan.StringScanner+toString)

<a name="module_stringscan.StringScanner+offset"></a>

#### scanner.offset ⇒ <code>number</code>
Set the current offset position, keeping it within the bounds
of the given string.

**Kind**: instance property of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>number</code> | The position to set the offset to. |

<a name="module_stringscan.StringScanner+offset"></a>

#### scanner.offset
Returns the current scan offset.

**Kind**: instance property of [<code>StringScanner</code>](#module_stringscan.StringScanner)  
<a name="module_stringscan.StringScanner+rest"></a>

#### scanner.rest
Returns the remainder of the string after the scan offset.

**Kind**: instance property of [<code>StringScanner</code>](#module_stringscan.StringScanner)  
<a name="module_stringscan.StringScanner+scan"></a>

#### scanner.scan(pattern) ⇒ <code>string</code> \| <code>null</code>
Tries to match the *pattern* at the current position. If there is
a match, the scanner advances to the scan offset, the last match
is saved, and it returns the matched string. Otherwise it
returns null.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to match against. |

<a name="module_stringscan.StringScanner+scanUntil"></a>

#### scanner.scanUntil(pattern) ⇒ <code>string</code> \| <code>null</code>
Scans the string _until_ the *pattern* is matched. Returns the substring
up to and including the end of the match, the last match is saved, and
advances the scan offset. Returns null if no match.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to match against. |

<a name="module_stringscan.StringScanner+skip"></a>

#### scanner.skip(pattern) ⇒ <code>number</code> \| <code>null</code>
Attempts to skip over the given *pattern* beginning with the scan offset.
In other words, the pattern is not anchored to the current scan offset.

If there is a match, the scanner advances the scan offset, the last match
is saved, and it returns the size of the skipped match. Otherwise it
returns null and does not advance the offset.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to match against. |

<a name="module_stringscan.StringScanner+skipUntil"></a>

#### scanner.skipUntil(pattern) ⇒ <code>number</code> \| <code>null</code>
Attempts to skip _until_ the given *pattern* is found after the scan
offset. In other words, the pattern is not anchored to the current
scan offset.

If there is a match, the scanner advances the scan offset, the last match
is saved, and it returns the size of the skip. Otherwise it returns null
and does not advance the offset.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to match against. |

<a name="module_stringscan.StringScanner+check"></a>

#### scanner.check(pattern) ⇒ <code>string</code> \| <code>null</code>
Returns the value that `scan` would return, without advancing the scan
offset. The last match is still saved, however.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to match against. |

<a name="module_stringscan.StringScanner+checkUntil"></a>

#### scanner.checkUntil(pattern) ⇒ <code>string</code> \| <code>null</code>
Returns the value that `scanUntil` would return, without advancing the
scan offset. The last match is still saved, however.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>RegExp</code> | The pattern to match against. |

<a name="module_stringscan.StringScanner+charAt"></a>

#### scanner.charAt(index) ⇒ <code>string</code> \| <code>null</code>
Returns the character at the given index, or null if the index is
out of range.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index in the original string to fetch |

<a name="module_stringscan.StringScanner+eos"></a>

#### scanner.eos() ⇒ <code>boolean</code>
Returns true if the scan offset is at the end of the string.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  
<a name="module_stringscan.StringScanner+reset"></a>

#### scanner.reset()
Resets the scan offset to the beginning and clears the last match.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  
<a name="module_stringscan.StringScanner+terminate"></a>

#### scanner.terminate()
Moves the scan offset to the end of the string and clears the last match.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  
<a name="module_stringscan.StringScanner+peek"></a>

#### scanner.peek()
Extracts a substring of length *len* from the current offset, without
advancing the scan offset.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  
<a name="module_stringscan.StringScanner+take"></a>

#### scanner.take()
Extracts a substring of length *len* from the current offset, advances
the scan offset, and returns the string.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  
<a name="module_stringscan.StringScanner+toString"></a>

#### scanner.toString()
Returns a string representation of this StringScanner.

**Kind**: instance method of [<code>StringScanner</code>](#module_stringscan.StringScanner)  

* * *

&copy; 2020 Chris Watson. Licensed under the MIT License. All rights reserved.