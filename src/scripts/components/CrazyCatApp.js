'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Circle = require('./Circle');

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/row.css');

var CrazyCatApp = React.createClass({

    getInitialState: function () {

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
                row.push(type);
            }

            rows.push(row);
        }

        return {
            rows: rows
        };
    },

    onCircleClick: function(x, y, type) {
        this.state.rows[y][x] = Circle.types.BLOCKED;
        this.setState({
            rows: this.state.rows
        });
    },

    render: function () {

        var self = this;
        var rowsHtml = [];

        this.state.rows.forEach(function(row, indexY){

            var rowHtml = [];

            row.forEach(function(circleType, indexX){
                rowHtml.push(<Circle onClick={self.onCircleClick} x={indexX} y={indexY} type={circleType} />);
            });

            rowsHtml.push(
                <div className='row'>
                    {rowHtml}
                </div>
            );

        });

        return (
            <div className='main'>
                {rowsHtml}
            </div>
        );
    }
});
React.render(<CrazyCatApp />, document.getElementById('content')); // jshint ignore:line

module.exports = CrazyCatApp;
