'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Row = require('./Row');

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var CrazyCatApp = React.createClass({
    render: function () {
        var rows = [];
        for (var index = 0; index < 9; index++) {
            rows.push(<Row />);
        }
        return (
            <div className='main'>
                {rows}
            </div>
        );
    }
});
React.render(<CrazyCatApp />, document.getElementById('content')); // jshint ignore:line

module.exports = CrazyCatApp;
