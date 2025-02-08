const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require('fs');

(async function () {

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });


    const client = await auth.getClient();
    google.options({ auth: client });



    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId)
        throw new Error("SPREADSHEET_ID not set");
    const generatedSlidesDir = process.env.STATIC_DIR || "lectures/_static"
    const labDir = process.env.LAB_DIR || "labs"
    const semesterRepo = process.env.SEMESTER || "f2024"

    const prefix = "| Date  | Topic | [Book Chapter](https://mlip-cmu.github.io/book/) | Reading | Assignment due |\n| -     | -     | -     | -       | -              |"
    console.log(prefix)


    function findSlidesLink(id) {
        if (id === undefined || id == "")
            return undefined

        const files = fs.readdirSync(generatedSlidesDir);
        const prefix = id.toString().padStart(2, '0') + '_';
        const slideDirectory = files.find(file => file.startsWith(prefix));
        if (slideDirectory === undefined)
            return undefined

        const htmlFile = fs.readdirSync(generatedSlidesDir + "/" + slideDirectory).find(file => file.endsWith(".html"));
        if (htmlFile === undefined)
            return undefined

        return `${slideDirectory}/${htmlFile}`
    }
    function findLabLink(id) {
        if (id === undefined || id == "")
            return undefined

        const files = fs.readdirSync(labDir);
        if (id.startsWith("lab")) {
            id = id.substring(3);
        }
        return files.find(file => file === "lab" + id + ".md");
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


            const gslides = [
                "https://docs.google.com/presentation/d/1ejvxrdLPHU-lp_xMwz4v35AjPHrt8KZtcr8-LsjIgOM/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1ejvxrdLPHU-lp_xMwz4v35AjPHrt8KZtcr8-LsjIgOM/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1ejvxrdLPHU-lp_xMwz4v35AjPHrt8KZtcr8-LsjIgOM/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1ejvxrdLPHU-lp_xMwz4v35AjPHrt8KZtcr8-LsjIgOM/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1ejvxrdLPHU-lp_xMwz4v35AjPHrt8KZtcr8-LsjIgOM/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1ejvxrdLPHU-lp_xMwz4v35AjPHrt8KZtcr8-LsjIgOM/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1ejvxrdLPHU-lp_xMwz4v35AjPHrt8KZtcr8-LsjIgOM/edit?usp=share_link"
            ]

            rows.map((row, index) => {
                if (row[0] !== 'Date' && row[0] != '' && row[0] != undefined) {
                    const date = row[columnIds.date] || "";
                    const id = row[columnIds.id] || "";
                    let topic = row[columnIds.topic] || "";
                    let assignment = row[columnIds.assignmentDue] || "";
                    const chapters = row[columnIds.bookChapters] || "";
                    const readings = row[columnIds.reading] || "";
                    const assignmentLink = row[columnIds.assignmentLink] || "";
                    let badges = ""
                    if (id.includes("lab"))
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

                    if (id.startsWith("lab")) {
                        const labLink = findLabLink(id)
                        if (labLink != undefined && labLink != "")
                            topic = `[${topic}](https://github.com/mlip-cmu/${semesterRepo}/blob/main/labs/${labLink})`
                    } else {
                        // const slidesLink = findSlidesLink(id)
                        // if (slidesLink != undefined && slidesLink != "") {
                            // const mdLink = slidesLink.replace(".html", ".md")
                            // const pdfLink = slidesLink.replace(".html", ".pdf")
                            // If index is in gslides
                        if (index < gslides.length) {
                            topic = `[${topic}](${gslides[index]})`
                        }
                        else {
                            topic = `${topic}`
                        }
                            // topic = `[${topic}](slides/${slidesLink}) ([md](https://github.com/mlip-cmu/${semesterRepo}/blob/main/lectures/${mdLink}), [pdf](slides/${pdfLink}))`

                        // }
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