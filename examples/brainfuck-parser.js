const StringScanner = require('../src/stringscan')

class BrainfuckParser {
  constructor (data, input, stackSize = 30000) {
    this.data = data
    this.input = input || []
    this.pointer = 0
    this.stack = new Uint8Array(stackSize)
    this.loops = []
  }

  parse () {
    const scanner = new StringScanner(this.data)
    do {
      const nextChar = scanner.take(1)
      switch (nextChar) {
        case '>':
          if (this._ignore()) break
          this.pointer += 1
          break
        case '<':
          if (this._ignore()) break
          this.pointer -= 1
          break
        case '+':
          if (this._ignore()) break
          this.stack[this.pointer] += 1
          break
        case '-':
          if (this._ignore()) break
          this.stack[this.pointer] -= 1
          break
        case '.':
          if (this._ignore()) break
          process.stdout.write(String.fromCharCode(this.stack[this.pointer]))
          break
        case ',':
          if (this._ignore()) break
          const read = this.input.shift()
          if (read === undefined && scanner.charAt(scanner.offset + 1) === '+') this.stack[this.pointer] = -1
          else if (read === undefined) this.stack[this.pointer] = 0
          else this.stack[this.pointer] = read.charCodeAt(0)
          break
        case '[':
          const loop = [scanner.offset - 1, this._ignore() || this.stack[this.pointer] === 0]
          this.loops.push(loop)
          break
        case ']':
          if (this.loops.length < 1) {
            throw new Error(`Found end loop without loop start at offset ${scanner.offset}`)
          }
          const last = this.loops.pop()
          if (!last[1]) {
            scanner.offset = last[0]
          }
          break
        default:
          // Ignore the character and move on
      }
    } while (!scanner.eos())
  }

  _ignore () {
    return this.loops.length > 0 && this.loops[this.loops.length - 1][1]
  }
}

module.exports = BrainfuckParser
