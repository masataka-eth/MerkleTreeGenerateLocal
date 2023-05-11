const fs = require('fs');
const csvParser = require('csv-parser');

const input_file = '.interface/input.csv';
const output_file = '.interface/output.txt';

function read_csv(input_file) {
  return new Promise((resolve, reject) => {
    let data = [];

    fs.createReadStream(input_file)
      .pipe(csvParser({ separator: ',', headers: false }))
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (error) => reject(error));
  });
}

function convert_to_list_format(data) {
  return data.map((line) => `[${JSON.stringify(line[0])},${parseInt(line[1])},${parseInt(line[2])}],`).join('\n');
}

function write_txt(output_file, data) {
  return fs.promises.writeFile(output_file, data);
}

(async function () {
  try {
    const csv_data = await read_csv(input_file);
    const output_list = convert_to_list_format(csv_data);
    await write_txt(output_file, output_list);
        console.log(`Success!! filename: ${output_file}`);
  } catch (error) {
    console.error(`error!!: ${error.message}`);
  }
})();
