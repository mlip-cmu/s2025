const {google} = require('googleapis');
const sheets = google.sheets('v4');

(async function (){

const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });

const client = await auth.getClient();
google.options({auth: client});


const prefix = "| Date  | Topic | Reading | Assignment due |\n| -     | -     | -       | -              |"

console.log(prefix)

sheets.spreadsheets.values.get({
    spreadsheetId: '1KWtPmFbMtOzsI0AkTeGLzHhnCZy_Z5SRR-Ud2PovN2U',
    range: 'A:J',
}, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        rows.map((row) => {if (row[0] !== 'Date' && row[0] != '' && row[0] != undefined) {
            const date = row[0] || ""
            const id = row[1]
            let topic = row[2] || ""
            let assignment = row[4] || ""
            const slidesLink = row[8]
            const chapters = row[9] || ""
            const readings = row[10] || ""
            const assignmentLink = row[11] || ""
            let badges = ""
            if (topic.includes("rec"))
                badges += "![Lab](https://img.shields.io/badge/-lab-yellow.svg) "
            if (topic.includes("midterm"))
                badges += "![Midterm](https://img.shields.io/badge/-midterm-blue.svg) "
            if (topic.includes("break"))
                badges += "![Break](https://img.shields.io/badge/-break-red.svg) "

            const chapterLinks = chapters?.split(',').map(chapter => {
                return `([${chapter.trim()}](https://mlip-cmu.github.io/book/${chapter.trim().padStart(2,'0')}/))`;
            }).join(',');

            if (slidesLink != undefined && slidesLink != "")
                topic = `[${topic}](${slidesLink})`

            if (assignmentLink != undefined && assignmentLink != "")
                assignment = `[${assignment}](${assignmentLink})`            
    
            console.log(`| ${date} | ${badges}${topic} (${chapterLinks}) | ${readings} | ${assignment} |`)
            
        }});
    } else {
        console.log('No data found.');
    }
    console.log("\n\n")
});


})();