import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import happyCatImg from './happy-cat.png';
import sadCatImg from './sad-cat.png';

const play = keyframes`
    100% {
        background-position: -240px;
    }
`;

const sadCatPlay = keyframes`
    100% {
        background-position: -325px;
    }
`;

const StyledCircle = styled.div`
    width: 50px;
    height: 50px;
    background-color: #b5b5b5;
    text-indent: -9999px;
    border-radius: 24px;
    float: left;
    margin: 1px 2px;
    position: relative;
    &.blocked {
        background-color: #ff845e;
    }
    &.cat > div {
        pointer-events: none;
        position: absolute;
        width: 60px;
        height: 95px;
        background: url(${happyCatImg}) left center;
        animation: ${play} .8s steps(4) infinite;
        bottom: 12px;
        left: -6px;
        .sad-cat & {
            width: 65px;
            height: 95px;
            background: url(${sadCatImg}) left center;
            -webkit-animation: ${sadCatPlay} .8s steps(5) infinite;
            bottom: 2px;
            left: -6px;
        }
    }
`;

interface Props {
    onClick(x: number, y: number, type: string): any;
    x: number;
    y: number;
    type: string;
}

class Circle extends React.Component<Props> {
    onClick() {
        this.props.onClick(this.props.x, this.props.y, this.props.type);
    }

    render() {
        const className = 'circle ' + this.props.type.toLowerCase();
        return <StyledCircle onClick={this.onClick} className={className}><div>Circle</div></StyledCircle>;
    }
}

export const types = {
    EMPTY: 'EMPTY',
    BLOCKED: 'BLOCKED',
    CAT: 'CAT'
};

export default Circle;
