const { promises: fs } = require('fs')

const createCsWriter = require('csv-writer').createObjectCsvWriter

const csWriter = createCsWriter({
  path: './randomuser.csv',
  headerIdDelimiter: '.',
  header: ['name', 'email', 'phone_number', 'age'].map((item) => ({ id: item, title: item.replace('.', '_') }))
})

async function main () {
  const file_data = await fs.readFile('randomuser.json')
  const parsed_data = JSON.parse(file_data)


  try {
    await csWriter.writeRecords(parsed_data.randomuser)
  } catch (error) {
    console.log(error)
  }
}


main()