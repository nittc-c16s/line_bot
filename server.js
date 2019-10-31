const line = require("@line/bot-sdk");
const axios = require("axios");
const dotenv = require("dotenv").config();
const express = require("express");

const port = process.env.port || 3000;

const config = {
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
};

const app = express();
const client = new line.Client(config)

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

let handleEvent = (event) => {
  if(event.type !== 'message'){
    return Promise.resolve(null)
  }else{
    switch(event.message.text){
      case 'hello':
        return client.replyMessage(
          event.replyToken,
          {
            type: 'text',
            text: 'world'
          }
        )
    }
  }
}

app.listen(PORT, () => {
  console.log('bot start')
})
