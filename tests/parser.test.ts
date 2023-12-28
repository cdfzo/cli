import { describe, expect, it } from 'bun:test'
import { parse } from '../src/parser'

const parseArgs = (argv: string) => {
  process.argv = ['', '', ...argv.split(' ')]
  return parse()
}

describe('argument parser', () => {
  it('parses nothing', () => {
    process.argv = ['', '']
    expect(parse()).toEqual([[], {}])
  })

  it('parses arguments', () => {
    expect(parseArgs('arg1 arg2')[0]).toEqual(['arg1', 'arg2'])
  })

  it('parses short flags', () => {
    expect(parseArgs('-f')[1]).toEqual({ f: true })
  })

  it('parses short combined flags', () => {
    expect(parseArgs('-fLAg')).toEqual(parseArgs('-f -L -A -g'))
  })

  it('parses long flags', () => {
    expect(parseArgs('--long-flag')[1]).toEqual({ longFlag: true })
  })

  it('parses short options', () => {
    expect(parseArgs('-k value')[1]).toEqual({ k: 'value' })
    expect(parseArgs('-k:value')[1]).toEqual({ k: 'value' })
    expect(parseArgs('-k=value')[1]).toEqual({ k: 'value' })
  })

  it('parses long options', () => {
    expect(parseArgs('--key value')[1]).toEqual({ key: 'value' })
    expect(parseArgs('--key:value')[1]).toEqual({ key: 'value' })
    expect(parseArgs('--key=value')[1]).toEqual({ key: 'value' })
  })
})
