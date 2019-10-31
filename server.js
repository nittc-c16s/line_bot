const line = require('@line/bot-sdk')
const axios = require('axios')
const dotenv = require('dotenv').config()
const express = require('express')

const port = process.env.port || 3000

const config ={
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
}

const app = express()

app.post('/webhook', line.middleware(config), (req, res)=>{
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result)=>res.json(result))
})
