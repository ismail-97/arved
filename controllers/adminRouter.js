const adminRouter = require('express').Router()
const User = require('../models/user')
const isAuthenticated = require('../utils/loginMiddleware')
const isVerified = require('../utils/verifiyMiddleware')
const isAdmin = require('../utils/adminAuthMiddleware')
const Product = require('../models/product')

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')

async function createPdf() {
    const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

    const pdfBytes = await pdfDoc.save()

    return pdfBytes
}
///admin routes
adminRouter
    .get('/pendingAccounts',
        [isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const pendingUsers = await User.find({ status: "pending" })
            response.status(200).json(pendingUsers) 
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
    .get('/allAccounts',
        [isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const adminId = request.userId
            const admin = await User.findOne({ _id: adminId })
            const adminDepartment = admin.department
            const departmentUsers = await User.find({ department: adminDepartment })
            console.log(departmentUsers)
            response.status(200).json(departmentUsers)         
        })

adminRouter
    .get('/filter',
        [isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const products = await Product
                .find(request.query)
                .where("publication_date")
                .gt(request.query.start)
                .lt(request.query.end)
            response.status(200).json(products)         
        })  

adminRouter
    .get('/filter/create-pdf',
        //[isAuthenticated, isVerified, isAdmin],
        async (request, response) => {
            const products = request.body
            const pdfBytes = await createPdf()
            response.setHeader('Content-disposition', 'attachment; filename=ismail.pdf');
            response.setHeader('content-type', 'application/pdf');
            response.send(pdfBytes)       
        }) 
module.exports = adminRouter
