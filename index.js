const fs = require("fs");
const path = require('path');
const csv = require("csvtojson");
const json2csv = require('json-2-csv');


const oldImagesPath = "./old-images/";
const renamedImagesPath = "./renamed-images/";
const filenameCSV = "./new-filename.csv";

const listImagesName = () => {
  const imagesList = [];

  fs.readdirSync(oldImagesPath).forEach((file) => {
    const filename = path.parse(file).name;
    const ext = path.parse(file).ext;
    const sampleNewFilename = filename + '-test';

    imagesList.push({
        old_name: filename,
        new_name: sampleNewFilename,
        ext
    })
  });

  return imagesList;
};


const exportListImagesToCSV = () => {
    json2csv.json2csv(listImagesName(), (err, csv)=> {
        if(err) {
            throw err;
        }

        console.log(csv);
        fs.writeFileSync('new-filename.csv', csv);
    })
}


const csvItemsToArray = async () => {
    return await csv().fromFile(filenameCSV);
}

const renameImages = async () => {
    const csvItems = await csvItemsToArray();

    csvItems.forEach((item) => {
        const oldFileName = oldImagesPath + item.old_name+item.ext;
        const newFileName = renamedImagesPath + item.new_name+item.ext;
        fs.renameSync(oldFileName, newFileName)
    })

};

// exportListImagesToCSV();
renameImages();