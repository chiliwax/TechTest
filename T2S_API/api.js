const express = require('express')
const db = require('./database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('./config.json');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
const { urlencoded, json } = require('body-parser');

const router = express.Router()

///////IBM ///////

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: config.T2S_apikey,
    }),
    url: config.T2S_url,
});

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
        apikey: config.S2T_apikey,
    }),
    url: config.S2T_url,
});

function wichvoice() {
    var myArray = [
        { "lang": "en-us", "voice": 'en-US_AllisonV3Voice' },
        { "lang": "de-de", "voice": 'de-DE_BirgitV3Voice' },
        { "lang": "es-es", "voice": 'es-ES_EnriqueV3Voice' },
        { "lang": "ar-ar", "voice": 'ar-AR_OmarVoice' },
        { "lang": "en-gb", "voice": 'en-GB_CharlotteV3Voice' },
        { "lang": "it-it", "voice": 'it-IT_FrancescaV3Voice' },
        { "lang": "ja-jp", "voice": 'ja-JP_EmiV3Voice' },
        { "lang": "ko-kr", "voice": 'ko-KR_YoungmiVoice' },
        { "lang": "pt-br", "voice": 'pt-BR_IsabelaVoice' },
        { "lang": "zh-cn", "voice": 'zh-CN_WangWeiVoice' }];

    const randomElement = myArray[Math.floor(Math.random() * myArray.length)];
    console.log(randomElement)
    return (
        randomElement
    )
}



async function text2speak(ind, path) {
    var voice = wichvoice()
    const synthesizeParams = {
        text: path,
        accept: 'audio/wav',
        voice: voice.voice,
    };
    var path
    await textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
            fs.writeFileSync('./public/' + ind + '.wav', buffer);
            path = './public/' + ind + '.wav'
        })
        .catch(err => {
            console.log('error:', err);
        });
    voice.path = path;
    return voice
}

async function speak2text(path) {
    var fr;
    const params = {
        audio: fs.createReadStream(path),
        contentType: 'audio/wav',
        model: 'fr-FR_BroadbandModel',
    };
    await speechToText.recognize(params)
        .then(speechRecognitionResults => {
            fr = speechRecognitionResults.result.results[0].alternatives[0].transcript
        })
        .catch(err => {
            console.log('error:', err);
        });
    return (fr)
}

//DON'T NEED TOKEN (IBM TEST)
router.post("/text2speak", async function (request, response) {
    console.log(request.body)
    var text = request.body.text;
    const nbTour = request.body.nbTour
    console.log(nbTour)
    const jsonresponse = []
    var rand
    do {
        rand = Math.random()
    } while (fs.existsSync('./public/' + rand));

    fs.mkdirSync('./public/' + rand)

    try {
        for (let i = 0; i < nbTour; i++) {

            let voice = await text2speak(rand + '/' + i, text)
            let ans = encodeURI(rand + '/' + i + ".wav")
            let fr = await speak2text(voice.path)
            jsonresponse.push({ status: 200, path: ans, lang: voice.lang.toUpperCase(), voice: voice.voice.split('_')[1], resultText: fr, originalText: text })
            text = fr
        }
        console.log(jsonresponse)
        response.status(200).json(jsonresponse)
        db.addToHistory(JSON.stringify(jsonresponse), function (error) {
            if (error) { console.log("enable to add to history") }
        })
        //console.log('text')
    } catch (err) {
        switch (err) {
            default: response.status(500).json({ status: 500, error: "Unexpected error : " + err })
                break;
        }
    }
})

router.get("/getHistory", async function (request, response) {
    try {
        db.gethistory(function (error, answer) {
            if (error) {
                console.log(error);
                response.status(500).json({ status: 500, error: "DataBase error : " + error });
            } else {
                response.status(200).json(answer)
            }
        })
    } catch (error) {
        switch (error) {
            default: response.status(500).json({ status: 500, error: "Unexpected error : " + err })
                break;
        }
    }
})

router.post("/deleteFromHistory", async function (request, response) {
    console.log(request.body)
    var id = request.body.id;
    try {
        db.deletefromhistory(id, function (error) {
            if (error) {
                console.log("enable to delete from history")
                response.status(500).json({ status: 500, error: "DataBase error : " + error });
            } else {
                console.log('send res')
                response.status(200).json({})
            }
        })
    }
    catch (error) {
        switch (error) {
            default: response.status(500).json({ status: 500, error: "Unexpected error : " + err })
                break;
        }
    }
})

module.exports = router