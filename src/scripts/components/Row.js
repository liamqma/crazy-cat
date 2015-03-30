'use strict';

var React = require('react/addons');
var Circle = require('./Circle');

// CSS
require('../../styles/row.css');

class Row extends React.Component {
    render() {
        var circles = [];
        for (var index = 0; index < 9; index++) {
            circles.push(<Circle />);
        }
        return (
            <div className='row'>{circles}</div>
        );
    }
}

module.exports = Row;
