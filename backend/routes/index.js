var express = require('express');
var router = express.Router();
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../', '.env') });

const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
//require("dotenv").config();

/* GET home page. */
router.post('/chat', function(req, res, next) {
  //res.sendFile(path.join(__dirname, '../personality-test-react/build/index.html'));
  // res.sendFile(path.join(__dirname, 'index.html'));
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  // console.log(req.body)
  
  (async () => {
    const messages = req.body
    console.log(req.body)
    //console.log(process.env.OPENAI_API_KEY)
    
    const history = [];
    
  var kor1 = messages.data[0]
  var kor2 = messages.data[1]
  var kor3 = messages.data[2]
  var kor4 = messages.data[3]
  var kor5 = messages.data[4]
  var kor6 = messages.data[5]
  var kor7 = messages.data[6]
  var kor8 = messages.data[7]
  var kor9 = messages.data[8]
  var kor10 = messages.data[9]
  var kor11 = messages.data[10]
  var kor12 = messages.data[11]
  var kor13 = messages.data[12]
  var kor14 = messages.data[13]
  var kor15 = messages.data[14]


    const promt1 = `
    these are the questions and answers about me q : What is your name? Do you like it? 
    
    a : ${kor1}
    
    q : All insecurities and doubts aside, what’s something you genuinely like about yourself?
    
    a : ${kor2}
    
    q : What is the life lesson you have learned and will never forget?
    
    a : ${kor3}
    
    q : What’s something important to you that you’ve given up on? How do you feel about it?
    
    a : ${kor4}
    
    q : Would you say you allow yourself to make mistakes?
    
    a : ${kor5}
    
    q : If you could go back in time, what would you change? How would that affect you today?
    
    a : ${kor6}
    
    q : What have you been postponing lately? Why are you avoiding it?
    
    a : ${kor7}
    
    Write my autobiography based on the information above in Korean 반말. Also, use a colloquial style. Use "I" as a pronoun. Never tell the advise. Write with rich expressions. write as much as you can. 구어체로 써줘. Don't mention about the question. 인사는 하지마`;


    const promt2 = `
    these are the questions and answers about me

    q : How do you feel when you’re in new environments with new people?

    a : ${kor8}
    
    q : What do people often misunderstand about you?
    
    a : ${kor9}
    
    q : How do you express your feelings for people you care about or love? What’s your love language?
    
    a : ${kor10}
    
    q : What is the nicest thing someone else has done for you?
    
    a : ${kor11}
    
    Continue writing my autobiography in Korean. Use the same colloquial style as the previous answer. Use "I" as a pronoun. Never tell the advise. Write with rich expressions. write as much as you can. 구어체로 써줘. Don't mention about the question. 인사는 하지마. 반말로 써줘`


    const promt3 = `
    these are the questions and answers about me

    q : Are you able to explain to others how you feel?

    a : ${kor12}
    
    q : What makes you feel energized/inspired and exhausted/depleted?
    
    a : ${kor13}
    
    q : If you could be anywhere right now, where would you want to be?
    
    a : ${kor14}
    
    q : Do you feel like you deserve to have what you want? Do you feel worthy of your dreams and goals?
    
    a : ${kor15}
    
    Use the colloquial style and continue writing my autobiography in Korean. Use "I" as a pronoun. Never tell the advise. Write with rich expressions. write as much as you can. 구어체로 써줘. Don't mention about the question. 인사는 하지마. 반말로 써줘`;
    
    // console.log(promt1);
    const completion1 = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": promt1}],
    });

    const completion_text1 = completion1.data.choices[0].message.content;
    // console.log(completion_text1);

    const completion2 = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": promt2}],
    });

    const completion_text2 = completion2.data.choices[0].message.content;
    // console.log(completion_text2);

    const completion3 = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": promt3}],
    });

    const completion_text3 = completion3.data.choices[0].message.content;
    // console.log(completion_text3);
    
    let combined = completion_text1 + " "+ completion_text2 + " " + completion_text3;
    console.log(combined)
    combined = JSON.stringify(combined)
    

    // Send the object as a JSON response
    res.send(combined);



  
    // while (true) {
    //   const user_input = readlineSync.question("Your input: ");
  
    //   const messages = [];
    //   for (const [input_text, completion_text] of history) {
    //     messages.push({ role: "user", content: input_text });
    //     messages.push({ role: "assistant", content: completion_text });
    //   }
  
    //   messages.push({ role: "user", content: user_input });
  
    //   try {
    //     const completion = await openai.createChatCompletion({
    //       model: "gpt-3.5-turbo",
    //       messages: messages,
    //     });
  
    //     const completion_text = completion.data.choices[0].message.content;
    //     console.log(completion_text);
  
    //     history.push([user_input, completion_text]);
  
    //     const user_input_again = readlineSync.question(
    //       "\nWould you like to continue the conversation? (Y/N)"
    //     );
    //     if (user_input_again.toUpperCase() === "N") {
    //       return;
    //     } else if (user_input_again.toUpperCase() !== "Y") {
    //       console.log("Invalid input. Please enter 'Y' or 'N'.");
    //       return;
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       console.log(error.response.status);
    //       console.log(error.response.data);
    //     } else {
    //       console.log(error.message);
    //     }
    //   }
    // }
  })();



});



module.exports = router;