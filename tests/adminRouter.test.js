const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
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
        isVerified: true,
        role: 'user',
        status: 'pending'
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
        role: 'user',
        status: 'pending'
    },
    {
        title: "Dr.",
        name: "ahmed",
        surname: "kamal",
        academicId: "182906530",
        email:"ahmed@ankara.edu.tr",
        password: "123Edsaqww",
        repeatedPassword: "123Edsaqww",
        faculty: "engineering",
        department:"computer",
        fields: ["AI"],
        role: 'admin',
        isVerified: true,
        status: 'approved'
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
            })
            await userObject.save()
        }
    }
})

describe('getting all pending accounts', () => {
    test('user must be authenticated to have access to pending accounts', async () => {        
        await api
            .get('/admin/pendingAccounts')
            .expect(401)
            .expect('eroor: access denied: token missing')
    })
    test('user email must be verified to have access to pending accounts', async () => {        
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
            .get('/admin/pendingAccounts')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: user Is not verified yet by the admin')
    
    })

    test('user must be an admin to have access to pending accounts', async () => {        
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
            .get('/admin/pendingAccounts')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: only admins has access to those pages.')
    })
    test('if a user is authenticated, his email is confirmed, and is an admin, he gains access to pending accounts', async () => {        
        const loggedUser = {
            email:"ahmed@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .get('/admin/pendingAccounts')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})

describe('a pending account', () => {

    test('user must be authenticated to edit a pending account', async () => {
        const user = User.findOne({status: "pending"})
        await api
            .put(`/admin/pendingAccounts/${user._id}`)
            .send({status: "approved"})
            .expect(401)
            .expect('eroor: access denied: token missing')
    })
    test('user email must be verified to edit a pending account', async  () => {
        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        const user = User.findOne({status: "pending"})
        await api
            .put(`/admin/pendingAccounts/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({status: "approved"})
            .expect(401)
            .expect('eroor: user Is not verified yet by the admin')        
    })
    test('user must be an admin to edit a pending account', async  () => {
        const loggedUser = {
            email:"adnan@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        const user = User.findOne({status: "pending"})
        await api
            .put(`/admin/pendingAccounts/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({status: "approved"})
            .expect(401)
            .expect('eroor: only admins has access to those pages.')        
    })
    test('if a user is authenticated, his email is confirmed, and is an admin, he can edit a pending account', async  () => {
        const loggedUser = {
            email:"ahmed@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        const user = await User.findOne({ status: "pending" })

        await api
            .put(`/admin/pendingAccounts/${user._id}`)
            .send({status: "approved"})
            .set('Authorization', `Bearer ${token}`)
            .expect(200)   
        
    })
})

describe('getting all accounts', () => {
    test('user must be authenticated to have access to all accounts', async () => {        
        await api
            .get('/admin/allAccounts')
            .expect(401)
            .expect('eroor: access denied: token missing')
    })
    test('user email must be verified to have access to all accounts', async () => {        
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
            .get('/admin/allAccounts')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: user Is not verified yet by the admin')
    
    })

    test('user must be an admin to have access to all accounts', async () => {        
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
            .get('/admin/allAccounts')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: only admins has access to those pages.')
    })
    
    test('if a user is authenticated, his email is confirmed, and is an admin, he gains access to all accounts', async () => {        
        const loggedUser = {
            email:"ahmed@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .get('/admin/allAccounts')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})

describe('filtering products', () => {
    test('user must be authenticated to have access to filter', async () => {        
        await api
            .get('/admin/filter')
            .expect(401)
            .expect('eroor: access denied: token missing')
    })
    test('user email must be verified to have access to filter', async () => {        
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
            .get('/admin/filter')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: user Is not verified yet by the admin')
    
    })

    test('user must be an admin to have access to filter', async () => {        
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
            .get('/admin/filter')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .expect('eroor: only admins has access to those pages.')
    })  

    test('if a user is authenticated, his email is confirmed, and is an admin, he can access filter', async () => {        
        const loggedUser = {
            email:"ahmed@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        const response = await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
        
        token = response.body.token

        await api
            .get('/admin/filter?citations=85&start=2001&end=2050')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})