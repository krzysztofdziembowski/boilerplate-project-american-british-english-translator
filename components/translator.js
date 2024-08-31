const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const britishToAmericanSpelling = reverseDictionary(americanToBritishSpelling);
const britishToAmericanTitles = reverseDictionary(americanToBritishTitles);
const toAmerican = reverseDictionary(americanOnly);
const toBritish = reverseDictionary(britishOnly);

class Translator {

    validateLocale(locale) {
        return locale == 'american-to-british' 
        || locale == 'british-to-american';
    }

    translate(input, locale, highlight = false) {
        if(locale == 'american-to-british') {
            return this.translateAmerican(input, highlight);
        }
        if(locale == 'british-to-american') {
            return this.translateBritish(input, highlight);
        }

        return input;
    }

    translateBritish(british, highlight) {
        let american = replaceWords(british, britishOnly, highlight);
        american = replaceWords(american, britishToAmericanSpelling, highlight);
        american = replaceWords(american, britishToAmericanTitles, highlight);
        american = replaceWords(american, toAmerican, highlight);
        american = replaceTimeToAmerican(american, highlight);

        return american;
    }

    translateAmerican(american, highlight) {
        let british = replaceWords(american, americanOnly, highlight);
        british = replaceWords(british, americanToBritishSpelling, highlight);
        british = replaceWords(british, americanToBritishTitles, highlight);
        british = replaceWords(british, toBritish, highlight);
        british = replaceTimeToBritish(british, highlight);

        return british;
    }
}

module.exports = Translator;

function replaceWords(text, dictionary, highlight) {
    const regex = new RegExp('\\b(' + Object.keys(dictionary)
    .map(word => word.replace('.', '\\.')).join('|') + ')(?:\\b|\\s|$)', 'gi');
    
    return text.replace(regex, (matched) => {
        let key = matched.toLowerCase().trim();
        let lastChar = /\s$/.test(matched) ? ' ' : '';
        const replacement = dictionary[key];
        
        // Split the matched and replacement strings into words
        const matchedWords = matched.split(/\s+/);
        const replacementWords = replacement.split(/\s+/);
        
        // Apply case matching for each word
        const caseMatchedReplacement = replacementWords.map((repWord, index) => {
            const origWord = matchedWords[index] || matchedWords[matchedWords.length - 1];
            
            if (origWord === origWord.toUpperCase()) {
                return repWord.toUpperCase();
            } else if (origWord[0] === origWord[0].toUpperCase()) {
                return repWord.charAt(0).toUpperCase() + repWord.slice(1).toLowerCase();
            } else {
                return repWord.toLowerCase();
            }
        });

        if(highlight)
            return `<span class="highlight">` + caseMatchedReplacement.join(' ') + `</span>`+ lastChar;
        else
            return caseMatchedReplacement.join(' ') + lastChar;
    });
}

function reverseDictionary(dict) {
    const reversed = {};
    for (const [key, value] of Object.entries(dict)) {
        if (!reversed.hasOwnProperty(value)) {
            reversed[value] = key;
        }
    }
    return reversed;
}

function replaceTimeToBritish(text, highlight) {
    const timeRegex = /\b([01]?[0-9]|2[0-3]):([0-5][0-9])\b/g;
    
    return text.replace(timeRegex, (match, hours, minutes) => {
        if(highlight)
            return `<span class="highlight">${hours}.${minutes}</span>`;
        else
            return `${hours}.${minutes}`;
    });
}

function replaceTimeToAmerican(text, highlight) {
    const timeRegex = /\b([01]?[0-9]|2[0-3]).([0-5][0-9])\b/g;
    
    return text.replace(timeRegex, (match, hours, minutes) => {
        if(highlight)
            return `<span class="highlight">${hours}:${minutes}</span>`;
        else
            return `${hours}:${minutes}`;
   });
}