// Copyright (c) 2020 Chris Watson
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * @module
 */
module.exports = StringScanner

/**
 * @class
 * @memberof module:stringscan
 * @typicalname scanner
 */
class StringScanner {
  constructor (str) {
    this.str = str
    this.lastMatch = null
    this._offset = 0
  }

  /**
   * Set the current offset position, keeping it within the bounds
   * of the given string.
   *
   * @param {number} position - The position to set the offset to.
   * @returns {number}
   */
  set offset (position) {
    if (position < 0) {
      position = 0
    } else if (position > this.str.length) {
      position = this.str.length
    }

    this._offset = position
    return position
  }

  /**
   * Returns the current scan offset.
   */
  get offset () {
    return this._offset
  }

  /**
   * Returns the remainder of the string after the scan offset.
   */
  get rest () {
    return this.str.slice(this._offset, this.str.length)
  }

  /**
   * Tries to match the *pattern* at the current position. If there is
   * a match, the scanner advances to the scan offset, the last match
   * is saved, and it returns the matched string. Otherwise it
   * returns null.
   *
   * @param {RegExp} pattern - The pattern to match against.
   * @returns {string | null}
   */
  scan (pattern) {
    return this._match(pattern, { advance: true, anchored: true })
  }

  /**
   * Scans the string _until_ the *pattern* is matched. Returns the substring
   * up to and including the end of the match, the last match is saved, and
   * advances the scan offset. Returns null if no match.
   *
   * @param {RegExp} pattern - The pattern to match against.
   * @returns {string | null}
   */
  scanUntil (pattern) {
    return this._match(pattern, { advance: true })
  }

  /**
   * Attempts to skip over the given *pattern* beginning with the scan offset.
   * In other words, the pattern is not anchored to the current scan offset.
   *
   * If there is a match, the scanner advances the scan offset, the last match
   * is saved, and it returns the size of the skipped match. Otherwise it
   * returns null and does not advance the offset.
   *
   * @param {RegExp} pattern - The pattern to match against.
   * @returns {number | null}
   */
  skip (pattern) {
    const match = this.scan(pattern)
    return match ? match.size : null
  }

  /**
   * Attempts to skip _until_ the given *pattern* is found after the scan
   * offset. In other words, the pattern is not anchored to the current
   * scan offset.
   *
   * If there is a match, the scanner advances the scan offset, the last match
   * is saved, and it returns the size of the skip. Otherwise it returns null
   * and does not advance the offset.
   *
   * @param {RegExp} pattern - The pattern to match against.
   * @returns {number | null}
   */
  skipUntil (pattern) {
    const match = this.scanUntil(pattern)
    return match ? match.size : null
  }

  /**
   * Returns the value that `scan` would return, without advancing the scan
   * offset. The last match is still saved, however.
   *
   * @param {RegExp} pattern - The pattern to match against.
   * @returns {string | null}
   */
  check (pattern) {
    return this._match(pattern, { advance: false, anchored: true })
  }

  /**
   * Returns the value that `scanUntil` would return, without advancing the
   * scan offset. The last match is still saved, however.
   *
   * @param {RegExp} pattern - The pattern to match against.
   * @returns {string | null}
   */
  checkUntil (pattern) {
    return this._match(pattern, { advance: false })
  }

  /**
   * Returns the character at the given index, or null if the index is
   * out of range.
   *
   * @param {number} index - The index in the original string to fetch
   * @returns {string | null}
   */
  charAt (index) {
    if (index > this.str.size || index < 0) {
      return null
    }

    return this.str[index]
  }

  /**
   * Returns true if the scan offset is at the end of the string.
   *
   * @returns {boolean}
   */
  eos () {
    return this._offset >= this.str.length
  }

  /**
   * Resets the scan offset to the beginning and clears the last match.
   */
  reset () {
    this.lastMatch = null
    this._offset = null
  }

  /**
   * Moves the scan offset to the end of the string and clears the last match.
   */
  terminate () {
    this.lastMatch = null
    this._offset = this.str.length
  }

  /**
   * Extracts a substring of length *len* from the current offset, without
   * advancing the scan offset.
   */
  peek (len) {
    return this.str.slice(this._offset, this._offset + len)
  }

  /**
   * Extracts a substring of length *len* from the current offset, advances
   * the scan offset, and returns the string.
   */
  take (len) {
    const str = this.peek(len)
    this._offset += len
    return str
  }

  /**
   * Returns a string representation of this StringScanner.
   */
  toString () {
    const offset = this._offset
    const start = Math.min(Math.max(offset - 2, 0), Math.max(0, this.str.size - 5))
    return `StringScanner(${offset}/${this.str.length} "${this.str.slice(start, start + 5)}")`
  }

  _match (pattern, { advance = true, anchored = false } = {}) {
    pattern = anchored ? new RegExp('^' + pattern.source) : pattern
    const match = this.rest.match(pattern)

    if (match) {
      const start = this._offset
      const newOffset = start + match.index + match[0].length

      if (advance) {
        this._offset = newOffset
      }

      return this.str.slice(start, newOffset)
    }

    return null
  }
}
