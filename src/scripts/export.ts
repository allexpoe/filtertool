import 'dotenv/config'
import fs from 'fs'
import path from 'path'

const main = async () => {
  const filterName = process.argv?.[2]?.toLowerCase()
  const filterPath = process.env.FILTER_PATH

  if (!filterName) {
    console.log('No filter name provided.\n')
    return
  }

  if (!filterPath) {
    console.log('No filter path set in environment variables.\n')
    return
  }

  try {
    const { getFilter } = await import(path.join(__dirname, '../filters', filterName))

    if (!getFilter) {
      throw new Error('Invalid filter file.')
    }

    const filterFileName =
      [
        filterName
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
          .join(''),
      ].join('_') + '.filter'

    fs.writeFileSync(path.join(filterPath, filterFileName), getFilter())
    console.log(`Successfully exported filter: ${filterFileName}\n`)
  } catch (err) {
    console.log('Error while compiling filter.', err)
  }
}

main()
