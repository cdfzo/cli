export const parse = () => {
  const argv = process.argv.slice(2),
    argvLen = argv.length,
    args: string[] = [],
    opts: { [opt: string]: string | true } = {}

  for (let i = 0; i < argvLen; i++) {
    const arg = argv[i]

    // Short options
    if (arg[0] === '-') {
      const [key, value] = arg.split(/=|:/),
        next = (argv[i + 1]?.[0] === '-' || argv[++i]) ?? true

      // Long options
      if (arg[1] === '-') {
        opts[
          (value ? key : arg)
            .substring(2)
            .replace(/-./g, (v) => v.substring(1).toUpperCase())
        ] = value ?? next

        continue
      }

      // Combined options
      for (const opt of (value ? key : arg).substring(1).split('')) {
        opts[opt] = value ?? next
      }

      continue
    }

    args.push(arg)
  }

  return [args, opts]
}
