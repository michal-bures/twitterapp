import React from 'react';
import App from './App';
import moment from 'moment';
import { mount } from 'enzyme';
import Immutable from 'immutable';

function mockTweet(id, text, favs, time) {
    let mentions = text.match(/@[^@ ]+/g) || [];
    let hashtags = text.match(/#[^# ]+/g) || [];
    return {
        id: id,
        text: text,
        favs: favs,
        date: moment('2016-01-01T'+time),
        dateString: '1.1.2016 '+time,
        mentions: mentions.map(str => str.slice(1)),
        hashtags: hashtags.map(str => str.slice(1)),
    }
};

describe('<App />', () => {
    
    let i = 0;
    const mockTweets = {
        first : mockTweet(i++,'It\'s never too early for some twitter drama!',0,'3:00'),
        oneMention : mockTweet(i++,'Tweet with one @mention',0,'9:00'),
        oneHashtag : mockTweet(i++,'I can use hastags #awesome',1,'9:15'),
        mostPopular : mockTweet(i++,'Like this if you approve',112,'9:30'),
        threeMentions : mockTweet(i++,'@thatOneGuy @thatOtherGuy @thatOneToo I see!',0,'10:00'),
        threeHashtags : mockTweet(i++,'The edgiest of tweets #sobrave #verytrendy #needsmorehashtags ',0,'10:00'),
    }

    let wApp;
    let wTable;
    
    beforeEach(() => {
        wApp = mount(<App />);
        //console.log(Object.values(mockTweets));
        wApp.setState({
            tweets: Immutable.List(Object.keys(mockTweets).map(key => mockTweets[key])),
        });
        wTable = wApp.find('SortableTable');
    })

    // DOM navigation helpers

    const tableRowsCount = () => {
        return wTable.find('tr').length - 1 // substract one for headers row
    }
    const firstRowText = () => {
        return wTable.find('.sortable-table-row-0').find('td').at(1).text();
    }
    const columnHeader = (i) => {
        return wTable.find('th').at(i);
    }

    // tests

    it('renders as expected', () => {
        expect(wApp.debug()).toMatchSnapshot();
    });

    it('displays all tweets by default', () => {
        // table should have 5 rows
        expect(tableRowsCount()).toBe(6);
        // test that first table row has expected content
        expect(firstRowText()).toBe(mockTweets.first.text);
    });

    it('can be sorted by clicking on table header', () => {
        // two clicks on "likes" column => now should be sorted by likes in descending order
        columnHeader(2).simulate('click');
        columnHeader(2).simulate('click');
        expect(firstRowText()).toBe(mockTweets.mostPopular.text);
    });

});

