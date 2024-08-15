const fs = require('fs');
const path = require('path');
const { marked } = require('marked');


const args = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 [-r] <directory>')
    .boolean('verbose')
    .alias('v', 'verbose')
    .boolean('recursive')
    .alias('r', 'recursive')
    .check((argv, options) => {
        const dirs = argv._
        if (dirs.length === 0) {
          throw new Error("No directory provided")
        } else {
          return true
        }
      })
    .argv

const dirs = args._
const isRecursive = args['recursive'] ?? false


function processFile(file) {
    if (file.endsWith(".md"))
        checkMarkdownFile(file)
}
function processDirectory(dir) {
    const d = fs.opendirSync(dir)
    let dirent
    while ((dirent = d.readSync()) !== null) {
        processFileOrDirectory(path.join(dir, dirent.name), false)
    }
    d.closeSync()
}
function processFileOrDirectory(dir, init) {
    if (fs.existsSync(dir)) {
        var stats = fs.statSync(dir)
        if (!stats.isDirectory())
            processFile(dir)
        else if (init || isRecursive)
            processDirectory(dir)
    } else console.error("file not found "+dir)
}

let imgs = []
let pwd = '.'
const renderer = {
    image(href, title, text) {
        if (href.indexOf("://")<0)
            imgs.push(path.join(pwd,href))
    }
}
marked.use({renderer})

const imgExtensions = ['.jpg', '.jpeg', '.webp', '.gif', '.svg', '.png']
function findImages(dir) {
        const result = []
        const d = fs.opendirSync(dir)
        let dirent
        while ((dirent = d.readSync()) !== null) {
            const ext = path.extname(dirent.name).toLowerCase()
            if (imgExtensions.indexOf(ext)>=0)
                result.push(path.join(dir, dirent.name))
        }
        d.closeSync()
        return result
}


function checkMarkdownFile(file) {
    imgs = []
    pwd = path.dirname(file)
    const content = fs.readFileSync(file, 'utf8')
    marked.parse(content)
    
    for (const img of imgs)
        if (!fs.existsSync(img))
            console.log("# Image not found: "+img)
        else if (args['v'])
            console.log('# Image found: '+img)


    const actual = findImages(pwd)
    for (const a of actual) 
        if (imgs.indexOf(a)<0)
            console.log('# Image not referenced: '+a+'\nrm '+a)

        
}



for (const dir of dirs) 
    processFileOrDirectory(dir, true)


