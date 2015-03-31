'use strict';

var React = require('react/addons');
var Circle = require('./Circle');

// CSS
require('../../styles/row.css');

class Row extends React.Component {

    render() {
        var circles = [];
        for (var index = 0; index < 9; index++) {
            circles.push(<Circle key={index} x={this.props.x} y={index} />);
        }
        return (
            <div className='row'>{circles}</div>
        );
    }
}

Circle.propTypes = {
    x: React.PropTypes.number.isRequired
};

module.exports = Row;
