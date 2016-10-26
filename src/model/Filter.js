import assert from "assert";

/**
 * Each instance of Filter represents a specific filter type on a class of objects, such as "Filter tweets by minimum length"
 *
 * Use the Filter.apply() method to test if the filter succeeds on a specific object. The method takes a filter value as an
 * additional argument (for example you have to specify the desired min. length when using the "Filter tweets by minimum length" filter)
 *
 * Use the Filter.validateValue() method to test if a given value can be used as a filter value by this filter.
 */
class Filter {
    // Constructor params: 
    // - label: display label
    // - prompt: inputbox placeholder text
    // - filterFunc(propertyValue, filterValue): filter function - should return true if filterValue matches propertyValue
    // - validatorFunc(value) [optional]: filter value validation function - should return error message or null when value is valid
    constructor(label, prompt, field, filterFunc, validatorFunc) {
        this._label = label;
        this._field = field;
        this._filterFunc = filterFunc;
        this._validatorFunc = validatorFunc || (()=>{ return null; });
        this._prompt = "Enter "+(prompt || "text");
    }

    // returns the trimmed value, returns null if the value is undefined or empty string
    _sanitize(value) {
        if (value === undefined) return null;
        value = value.toString().trim();
        return (value === "" ? null : value);
    }

    // test if the given object (obj) passes this filter given a specific filter value 
    // - returns true if the item matches the specified filter value
    // - returns true if the filter value is empty or undefined
    // - returns false otherwise
    apply(obj, value) {
        value = this._sanitize(value);
        // if no filter value is specified, consider it a match
        if (value === null) return true;
        return this._filterFunc(obj[this._field], value);
    }

    // tests if the filter value is valid
    // returns error message if the value is invalid, null otherwise
    validateValue(value) {
        value = this._sanitize(value);
        // empty filter value is always valid
        if (value === null) return null;
        return this._validatorFunc(value);
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
    assert.equal(typeof text, "string");
    return text.toLowerCase().includes(filterBy.toLowerCase());
}

function matchHashtag(list, filterBy) {
    return list.some(item => item === filterBy || "#"+item === filterBy);
}
function matchMention(list, filterBy) {
    return list.some(item => item === filterBy || "@"+item === filterBy);
}

function minLength(obj, filterBy) {
    return obj.length >= parseInt(filterBy,10);
}

function minValue(value, filterBy) {
    assert.equal(typeof value, "number");
    return parseInt(value,10) >= parseInt(filterBy,10);
}

// Filter value validator functions

function naturalNumbers(val) {
    var n = Number(val);
    if (isNaN(n)) {
        return "Number expected!";
    } else if (n < 0) {
        return "No negative numbers please!";
    }
    return null;
}

function isSingleToken(val) {
    if (val.includes(" ")) {
        return "One word at a time please!";
    }
    return null;
}

export default {
    date: new Filter("Sent date","date","dateString",textContains),
    fullText: new Filter("Contains","text","text",textContains),
    tweetLength: new Filter("Length","minimal length of tweets","text", minLength, naturalNumbers),
    favourites: new Filter("Num. of likes","minimal number of likes","favs", minValue, naturalNumbers),
    mentions: new Filter("Num. of @mentions","minimal number of @mentions in tweet","mentions", minLength, naturalNumbers),
    hashtags: new Filter("Num. of #hastags","minimal number of #hashtags in tweet","hashtags", minLength, naturalNumbers),
    mention: new Filter("Contains @mention","specific @mention","mentions", matchMention, isSingleToken),
    hashtag: new Filter("Contains #hashtag","specific #hashtag","hashtags", matchHashtag, isSingleToken),
};