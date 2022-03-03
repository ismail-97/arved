const { TestWatcher } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

const initialUsers = [
    {
        title: "Dr.",
        name: "adnan",
        surname: "mostafa",
        academicId: "18297650",
        email: "adnan@ankara.edu.tr",
        password: "123Edsaqww",
        repeatedPassword: "123Edsaqww",
        faculty: "engineering",
        department: "biomedical",
        fields: ["Computer Vision"],
        isVerified: true
    },
    {
        title: "Dr.",
        name: "ismail",
        surname: "dewidar",
        academicId: "182906532",
        email:"ismail@ankara.edu.tr",
        password: "123Edsaqww",
        repeatedPassword: "123Edsaqww",
        faculty: "engineering",
        department:"computer",
        fields: ["AI"],
    }
] 
let token = null

beforeEach(async () => {
    await User.deleteMany({})
    for (let user of initialUsers) {
        if (user.password === user.repeatedPassword) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(user.password, saltRounds)
            const userObject = new User({
                ...user,
                passwordHash: passwordHash,
                role: 'user',
                status: 'pending'
            })
            await userObject.save()
        }
    }
})

describe('getting user info', () => {

    test('user email should be verified before getting his info', async () => {
        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .get('/user/info')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: user Is not verified yet by the admin')
    })

    test('can\'t get user info without authentication', async () => {
        await api
            .get('/user/info')
            .expect(401)
            .expect('eroor: access denied: token missing')
    })

    test('getting user info succeeds', async () => {
        const loggedUser = {
            email:"adnan@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .get('/user/info')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
    
})

describe('editing user account', () => {

    test('user email should be verified before editing his account', async () => {
        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .get('/user/info')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: user Is not verified yet by the admin')        
    })

    test('can\'t edit user info without authentication', async () => {
        await api
            .put('/user/editAccount')
            .send({name: "salih"})
            .expect(401)
            .expect('eroor: access denied: token missing')
    })

    test('editing user info succeeds', async () => {
        const loggedUser = {
            email:"adnan@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .put('/user/editAccount')
            .send({name: "adnanovich"})
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})

describe('changing user password', () => {

    test('user can change his password even if his email is not verified', async () => {
        let loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .put('/user/change-password')
            .send(
                {
                    oldPassword: "123Edsaqww",
                    newPassword: "12345678",
                    repeatedNewPassword: "12345678"
                }
            )
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        
        loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"12345678"   
        }
        await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
    })
    test('can\'t change password without authentication', async () => {
        await api
            .put('/user/change-password')
            .send(
                {
                    oldPassword: "123Edsaqww",
                    newPassword: "12345678",
                    repeatedNewPassword: "12345678"
                }
            )
            .expect(401)
    })
    test('new passwords should be the same', async () => {
        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .put('/user/change-password')
            .send(
                {
                    oldPassword: "123Edsaqww",
                    newPassword: "12345678",
                    repeatedNewPassword: "012345678"
                }
            )
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .expect('passwords have to be compatible')
    })    
})