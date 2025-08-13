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

describe('Create An Account is OK', () => {

    test('creating new user succeeds', async () => {
        const newUser = {
            title: "Dr.",
            name: "sherif",
            surname: "kashlan",
            academicId: "32569874",
            email:"sherif@ankara.edu.tr",
            password: "123Edsaqww",
            repeatedPassword: "123Edsaqww",           
            faculty:"engineering",
            department:"food",
            fields:["Security"]   
        }
    
        await api
            .post('/register')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const users = await User.find({})
        expect(users)
            .toHaveLength(initialUsers.length + 1)
        
    })
    
    test("any email that does not end with @ankara.edu.tr is not acceptable", async () => {
        const newUser = {
            title: "Dr.",
            name: "sherif",
            surname: "kashlan",
            academicId: "32569874",
            email: "sherif@ankarads.edu.tr", // invalid email
            password: "123Edsaqww",
            repeatedPassword: "123Edsaqww",           
            faculty: "engineering",
            department :"electrical and electronics",
            fields :["Security"]   
        }  

        await api
            .post('/register')
            .send(newUser)
            .expect(400)
        
        const users = await User.find({})
        expect(users)
            .toHaveLength(initialUsers.length)
    })
    
    test('email should be unique', async () => {
        const newUser = {
            title: "Dr.",
            name: "ismail",
            surname: "dewidar",
            academicId: "1829532",
            email: "ismail@ankara.edu.tr", // previously added email 
            password: "123Edsaqww",
            repeatedPassword: "123Edsaqww",           
            faculty: "engineering",
            department: "computer",
            fields: ["AI"],
        }

        await api
            .post('/register')
            .send(newUser)
            .expect(400)
        
        const users = await User.find({})
        expect(users)
            .toHaveLength(initialUsers.length)
    })

    test('id should be unique', async () => {

        const newUser = {
            title: "Dr.",
            name: "ismail",
            surname: "dewidar",
            academicId: "182906532", // previously added ID
            email: "ismails@ankara.edu.tr",
            password: "123Edsaqww",
            repeatedPassword: "123Edsaqww",           
            faculty :"engineering",
            department :"computer",
            fields : ["AI"],
        }

        await api
            .post('/register')
            .send(newUser)
            .expect(400)
        
        const users = await User.find({})
        expect(users)
            .toHaveLength(initialUsers.length)
    })

    test('can not create a user with missing required fields', async () => {
        const newUser = {
            name: "ismail",
            surname: "dewidar"
        }

        await api
            .post('/register')
            .send(newUser)
            .expect(400)
        
        const users = await User.find({})
        expect(users)
            .toHaveLength(initialUsers.length)
    })

})

describe('Logging in', () => {
    test('can\'t sign in with WRONG PASSWORD', async () => {
        const loggedUser = {
            email:"adnvhfan@ankara.edu.tr",
            password:"123Efdsaqww"   
        }
        await api
            .post('/login')
            .send(loggedUser)
            .expect(401)
    }) 
    test('can\'t sign in with invalid email', async () => {
        const loggedUser = {
            email:"adnvhfadu.tr",
            password:"123Edsaqww"   
        }
        await api
            .post('/login')
            .send(loggedUser)
            .expect(401)
    })
    test('can sign in with unverified email', async () => {
        const loggedUser = {
            email:"ismail@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        await api
            .post('/login')
            .send(loggedUser)
            .expect(200)
    }) 
    test('sign in with VALID email & PASSWORD IS OK', async () => {
        const loggedUser = {
            email:"adnan@ankara.edu.tr",
            password:"123Edsaqww"   
        }
        await api.post('/login')
            .send(loggedUser)
            .expect(200)
    })
})

describe('reseting password', () => {
    let token = null
    beforeEach(async () => {
        const email = "adnan@ankara.edu.tr"
        const response = await api
            .post('/forgot-password')
            .send({email})
            .expect(200)
        
        token = response.body.userToken
    })
    test('password & repeated password should be the same', async () => {
        const newPassword = {
            password: "123456789",
            repeatedPassword: "",
        }
        await api
            .put(`/reset-password/${token}`)
            .send(newPassword)
            .expect("passwords should be compatible")
            .expect(400)
    })
    test('reseting password succeeds', async () => {
        const newPassword = {
            password: "123456789",
            repeatedPassword: "123456789",
        }
        await api
            .put(`/reset-password/${token}`)
            .send(newPassword)
            .expect("User password updated")
            .expect(200)
    })
    test('provided email should be a user', async () => {
        const email = "adnanovic@ankara.edu.tr"
        const response = await api
            .post('/forgot-password')
            .send({email})
            .expect(400)
            .expect("user with this email does not exist")

    })
})

afterAll(() => {
  mongoose.connection.close()
})