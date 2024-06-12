const adminRouter = require('express').Router()
const fetch = require('node-fetch')
const User = require('../models/user')
const isAuthenticated = require('../utils/loginMiddleware')
const isVerified = require('../utils/verifiyMiddleware')
const isAdmin = require('../utils/adminAuthMiddleware')
const Product = require('../models/product')
let fs = require('fs')
const { Buffer } = require('buffer')

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')

const turkishtoEnglish = (text) => {
  return text
    .replace('Ğ', 'g')
    .replace('Ü', 'U')
    .replace('Ş', 'S')
    .replace('I', 'I')
    .replace('İ', 'I')
    .replace('Ö', 'O')
    .replace('Ç', 'C')
    .replace('ğ', 'g')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ı', 'i')
    .replace('ö', 'o')
    .replace('ç', 'c')
}

function capitalizeWords(str) {
  const arr = str.split(/\s+/).map((element) => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
  })
  return arr.join(' ')
}
function capitalizeNames(str) {
  let arr = str.split(/\n/).map((element) => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
  })
  arr = arr.map((element) => capitalizeWords(element))
  return arr.join(',\n')
}

const drawText = (
  page,
  text,
  textSize,
  y_dim,
  x_dim,
  font,
  color,
  alignment
) => {
  const { width, height } = page.getSize()
  let textWidth1 = font.widthOfTextAtSize(text, textSize)
  x_dim = x_dim === 0 ? width / 2 - textWidth1 / 2 : x_dim
  page.drawText(text, {
    x: x_dim,
    y: height - y_dim * 30,
    size: textSize,
    font: font,
    color: rgb(0, 0, 0),
  })
}

const createFields = (
  page,
  form,
  title,
  type,
  date,
  authors,
  citations,
  index,
  y_axis,
  rowNumber
) => {
  const titleField = form.createTextField(`titleField${rowNumber}`)
  titleField.setText(capitalizeWords(title))
  titleField.enableMultiline()
  titleField.addToPage(page, { x: 30, y: y_axis, width: 215, height: 54 })
  titleField.setFontSize(10)
  titleField.setAlignment(1)

  const typeField = form.createTextField(`typeField${rowNumber}`)
  // typeField.enableMultiline()
  type = type === 'conference paper' ? 'conf. paper' : type
  typeField.setText(capitalizeWords(type))
  typeField.addToPage(page, { x: 250, y: y_axis, width: 65, height: 54 })
  typeField.setFontSize(10)
  typeField.setAlignment(1)

  const authorsField = form.createTextField(`authorsField${rowNumber}`)
  authorsField.enableMultiline()
  authorsField.setText(capitalizeNames(authors))
  authorsField.addToPage(page, { x: 320, y: y_axis, width: 120, height: 54 })
  authorsField.setFontSize(10)
  authorsField.setAlignment(1)

  const dateField = form.createTextField(`dateField${rowNumber}`)
  dateField.setText(date)
  dateField.addToPage(page, { x: 445, y: y_axis, width: 30, height: 54 })
  dateField.setFontSize(10)
  dateField.setAlignment(1)

  const citationsField = form.createTextField(`citationsField${rowNumber}`)
  citationsField.setText(citations)
  citationsField.addToPage(page, { x: 480, y: y_axis, width: 40, height: 54 })
  citationsField.setFontSize(10)
  citationsField.setAlignment(1)

  const indexField = form.createTextField(`indexField${rowNumber}`)
  indexField.setText(index)
  indexField.addToPage(page, { x: 525, y: y_axis, width: 40, height: 54 })
  indexField.setFontSize(10)
  indexField.setAlignment(1)
}

const renderReportFirstPage = async (reportPDF, products) => {
  const timesRomanBold = await reportPDF.embedFont(StandardFonts.TimesRomanBold)

  const pages = reportPDF.getPages()

  const page = pages[0]
  const form = reportPDF.getForm()

  // form
  drawText(page, 'Title', 11, 12, 35, timesRomanBold)
  drawText(page, 'Type', 11, 12, 255, timesRomanBold)
  drawText(page, 'Authors', 11, 12, 325, timesRomanBold)
  drawText(page, 'Year', 11, 12, 445, timesRomanBold)
  drawText(page, 'Ciations', 11, 12, 480, timesRomanBold)
  drawText(page, 'Indexed', 11, 12, 525, timesRomanBold)

  let rowNumber = 1
  let y_axis = 410
  // first page
  for (let i = 0; i < 7 && i < products.length; i++) {
    createFields(
      page,
      form,
      products[i].title,
      products[i].type,
      products[i].publication_date.toString(),
      turkishtoEnglish(products[i].authors.slice(0, 4).join('\n')),
      products[i].citations.toString(),
      products[i].sciIndex,
      y_axis - (rowNumber - 1) * 60,
      rowNumber++
    )
  }
  form.flatten()

  drawText(page, `1`, 12, 27.5, 290, timesRomanBold)
}

const renderReportOtherPages = async (reportPDF, products) => {
  const timesRomanBold = await reportPDF.embedFont(StandardFonts.TimesRomanBold)

  for (let j = 0; j < Math.ceil((products.length - 7) / 12); j++) {
    const page = reportPDF.addPage()
    const form = reportPDF.getForm()

    // form
    drawText(page, 'Title', 11, 2, 35, timesRomanBold)
    drawText(page, 'Type', 11, 2, 255, timesRomanBold)
    drawText(page, 'Authors', 11, 2, 325, timesRomanBold)
    drawText(page, 'Year', 11, 2, 445, timesRomanBold)
    drawText(page, 'Ciations', 11, 2, 480, timesRomanBold)
    drawText(page, 'Indexed', 11, 2, 525, timesRomanBold)

    let rowNumber = 1
    let y_axis = 710
    // first page
    for (let i = 7 + j * 12; i < 7 + j * 12 + 12 && i < products.length; i++) {
      createFields(
        page,
        form,
        products[i].title,
        products[i].type,
        products[i].publication_date.toString(),
        turkishtoEnglish(products[i].authors.slice(0, 4).join('\n')),
        products[i].citations.toString(),
        products[i].sciIndex,
        y_axis - (rowNumber++ - 1) * 60,
        i + j
      )
    }
    form.flatten()

    drawText(page, `${j + 2}`, 12, 27.5, 290, timesRomanBold)
  }
}

async function createPdf(products) {
  const pdfDoc = await PDFDocument.create()
  const pngUrl =
    'https://upload.wikimedia.org/wikipedia/tr/5/5f/Ankara_%C3%9Cniversitesi_logosu.png'
  const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
  const pngImage = await pdfDoc.embedPng(pngImageBytes)
  const pngDims = pngImage.scale(0.5)
  const page = pdfDoc.addPage()
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

  // page titles
  drawText(page, 'ANKARA UNIVERSITY', 14, 2.5, 0, timesRomanBold)
  drawText(page, 'ENGINEERING FACULTY', 14, 3.25, 0, timesRomanBold)
  drawText(page, 'DEPARTMENT OF COMPUTER ENGINEERING', 14, 4, 0, timesRomanBold)

  page.drawImage(pngImage, {
    x: page.getWidth() / 2 - pngDims.width / 2,
    y: page.getHeight() - (pngDims.height + 130),
    width: pngDims.width,
    height: pngDims.height,
  })

  drawText(page, 'ACADEMIC PRODUCTS REPORT', 14, 10.5, 0, timesRomanBold)

  renderReportFirstPage(pdfDoc, products)
  renderReportOtherPages(pdfDoc, products)
  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
///admin routes
adminRouter.get(
  '/pendingAccounts',
  [isAuthenticated, isVerified, isAdmin],
  async (request, response) => {
    const adminId = request.userId
    const admin = await User.findOne({ _id: adminId })
    const adminDepartment = admin.department
    const pendingUsers = await User.find({
      status: 'pending',
      department: adminDepartment,
    })
    response.json(pendingUsers).status(200)
  }
)

adminRouter.put(
  '/pendingAccounts/:id',
  [isAuthenticated, isVerified, isAdmin],
  async (request, response) => {
    const body = request.body
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { status: body.status },
      { new: true }
    )
    response.status(200).json(updatedUser)
  }
)

adminRouter.get(
  '/departmentAccounts',
  [isAuthenticated, isVerified, isAdmin],
  async (request, response) => {
    const adminId = request.userId
    const admin = await User.findOne({ _id: adminId })
    const adminDepartment = admin.department
    let departmentUsers = await User.find({ department: adminDepartment })
    departmentUsers = departmentUsers.filter((user) => user.id !== adminId)
    response.json(departmentUsers).status(200)
  }
)

adminRouter.post(
  '/filter',
  [isAuthenticated, isVerified, isAdmin],
  async (request, response) => {
    const adminId = request.userId
    const admin = await User.findOne({ _id: adminId })
    const adminDepartment = admin.department

    const body = request.body
    const departmentUsers = await User.find({
      department: 'computer engineering',
    })
    const products = await Product.find({
      citations: {
        $lte: body.citationsLessThan ? parseInt(body.citationsLessThan) : 10000,
        $gte: body.citationsMoreThan ? parseInt(body.citationsMoreThan) : 0,
      },
      publication_date: {
        $lte: body.dateBefore
          ? parseInt(body.dateBefore)
          : new Date().getFullYear(),
        $gte: body.dateAfter ? parseInt(body.dateAfter) : 1922,
      },
      title: body.title ? new RegExp(`${body.title}+`, 'i') : /.*/,
      type:
        body.type && body.type !== 'All'
          ? new RegExp(`${body.type}+`, 'i')
          : /.*/,
      // authors: body.authors ? new RegExp(`${body.authors}+`, 'i') : /.*/,
      authors:
        body.authors && body.authors.some((author) => author)
          ? {
              $in: authors
                .filter((author) => author)
                .map((author) => new RegExp(author, 'i')),
            }
          : /.*/,
      publisher: body.publisher ? new RegExp(`${body.publisher}+`, 'i') : /.*/,
    })
    response.status(200).json(products)
  }
)

adminRouter.post(
  '/filter/create-pdf',
  [isAuthenticated, isVerified, isAdmin],
  async (request, response) => {
    const products = request.body
    const pdfBytes = await createPdf(products)
    const pdfBuffer = Buffer.from(pdfBytes) // Convert Uint8Array to Buffer

    response.end(pdfBuffer)
  }
)

module.exports = adminRouter
