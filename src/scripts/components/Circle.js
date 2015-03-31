'use strict';

var React = require('react/addons');

// CSS
require('../../styles/circle.css');

class Circle extends React.Component {

    onClick() {
        this.props.onClick(this.props.x, this.props.y, this.props.type);
    }

    render() {
        var className = 'circle ' + this.props.type.toLowerCase();
        return <div onclick={this.onClick} className={className}>Circle</div>;
    }
}

Circle.propTypes = {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

Circle.types = {
    EMPTY: 'EMPTY',
    BLOCKED: 'BLOCKED',
    CAT: 'CAT'
};

module.exports = Circle;
