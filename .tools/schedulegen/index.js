const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require('fs');

(async function () {

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });

    const generatedSlidesDir = "lectures/_static"

    const client = await auth.getClient();
    google.options({ auth: client });



    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId)
        throw new Error("SPREADSHEET_ID not set");

    const prefix = "| Date  | Topic | [Book Chapter](https://mlip-cmu.github.io/book/) | Reading | Assignment due |\n| -     | -     | -     | -       | -              |"
    console.log(prefix)


    function findSlidesLink(id) {
        if (id===undefined || id == "")
            return undefined

        const files = fs.readdirSync(generatedSlidesDir);
        const prefix = id.toString().padStart(2, '0') + '_';
        const slideDirectory = files.find(file => file.startsWith(prefix));
        if (slideDirectory === undefined)
            return undefined

        const htmlFile = fs.readdirSync(generatedSlidesDir+"/"+slideDirectory).find(file => file.endsWith(".html"));
        if (htmlFile === undefined)
            return undefined
        
        return `${slideDirectory}/${htmlFile}`
    }


    sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'A:Z',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            const columnIds = { date: null, topic: null, assignmentDue: null, slidesLink: null, bookChapters: null, reading: null, assignmentLink: null, id: null };
            rows[0].forEach((header, index) => { 
                if (header === "Date") columnIds.date = index; 
                else if (header === "Topic") columnIds.topic = index; 
                else if (header === "Assignment due") columnIds.assignmentDue = index;
                else if (header === "Book chapters") columnIds.bookChapters = index;
                else if (header === "Reading") columnIds.reading = index;
                else if (header === "Assignment link") columnIds.assignmentLink = index;
                else if (header === "Id") columnIds.id = index;
            });



            rows.map((row) => {
                if (row[0] !== 'Date' && row[0] != '' && row[0] != undefined) {
                    const date = row[columnIds.date] || "";
                    const id = row[columnIds.id];
                    let topic = row[columnIds.topic] || "";
                    let assignment = row[columnIds.assignmentDue] || "";
                    const chapters = row[columnIds.bookChapters] || "";
                    const readings = row[columnIds.reading] || "";
                    const assignmentLink = row[columnIds.assignmentLink] || "";
                    let badges = ""
                    if (id.includes("rec"))
                        badges += "![Lab](https://img.shields.io/badge/-lab-yellow.svg) "
                    if (id.includes("midterm"))
                        badges += "![Midterm](https://img.shields.io/badge/-midterm-blue.svg) "
                    if (id.includes("break"))
                        badges += "![Break](https://img.shields.io/badge/-break-red.svg) "

                    const chapterLinks = chapters?.split(',').map(chapter => {
                        return `[${chapter.trim()}](https://mlip-cmu.github.io/book/${chapter.trim().padStart(2, '0')}/)`;
                    }).join(',');

                    if (assignmentLink != undefined && assignmentLink != "")
                        assignment = `[${assignment}](${assignmentLink})`

                    const slidesLink = findSlidesLink(id)
                    if (slidesLink != undefined && slidesLink != "") {
                        const mdLink = slidesLink.replace(".html", ".md")
                        const pdfLink = slidesLink.replace(".html", ".pdf")
                        topic = `[${topic}](slides/${slidesLink}) ([md](https://github.com/mlip-cmu/s2024/blob/main/lectures/${mdLink}), [pdf](slides/${pdfLink}))`
                    }

                    console.log(`| ${date} | ${badges}${topic} | ${chapterLinks} | ${readings} | ${assignment} |`)

                }
            });
        } else {
            console.log('No data found.');
        }
        console.log("\n\n")
    });


})();