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

    console.log(str)
    let arr = str.split(/\n/).map(element => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
    arr = arr.map(element => capitalizeWords(element))
    console.log(arr)
    console.log(arr.join('\n'))

    return arr.join('\n')
}

const drawText = (page, text, textSize, y_dim, x_dim, font, color, alignment, ) => {

    const { width, height } = page.getSize()
    let textWidth1 = font.widthOfTextAtSize(text, textSize)
    x_dim = x_dim === 0 ?
            width / 2 - textWidth1 / 2 :
            x_dim
    page.drawText(text, {
        x: x_dim ,
        y: height - y_dim * 30,
        size: textSize,
        font: font,
        color: rgb(0, 0, 0)
    })
}

const createFields = (page, form, title, type, date, authors, citations, y_axis, rowNumber) => {
    console.log("rowNumber == ", rowNumber)
    console.log("title == ", title)
    console.log(" ============= ")
    console.log(" ")
    const titleField = form.createTextField(`titleField${rowNumber}`)
    titleField.setText(capitalizeWords(title))
    titleField.enableMultiline()
    titleField.addToPage(page, { x: 30, y: y_axis, width: 235, height: 54 })
    titleField.setFontSize(10)
    titleField.setAlignment(0)

    const typeField = form.createTextField(`typeField${rowNumber}`)
    // typeField.enableMultiline()
    type = type === "conference paper" ? "conf. paper" : type
    typeField.setText(capitalizeWords(type))
    typeField.addToPage(page, { x: 270, y: y_axis, width: 75, height: 54 })
    typeField.setFontSize(10)
    typeField.setAlignment(1)

    const dateField = form.createTextField(`dateField${rowNumber}`)
    dateField.setText(date)
    dateField.addToPage(page, { x: 350, y: y_axis, width: 35, height: 54 })
    dateField.setFontSize(10)
    dateField.setAlignment(1)

    const authorsField = form.createTextField(`authorsField${rowNumber}`)
    authorsField.enableMultiline()
    authorsField.setText(capitalizeNames(authors))
    authorsField.addToPage(page, { x: 390, y: y_axis, width: 150, height: 54 })
    authorsField.setFontSize(10)
    authorsField.setAlignment(1)

    const citationsField = form.createTextField(`citationsField${rowNumber}`)
    citationsField.setText(citations)
    citationsField.addToPage(page, { x: 545, y: y_axis, width: 30, height: 54 })
    citationsField.setFontSize(10)
    citationsField.setAlignment(1)

}

const renderReportFirstPage = async (reportPDF, products) => {

    const timesRomanFont = await reportPDF.embedFont(StandardFonts.TimesRoman)
    const timesRomanBold = await reportPDF.embedFont(StandardFonts.TimesRomanBold)

    const pages = reportPDF.getPages()

    const page = pages[0]
    const form = reportPDF.getForm()

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

    let rowNumber = 1
    let y_axis = 530
    // first page
    for (let i = 0; i < 9; i++) {
        createFields(page, form,
            products[i].title,
            products[i].type,
            products[i].publication_date.toString(),
            products[i].authors.slice(0, 4).join('\n'),
            products[i].citations.toString(),
            y_axis-(rowNumber-1)*60,
            rowNumber++
        );       
    }
    form.flatten();

    drawText(page, `1`, 15, 27.5, 290, timesRomanBold)


}

const renderReportOtherPages = async (reportPDF, products) => {
    const timesRomanFont = await reportPDF.embedFont(StandardFonts.TimesRoman)
    const timesRomanBold = await reportPDF.embedFont(StandardFonts.TimesRomanBold)

    for (let j = 0; j < Math.ceil((products.length - 9) / 12); j++){

        const page = reportPDF.addPage()
        const form = reportPDF.getForm()
    
        // form
        drawText(page, 'Title', 14, 2, 40, timesRomanFont)
        drawText(page, 'Type', 14, 2, 290, timesRomanFont)
        drawText(page, 'Date', 14, 2, 352, timesRomanFont)
        drawText(page, 'Authors', 14, 2, 435, timesRomanFont)
        drawText(page, 'Ciations', 14, 2, 529, timesRomanFont)
    
        form.flatten();
    
        let rowNumber = 1
        let y_axis = 710
        // first page
        for (let i = 9 + j * 12; i < products.length; i++) {
            createFields(page, form,
                products[i].title,
                products[i].type,
                products[i].publication_date.toString(),
                products[i].authors.slice(0, 4).join('\n'),
                products[i].citations.toString(),
                y_axis-(rowNumber-1)*60,
                i + j + rowNumber++
            );       
        }

        drawText(page, `${j+2}`, 15, 27.5, 290, timesRomanBold)
    }


}

async function createPdf(products) {
    
    const pdfDoc = await PDFDocument.create()
    renderReportFirstPage(pdfDoc, products)
    renderReportOtherPages(pdfDoc, products)
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
            const departmentUsers = await User.find({ department: "computer engineering"})
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
                        new RegExp(`${body.title}+`, 'i') : /.*/,
                    type: body.type && body.type !== "All" ?
                        new RegExp(`${body.type}+`, 'i') : /.*/,
                    authors: body.authors ?
                        new RegExp(`${body.authors}+`, 'i'): /.*/,
                    publisher: body.publisher ?
                        new RegExp(`${body.publisher}+`, 'i') : /.*/,
                })
            response.status(200).json(products)         
        })

adminRouter
    .post('/filter/create-pdf',
        //[isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const products = request.body
            console.log("products === ", products)
            const pdfBytes = await createPdf(products)
            response.end(pdfBytes);
        }) 

        
module.exports = adminRouter
