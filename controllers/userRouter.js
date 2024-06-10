const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const isAuthenticated = require('../utils/loginMiddleware')
const isVerified = require('../utils/verifiyMiddleware')

userRouter.get(
  '/info',
  [isAuthenticated, isVerified],
  async (request, response) => {
    const userId = request.userId
    const user = await User.findById(userId)
    response.status(200).json(user)
  }
)

userRouter.put(
  '/edit-user',
  [isAuthenticated, isVerified],
  async (request, response) => {
    const body = request.body
    const updatedUser = await User.findByIdAndUpdate(request.userId, body, {
      new: true,
    })
    response.status(200).json(updatedUser)
  }
)

userRouter.put(
  '/change-password',
  [isAuthenticated],
  async (request, response) => {
    const { oldPassword, newPassword } = request.body
    const userId = request.userId
    const user = await User.findOne({ _id: userId })

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(oldPassword, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'wrong old password',
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { passwordHash: passwordHash },
      { new: true }
    )
    response.json(updatedUser).status(200)
  }
)

module.exports = userRouter
