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
                "https://docs.google.com/presentation/d/1OAK3FuWuBng8dmgyE9VYkXm-yq72F35fF89OEpxPi8Q/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1l3R9O6F9JkbsJsaH2GrelqMTKM1IGOO5FFLAdOCpT8o/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1e3OTUsCNU0wc8Ln0FVKYbfuLmRFxDNrAQj6M_kOHRlI/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1x6lddGD-hGVUaN0m3I4EWYzdrxue8CuiN1lKHAUN3eA/edit?usp=share_link",
                "https://docs.google.com/presentation/d/10Be6psctUgjyFNXwcdCAnbRoO7_kzvkIxS-VazHLjOc/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1NGU9NvdVRSMQIYRijITbHMBq31S8VVGNrEvljouUoPc/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1bKpxNjj4vMw18ehZhUXeFweiFVcFugfUceHC2Ul-8yo/edit?usp=share_link",
                "https://docs.google.com/presentation/d/1q1GRWMqFahiov52q9-TzWcXPgn1m76WYY9HIKbWfzZI/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1dZZyF9Tyr1j_56ADQ5TGCamXfJOe7jsC3cHwdgGQ-eE/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1atgZUMUM-KfbofJ3J3f7X67oV6xl2PlDqy1hHXeypHk/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1hSMGmxgGhjDsXE6qByQUwggKgk_hBAWg0DiIqeV8D3k/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1myluYkJ9DJQRW5Kaf5jHQaFwbPafQ8ZcNFXmYWLONNU/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1wCCsDRZCAfFiE3KV6LvwE2A29OmNrKznp3DMKKc8NP0/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1OBlWdHWi6eJQyxeshEkiObqpp7Ma0vqrQ2i33Opy0yU/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1MKWAvPmI1HJgC_OhsZ1O7JNeUnOpQ5NF_mGe1lBC76I/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1--GXCY3ute7gx1LOr1ceR2Ff7Y82wlTxgYZBZPXVt0U/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1NYsfR0mL4q1QO78T9IiothLTv4QbUfFnc-RzVqPYktg/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1zei6QRXTYcdU3Au4aimxMRAQCBpPlVDoUglbKrsOkKU/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1o76e6p5Fy5pnLE_zJY5x-f31UGJrH0HNpGK2mBwBCDE/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1TguK8lQkklfIUSeqkl96sr-wOVVMiFbnHZuKxJTl7jo/edit?usp=sharing",
                "https://docs.google.com/presentation/d/1DXxoyhqrJZHvXTIthvfs9w2Lfph82XD5YX_A1eHZSc8/edit?usp=sharing"
            ];
            let index = 0;
            rows.map((row) => {
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
                    }
                    else if (id.includes("guest")) {
                    }
                    else {

                        // const slidesLink = findSlidesLink(id)
                        // if (slidesLink != undefined && slidesLink != "") {
                            // const mdLink = slidesLink.replace(".html", ".md")
                            // const pdfLink = slidesLink.replace(".html", ".pdf")
                            // If index is in gslides
                        if (badges == "") {
                            if (index < gslides.length) {
                                topic = `[${topic}](${gslides[index]})`
                            }
                            else {
                                topic = `${topic}`
                            }
                            index++;
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
