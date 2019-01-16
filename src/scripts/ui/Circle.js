'use strict';

var React = require('react');

var Circle = React.createClass({
    propTypes: {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        type: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
    },
    onClick: function() {
        this.props.onClick(this.props.x, this.props.y, this.props.type);
    },
    render: function() {
        var className = 'circle ' + this.props.type.toLowerCase();
        return <div onClick={this.onClick} className={className}><div>Circle</div></div>;
    }
});

Circle.types = {
    EMPTY: 'EMPTY',
    BLOCKED: 'BLOCKED',
    CAT: 'CAT'
};

module.exports = Circle;
