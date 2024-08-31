const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();
let atb = 'american-to-british';
let bta = 'british-to-american';

suite('Unit Tests', () => {
    test("Translate Mangoes are my favorite fruit. to British English", () => {
        let original = "Mangoes are my favorite fruit."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "Mangoes are my favourite fruit.");
    });
    test("Translate I ate yogurt for breakfast. to British English", () => {
        let original = "I ate yogurt for breakfast."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "I ate yoghurt for brekkie.");

    });
    test("Translate We had a party at my friend's condo. to British English", () => {
        let original = "We had a party at my friend's condo."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "We had a party at my friend's flat.");

    });
    test("Translate Can you toss this in the trashcan for me? to British English", () => {
        let original = "Can you toss this in the trashcan for me?"
        let translation = translator.translate(original, atb);
        assert.equal(translation, "Can you toss this in the bin for me?");

    });
    test("Translate The parking lot was full. to British English", () => {
        let original = "The parking lot was full."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "The car park was full.");

    });
    test("Translate Like a high tech Rube Goldberg machine. to British English", () => {
        let original = "Like a high tech Rube Goldberg machine."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "Like a high tech Heath Robinson device.");

    });
    test("Translate To play hooky means to skip class or work. to British English", () => {
        let original = "To play hooky means to skip class or work."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "To bunk off means to skip class or work.");

    });
    test("Translate No Mr. Bond, I expect you to die. to British English", () => {
        let original = "No Mr. Bond, I expect you to die."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "No Mr Bond, I expect you to die.");

    });
    test("Translate Dr. Grosh will see you now. to British English", () => {
        let original = "Dr. Grosh will see you now."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "Dr Grosh will see you now.");

    });
    test("Translate Lunch is at 12:15 today. to British English", () => {
        let original = "Lunch is at 12:15 today."
        let translation = translator.translate(original, atb);
        assert.equal(translation, "Lunch is at 12.15 today.");

    });
    test("Translate We watched the footie match for a while. to American English", () => {
        let original = "We watched the footie match for a while."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "We watched the soccer match for a while.");

    });
    test("Translate Paracetamol takes up to an hour to work. to American English", () => {
        let original = "Paracetamol takes up to an hour to work."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "Tylenol takes up to an hour to work.");

    });
    test("Translate First, caramelise the onions. to American English", () => {
        let original = "First, caramelise the onions."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "First, caramelize the onions.");

    });
    test("Translate I spent the bank holiday at the funfair. to American English", () => {
        let original = "I spent the bank holiday at the funfair."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "I spent the public holiday at the carnival.");

    });
    test("Translate I had a bicky then went to the chippy. to American English", () => {
        let original = "I had a bicky then went to the chippy."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "I had a cookie then went to the fish-and-chip shop.");

    });
    test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
        let original = "I've just got bits and bobs in my bum bag."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "I've just got odds and ends in my fanny pack.");

    });
    test("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
        let original = "The car boot sale at Boxted Airfield was called off."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "The swap meet at Boxted Airfield was called off.");

    });
    test("Translate Have you met Mrs Kalyani? to American English", () => {
        let original = "Have you met Mrs Kalyani?"
        let translation = translator.translate(original, bta);
        assert.equal(translation, "Have you met Mrs. Kalyani?");

    });
    test("Translate Prof Joyner of King's College, London. to American English", () => {
        let original = "Prof Joyner of King's College, London."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "Prof. Joyner of King's College, London.");

    });
    test("Translate Tea time is usually around 4 or 4.30. to American English", () => {
        let original = "Tea time is usually around 4 or 4.30."
        let translation = translator.translate(original, bta);
        assert.equal(translation, "Tea time is usually around 4 or 4:30.");

    });
    test("Highlight translation in Mangoes are my favorite fruit.", () => {
        let original = "Mangoes are my favorite fruit."
        let translation = translator.translate(original, atb, true);
        assert.equal(translation, `Mangoes are my <span class="highlight">favourite</span> fruit.`);

    });
    test("Highlight translation in I ate yogurt for breakfast.", () => {
        let original = "I ate yogurt for breakfast."
        let translation = translator.translate(original, atb, true);
        assert.equal(translation, `I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie</span>.`);
    });
    test("Highlight translation in We watched the footie match for a while.", () => {
        let original = "We watched the footie match for a while."
        let translation = translator.translate(original, bta, true);
        assert.equal(translation, `We watched the <span class="highlight">soccer</span> match for a while.`);

    });
    test("Highlight translation in Paracetamol takes up to an hour to work.", () => {
        let original = "Paracetamol takes up to an hour to work."
        let translation = translator.translate(original, bta, true);
        assert.equal(translation, `<span class="highlight">Tylenol</span> takes up to an hour to work.`);

    });
});
