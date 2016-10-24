import assert from 'assert';

class Filter {
    constructor(label, prompt, field, filterFunc) {
        this._label = label;
        this._field = field;
        this._filterFunc = filterFunc;
        this._prompt = 'Enter '+(prompt || 'text');
    }

    apply(item, value) {
        // if no filter value is specified, filter always matches
        if (value === undefined || value === '') return true;
        return this._filterFunc(item[this._field], value);
    }

    get label() {
        return this._label
    }

    get prompt() {
        return this._prompt
    }

}

// Filter operator functions

function textContains(text, filterBy) {
    assert.equal(typeof text, 'string');
    return text.toLowerCase().includes(filterBy.toLowerCase());
}

function listContains(list, filterBy) {
    return list.some(item => item === filterBy);
}

function minLength(obj, filterBy) {
    return obj.length >= parseInt(filterBy,10);
}

function minValue(value, filterBy) {
    assert.equal(typeof value, 'number');
    return parseInt(value,10) >= parseInt(filterBy,10);
}

export default {
    date: new Filter('Sent date','date','dateString',textContains),
    fullText: new Filter('Contains','text','text',textContains),
    tweetLength: new Filter('Length','minimal length of tweets','text', minLength),
    favourites: new Filter('Num. of likes','minimal number of likes','favs', minValue),
    mentions: new Filter('Num. of @mentions','minimal number of @mentions in tweet','mentions', minLength),
    hashtags: new Filter('Num. of #hastags','minimal number of #hashtags in tweet','hashtags', minLength),
    mention: new Filter('Contains @mention','specific @mention','mentions', listContains),
    hashtag: new Filter('Contains #hashtag','specific @hashtag','hashtags', listContains)
};