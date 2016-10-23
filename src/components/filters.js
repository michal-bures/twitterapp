import assert from 'assert';

class Filter {
    constructor(label, field, filterFunc) {
        this._label = label;
        this._field = field;
        this._filterFunc = filterFunc;
    }

    apply(item, value) {
        // if no filter value is specified, filter always matches
        if (value === undefined || value === '') return true;
        return this._filterFunc(item[this._field], value);
    }

    get label() {
        return this._label
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

function dateContains(date, filterBy) {
    assert.equal(typeof date.format, 'function');
    return date.format('lll').includes(filterBy);
}

function minLength(obj, filterBy) {
    return obj.length >= parseInt(filterBy,10);
}

function minValue(value, filterBy) {
    assert.equal(typeof value, 'number');
    return parseInt(value,10) >= parseInt(filterBy,10);
}

export default {
    date: new Filter('Sent date','date',dateContains),
    fullText: new Filter('Contains','text',textContains),
    tweetLength: new Filter('Length','text', minLength),
    favourites: new Filter('Num. of likes','favs', minValue),
    mentions: new Filter('Num. of @mentions','mentions', minLength),
    hashtags: new Filter('Num. of #hastags','hashtags', minLength),
    mention: new Filter('Contains @mention','mentions', listContains),
    hashtag: new Filter('Contains #hashtag','hashtags', listContains)
};