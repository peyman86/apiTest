const express = require('express');
const router = express.Router();

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');

//https://api.kr-seo.language-translator.watson.cloud.ibm.com/instances/1b30b506-6b5a-435e-bb89-e085ed1a0fb7


//create an instance of the language translator.
const translator = new LanguageTranslatorV3({
    version: '2020-08-24',
    authenticator: new IamAuthenticator({
        apikey: 'FxQWYOkWJn8eBGym71IJ77wQZKp7d3Bc02agR_rLp9n3',
    }),
    url: 'https://api.kr-seo.language-translator.watson.cloud.ibm.com/instances/1b30b506-6b5a-435e-bb89-e085ed1a0fb7',
});

const translateParams = {
    text: 'how are you?',
    modelId: 'en-ar',
};
//translate test
/*translator.translate(translateParams)
    .then(translationResult => {
        console.log(JSON.stringify(translationResult, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });*/

//This endpoint translates the text send to it
router.post('/api/translate', function (req, res, next) {
    translator.translate(req.body)
        .then(data => res.json(data.result))
        .catch(error => next(error));
});

//This endpoint gets all the langauges that can be processed by the translator
router.get('/api/get-languages', function (req, res, next) {
    translator.listIdentifiableLanguages()
        .then(identifiedLanguages => {
            res.json(identifiedLanguages.result);
        })
        .catch(err => {
            console.log('error:', err);
        });
})


//This endpoint gets all the model list.
router.get('/api/get-model-list', function (req, res, next) {
    translator.listModels()
        .then(translationModels => {
            res.json(translationModels.result)
        })
        .catch(err => {
            console.log('error:', err);
        });
})

module.exports = router;