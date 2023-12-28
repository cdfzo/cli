#!/usr/bin/env bun
import { parse } from '../src/index'

const [args, opts] = parse()
console.log({ args, opts })
