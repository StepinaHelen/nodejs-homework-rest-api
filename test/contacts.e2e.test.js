const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { newContact, newUser } = require('./data/data')
const app = require('../app')

const db = require('../model/db')
const Users = require('../model/users')

const Contact = require('../schemas/contacts')
const User = require('../schemas/user')
