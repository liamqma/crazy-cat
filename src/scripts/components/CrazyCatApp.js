'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Circle = require('./Circle');

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/row.css');

var CrazyCatApp = React.createClass({
    render: function () {

        var rows = [];

        for (var indexY = 0; indexY < 9; indexY++) {

            var row = [];
            var type;

            for (var indexX = 0; indexX < 9; indexX++) {
                if (indexX === 4 && indexY === 4) {
                    type = Circle.types.CAT;
                } else {
                    type = Circle.types.EMPTY;
                }
                row.push(<Circle x={indexX} y={indexY} type={type} />);
            }

            var rowWrapper = (
                <div className='row'>
                    {row}
                </div>
            );

            rows.push(rowWrapper);

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
