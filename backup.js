// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "skill_swap",
//     queryFormat: function(query, values){
//         if(!values) return query;
//         return query.replace(
//             /\:(\w+)/g,
//             function(txt, key){
//                 if(values.hasOwnProperty(key)){
//                     return this.escape(values[key]);
//                 }
//                 return txt;
//             }.bind(this)
//         )
//     }
// });


// const outputFile = 'output.pdf';
// db.query('SELECT * FROM share_experience', async (error, result) => {
//     if(error){
//         console.log(error);
//     }
//     const inputFile = result[0];
//     const data = inputFile.materials;
//     const buf = new Buffer(data, "binary");
//     fs.writeFileSync(outputFile, buf);
// });
// console.log(input);

// function readFile(file){
//     const bitmap = fs.readFileSync(file);
//     const buf = new Buffer(bitmap);
//     return buf;
// }

// const partialsPath = path.join(__dirname, ".views/partials");
// hbs.registerPartials(partialsPath);