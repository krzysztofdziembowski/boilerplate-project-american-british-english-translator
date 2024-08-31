'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log(req.body)
      let text = req.body.text;
      let locale = req.body.locale;
      
      if(text === undefined || locale === undefined) {
        console.log('Required field(s) missing')
        res.json({ error: 'Required field(s) missing' });
        return;
      }

      if(text.length == 0) {
        console.log('No text to translate')
        res.json({ error: 'No text to translate' });
        return;
      }

      if(locale.length == 0 || !translator.validateLocale(locale)) {
        console.log('Invalid value for locale field')
        res.json({ error: 'Invalid value for locale field' });
        return;
      }
      
      let translation = translator.translate(text, locale, true);

      if(translation == text) {
        console.log('Everything looks good to me!')
        res.json({ text, translation: "Everything looks good to me!" })
      } else {
        console.log(translation)
        res.json({ text, translation })
      }

    });
};
