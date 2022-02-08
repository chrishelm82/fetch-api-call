//Get Btn And Create Function
document.getElementById('myBtn').addEventListener('click', getData, main );

function getData () {

  //Get API
  fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json())
    .then(data => {
      console.log(data);

      let author = data.results;
      console.log(author);

      //Get Data Value
      let output = "<h2><center>Get User Data</center></h2>";

      //Get Data Loop Through
      author.forEach(function (lists) {
        output += `
                <div class="container">
                    <div class="card mt-4 bg-light">
                        <ul class="list-group">
                            <li class="list-group-item"><h2>${lists.name.first} ${lists.name.last}</h2></li>
                            
                            <li class="list-group-item">Email: ${lists.email}</li>
                            <li class="list-group-item">Phone Number: ${lists.cell}</li>
                            <li class="list-group-item">Age: ${lists.dob.age}</li>
                            <li class="list-group-item">Gender: ${lists.gender}</li>
                            <li class="list-group-item"><img src="${lists.picture.large}"></li>
                            
                        </ul>
                    </div>
                </div> `;
      });

      //Show On Our Screen All Data
      document.getElementById('output').innerHTML = output;

    });
};

const { promises: fs } = require('fs')

const createCsWriter = require('csv-writer').createObjectCsvWriter

const csWriter = createCsWriter({
  path: './download.csv',
  headerIdDelimiter: '.',
  header: ['name', 'email', 'phone_number', 'age'].map((item) => ({ id: item, title: item.replace('.', '_') }))
})

async function main () {
  const file_data = await fs.readFile('download.json')
  const parsed_data = JSON.parse(file_data)


  try {
    await csWriter.writeRecords(parsed_data.download.csv)
  } catch (error) {
    console.log(error)
  }
}


main()