const adminRouter = require('express').Router()
const User = require('../models/user')
const isAuthenticated = require('../utils/loginMiddleware')
const isVerified = require('../utils/verifiyMiddleware')
const isAdmin = require('../utils/adminAuthMiddleware')
const Product = require('../models/product')
let fs = require('fs');

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')


function capitalizeWords(str) {
    
    const arr = str.split(/\s+/).map(element => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
    return arr.join(' ')
}
function capitalizeNames(str) {
    let arr = str.split(/\n/).map(element => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
    arr = arr.map( element => capitalizeWords(element) )
    return arr.join('\n')
}

const drawText = (page, text, textSize, y_dim, x_dim, font, color, alignment, ) => {

    const { width, height } = page.getSize()
    let textWidth1 = font.widthOfTextAtSize(text, textSize)
    x_dim = x_dim === 0 ?
            width / 2 - textWidth1 / 2 :
            x_dim
    page.drawText(text, {
        x: x_dim,
        y: height - y_dim * 30,
        size: textSize,
        font: font,
        color: rgb(0, 0, 0)
    })
}
const createFields = (page, form, title, type, date, authors, citations, y_axis, rowNumber) => {
    const titleField = form.createTextField(`titleField${rowNumber}`)
    titleField.setText(capitalizeWords(title))
    titleField.enableMultiline()
    titleField.addToPage(page, { x: 30, y: y_axis, width: 235, height: 54 })
    titleField.setFontSize(12)
    titleField.setAlignment(0)

    const typeField = form.createTextField(`typeField${rowNumber}`)
    // typeField.enableMultiline()
    typeField.setText(capitalizeWords(type))
    typeField.addToPage(page, { x: 270, y: y_axis, width: 75, height: 54 })
    typeField.setFontSize(12)
    typeField.setAlignment(1)

    const dateField = form.createTextField(`dateField${rowNumber}`)
    dateField.setText(date)
    dateField.addToPage(page, { x: 350, y: y_axis, width: 35, height: 54 })
    dateField.setFontSize(12)
    dateField.setAlignment(1)

    const authorsField = form.createTextField(`authorsField${rowNumber}`)
    authorsField.enableMultiline()
    authorsField.setText(capitalizeNames(authors))
    authorsField.addToPage(page, { x: 390, y: y_axis, width: 150, height: 54 })
    authorsField.setFontSize(12)
    authorsField.setAlignment(1)

    const citationsField = form.createTextField(`citationsField${rowNumber}`)
    citationsField.setText(citations)
    citationsField.addToPage(page, { x: 545, y: y_axis, width: 30, height: 54 })
    citationsField.setFontSize(12)
    citationsField.setAlignment(1)

}
async function createPdf(products) {
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
    const courier = await pdfDoc.embedFont(StandardFonts.Courier)

    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const fontSize = 30

    // page titles
    drawText(page, 'Ankara Üniversitesi', 40, 3, 0, timesRomanFont)
    drawText(page, 'Computer Engineering Department', 30, 4.5, 0, timesRomanFont)
    drawText(page, 'Academic Products Report', 25, 6, 0, timesRomanFont)

    // form
    drawText(page, 'Title', 14, 8, 40, timesRomanBold)
    drawText(page, 'Type', 14, 8, 290, timesRomanBold)
    drawText(page, 'Date', 14, 8, 352, timesRomanBold)
    drawText(page, 'Authors', 14, 8, 435, timesRomanBold)
    drawText(page, 'Ciations', 14, 8, 529, timesRomanBold)

    const form = pdfDoc.getForm()
    let rowNumber = 1
    let y_axis = 530
    products.map((product) => {
        createFields(page, form,
            product.title,
            product.type,
            product.publication_date.toString(),
            product.authors.slice(0, 3).join('\n'),
            product.citations.toString(),
            y_axis-(rowNumber-1)*60,
            rowNumber++
        );        
    })

    if (products.length > 9) {
        rowNumber = 1
        const page = pdfDoc.addPage()
        drawText(page, 'Title', 14, 8, 40, timesRomanBold)
        drawText(page, 'Type', 14, 8, 290, timesRomanBold)
        drawText(page, 'Date', 14, 8, 352, timesRomanBold)
        drawText(page, 'Authors', 14, 8, 435, timesRomanBold)
        drawText(page, 'Ciations', 14, 8, 529, timesRomanBold)     
        for (let i = 0; i < products.length; i++) {
            createFields(page, form,
                product.title,
                product.type,
                product.publication_date.toString(),
                product.authors.slice(0, 3).join('\n'),
                product.citations.toString(),
                y_axis-(rowNumber-1)*60,
                rowNumber++
            );       
        }
    }

    // createFields(page, form,
    //     'face detection using AI technology.',
    //     'project',
    //     "2017",
    //     'ismail dewidar\nsherif mostafa\nadnan kashlan',
    //     "85",
    //     y_axis-(rowNumber-1)*60,
    //     rowNumber++
    // );
    // createFields(page, form,
    //     'letter recognition using machine learning.',
    //     'conference paper',
    //     "2010",
    //     'sherif mostafa\nadnan kashlan',
    //     "72",
    //     y_axis-(rowNumber-1)*60,
    //     rowNumber++
    // );
    // createFields(page, form,
    //     'A new approach to the reconstruction of contour lines extracted from topographic maps.',
    //     'article',
    //     "2022",
    //     'refik samet',
    //     "65",
    //     y_axis-(rowNumber-1)*60,
    //     rowNumber++
    // );
    // createFields(page, form,
    //     'face detection using AI technology.',
    //     'project',
    //     "2017",
    //     'ismail dewidar\nsherif mostafa\nadnan kashlan',
    //     "85",
    //     y_axis-(rowNumber-1)*60,
    //     rowNumber++
    // );
    // // createFields(page, form,
    //     'letter recognition using machine learning.',
    //     'conference paper',
    //     "2010",
    //     'sherif mostafa\nadnan kashlan',
    //     "72",
    //     y_axis-(rowNumber-1)*60,
    //     rowNumber++
    // );
    // createFields(page, form,
    //     'A new approach to the reconstruction of contour lines extracted from topographic maps.',
    //     'article',
    //     "2022",
    //     'refik samet',
    //     "65",
    //     y_axis-(rowNumber-1)*60,
    //     rowNumber++
    // );
    // createFields(page, form,
    //     'face detection using AI technology.',
    //     'project',
    //     "2017",
    //     'ismail dewidar\nsherif mostafa\nadnan kashlan',
    //     "85",
    //     y_axis-(rowNumber-1)*60,
    //     rowNumber++
    // );

    form.flatten();
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
}
///admin routes
adminRouter
    .get('/pendingAccounts',
        [isAuthenticated, isVerified, isAdmin],
        async (request, response) => {         
            const adminId = request.userId
            const admin = await User.findOne({ _id: adminId })
            const adminDepartment = admin.department            
            const pendingUsers = await User.find({ status: "pending", department: adminDepartment })
            response.json(pendingUsers).status(200)
})

adminRouter
    .put('/pendingAccounts/:id',
        [isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const body = request.body
            const updatedUser = await User.findByIdAndUpdate(
                request.params.id,
                { status: body.status },
                { new: true }
            )
            response.status(200).json(updatedUser)
        })

adminRouter
    .get('/departmentAccounts',
        [isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const adminId = request.userId
            const admin = await User.findOne({ _id: adminId })
            const adminDepartment = admin.department
            let departmentUsers = await User.find({ department: adminDepartment })
            departmentUsers = departmentUsers.filter( user => user.id !== adminId)
            console.log(departmentUsers)
            response.json(departmentUsers).status(200)         
        })

adminRouter
    .post('/filter',
        [isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const adminId = request.userId
            const admin = await User.findOne({ _id: adminId })
            const adminDepartment = admin.department

            const body = request.body
            const products = await Product.find(
                {
                    citations: {
                        $lte: body.citationsLessThan ?
                            parseInt(body.citationsLessThan) : 10000,
                        $gte: body.citationsMoreThan ?
                            parseInt(body.citationsMoreThan) : 0
                    },
                    publication_date: {
                        $lte: body.dateBefore ?
                            parseInt(body.dateBefore) :  new Date().getFullYear(),
                        $gte: body.dateAfter ?
                            parseInt(body.dateAfter) : 1922
                    },
                    title: body.title ?
                        new RegExp( "^" + body.title, 'i'): /.*/,
                    type: body.type && body.type !== "All" ?
                        new RegExp( "^" + body.type, 'i') : /.*/,
                    authors: body.authors ?
                        new RegExp( "^" + body.authors, 'i'): /.*/,
                    publisher: body.publisher ?
                        new RegExp( "^" + body.publisher, 'i') : /.*/,
                    department: adminDepartment
                })
                console.log(adminDepartment)

            console.log(products)
            response.status(200).json(products)         
        })

adminRouter
    .post('/filter/create-pdf',
        //[isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            console.log("i am here")

            const products = request.body
            console.log(products)
            const pdfBytes = await createPdf(products)
            response.end(pdfBytes);
        }) 

        
module.exports = adminRouter
