import React from 'react';
import App from './App';
import moment from 'moment';
import { mount } from 'enzyme';
import Immutable from 'immutable';

function createMockTweets(...array) {
    return Immutable.List(array.map( (item, i)=>{
        var text = item[0];
        var mentions = text.match(/@[^@ ]+/g) || [];
        var hashtags = text.match(/#[^# ]+/g) || [];
        return {
            id: i,
            text: item[0],
            favs: item[1],
            date: moment('2016-01-01T'+item[2]),
            dateString: '1.1.2016 '+item[2],
            mentions: mentions.map(str => str.slice(1)),
            hashtags: hashtags.map(str => str.slice(1)),
        }
    }));
};

describe('<App />', () => {
    
    const mockTweets = createMockTweets(
        ['First tweet of the day',0,'8:00'],
        ['Tweet with one @mention',0,'9:00'],
        ['Tweet with a lot of likes #popular',112,'9:30'],
        ['@thatOneGuy @thatOtherGuy @thatOneToo whats up',0,'10:00'],
        ['The edgiest of tweets #sobrave #verytrendy #needsmorehashtags ',0,'10:00'],
    );

    it('renders consistently', () => {

        const wrapper = mount(<App />);

        // initial snapshot
        expect(wrapper.debug()).toMatchSnapshot();
        wrapper.setState({
            tweets: mockTweets,
        });

        // snapshot with tweets
        expect(wrapper.debug()).toMatchSnapshot();

        // table should have header + 5 rows
        expect(wrapper.find('tr').length).toBe(6);
        
        // test that first table row has expected content
        expect(wrapper.find('tr').at(1).find('td').at(1).text()).toBe('First tweet of the day');

    });
});
