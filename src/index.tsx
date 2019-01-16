import * as React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Circle, { types } from "./components/Circle";
import sweetAlert from 'sweetalert2'

const Row = styled.div`
    float: left;
    clear: both;
    &:nth-child(even) {
        margin-left: 25px;
    };
`;

const currentCat = { x: 4, y: 4 };
const MOVE_NONE = -1,
    MOVE_LEFT = 0,
    MOVE_UP_LEFT = 1,
    MOVE_UP_RIGHT = 2,
    MOVE_RIGHT = 3,
    MOVE_BOTTOM_RIGHT = 4,
    MOVE_BOTTOM_LEFT = 5;

class App extends React.Component {
    constructor(props) {
        super(props);
        var rows = [];

        for (var indexY = 0; indexY < 9; indexY++) {
            var row = [];
            var type;


            for (var indexX = 0; indexX < 9; indexX++) {
                if (indexX === currentCat.x && indexY === currentCat.y) {
                    type = types.CAT;
                } else if (Math.random() < 0.15) {
                    type = types.BLOCKED;
                } else {
                    type = types.EMPTY;
                }
                row.push(type);
            }

            rows.push(row);
        }
        this.state = {
            steps: 0,
            isCatSad: false,
            rows: rows
        };
    }

    getMoveDirection() {
        var distanceMap = [];
        // left
        var can = true;
        for (var x = currentCat.x; x >= 0; x--) {
            if (this.state.rows[currentCat.y][x] === types.BLOCKED) {
                can = false;
                distanceMap[MOVE_LEFT] = currentCat.x - x;
                break;
            }
        }
        if (can) {
            return MOVE_LEFT;
        }

        // up left
        can = true;
        x = currentCat.x;
        var y = currentCat.y;

        while (true) {
            if (this.state.rows[y][x] === types.BLOCKED) {
                can = false;
                distanceMap[MOVE_UP_LEFT] = currentCat.y - y;
                break;
            }
            if (y % 2 === 0) {
                x--;
            }
            y--;
            if (y < 0 || x < 0) {
                break;
            }
        }
        if (can) {
            return MOVE_UP_LEFT;
        }
        // up right
        can = true;
        x = currentCat.x;
        y = currentCat.y;
        while (true) {
            if (this.state.rows[y][x] === types.BLOCKED) {
                can = false;
                distanceMap[MOVE_UP_RIGHT] = currentCat.y - y;
                break;
            }
            if (y % 2 === 1) {
                x++;
            }
            y--;
            if (y < 0 || x > 8) {
                break;
            }
        }

        if (can) {
            return MOVE_UP_RIGHT;
        }

        // right
        can = true;
        for (x = currentCat.x; x < 9; x++) {
            if (this.state.rows[currentCat.y][x] === types.BLOCKED) {
                can = false;
                distanceMap[MOVE_RIGHT] = x - currentCat.x;
                break;
            }
        }
        if (can) {
            return MOVE_RIGHT;
        }

        // bottom right
        can = true;
        x = currentCat.x;
        y = currentCat.y;
        while (true) {
            if (this.state.rows[y][x] === types.BLOCKED) {
                can = false;
                distanceMap[MOVE_BOTTOM_RIGHT] = y - currentCat.y;
                break;
            }
            if (y % 2 === 1) {
                x++;
            }
            y++;
            if (y > 8 || x > 8) {
                break;
            }
        }
        if (can) {
            return MOVE_BOTTOM_RIGHT;
        }

        // bottom left
        can = true;
        x = currentCat.x;
        y = currentCat.y;
        while (true) {
            if (this.state.rows[y][x] === types.BLOCKED) {
                can = false;
                distanceMap[MOVE_BOTTOM_LEFT] = y - currentCat.y;
                break;
            }
            if (y % 2 === 0) {
                x--;
            }
            y++;
            if (y > 8 || x < 0) {
                break;
            }
        }

        if (can) {
            return MOVE_BOTTOM_LEFT;
        }

        this.state.isCatSad = true;

        var maxDirection = -1, maxValue = -1;
        for (var direction = 0; direction < distanceMap.length; direction++) {
            if (distanceMap[direction] > maxValue) {
                maxValue = distanceMap[direction];
                maxDirection = direction;
            }
        }
        if (maxValue > 1) {
            return maxDirection;
        } else {
            return MOVE_NONE;
        }
    }

    onCircleClick(x, y, type) {

        if (this.state.rows[y][x] === types.EMPTY) {
            this.state.rows[y][x] = types.BLOCKED;
            this.state.steps = this.state.steps + 1;
        } else {
            return;
        }

        if (currentCat.x === 0 || currentCat.x === 8 || currentCat.y === 0 || currentCat.y === 8) {
            sweetAlert('Oops...', 'The cat ran away', 'error');
            return;
        }

        var direction = this.getMoveDirection();
        switch (direction) {
            case MOVE_LEFT:
                this.state.rows[currentCat.y][currentCat.x] = types.EMPTY;
                currentCat.x--;
                this.state.rows[currentCat.y][currentCat.x] = types.CAT;
                break;
            case MOVE_UP_LEFT:
                this.state.rows[currentCat.y][currentCat.x] = types.EMPTY;
                if (currentCat.y % 2 === 0) {
                    currentCat.x--;
                }
                currentCat.y--;
                this.state.rows[currentCat.y][currentCat.x] = types.CAT;
                break;
            case MOVE_UP_RIGHT:
                this.state.rows[currentCat.y][currentCat.x] = types.EMPTY;
                if (currentCat.y % 2) {
                    currentCat.x++;
                }
                currentCat.y--;
                this.state.rows[currentCat.y][currentCat.x] = types.CAT;
                break;
            case MOVE_RIGHT:
                this.state.rows[currentCat.y][currentCat.x] = types.EMPTY;
                currentCat.x++;
                this.state.rows[currentCat.y][currentCat.x] = types.CAT;
                break;
            case MOVE_BOTTOM_RIGHT:
                this.state.rows[currentCat.y][currentCat.x] = types.EMPTY;
                if (currentCat.y % 2) {
                    currentCat.x++;
                }
                currentCat.y++;
                this.state.rows[currentCat.y][currentCat.x] = types.CAT;
                break;
            case MOVE_BOTTOM_LEFT:
                this.state.rows[currentCat.y][currentCat.x] = types.EMPTY;
                if (currentCat.y % 2 === 0) {
                    currentCat.x--;
                }
                currentCat.y++;
                this.state.rows[currentCat.y][currentCat.x] = types.CAT;
                break;
            default:
                sweetAlert({title: 'Well done!', text: 'You use ' + this.state.steps + ' steps to catch the cat.',type: 'success'});
                break;
        }

        this.setState({
            rows: this.state.rows
        });
    }

    render() {
        var self = this;
        var rowsHtml = [];

        this.state.rows.forEach(function (row, indexY) {

            var rowHtml = [];

            row.forEach(function (circleType, indexX) {
                rowHtml.push(<Circle key={'x' + indexX + 'y' + indexY} onClick={self.onCircleClick.bind(self)} x={indexX}
                                     y={indexY} type={circleType}/>);
            });

            rowsHtml.push(
                <Row key={'y' + indexY}>
                    {rowHtml}
                </Row>
            );

        });
        var className = 'main';
        if(this.state.isCatSad) {
            className += ' sad-cat';
        }
        return (
            <div className={className}>
                {rowsHtml}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
