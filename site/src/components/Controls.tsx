import React, { useRef } from 'react';
import styled from 'styled-components';
import { media } from './Layout';
import { Button } from './Button';
import Blobity from '../../../lib';
import { generatePrettyColor } from '../utils/colorGenerator';
import { initiaBlobityOptions } from '../pages';

const Wrapper = styled.div`
    display: block;
    position: relative;
    font-size: 16px;
`;

const Option = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 16px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 6px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    //z-index: 1;
    height: 46px;
`;

const Desc = styled.div`
    display: block;
    position: relative;
    z-index: 5;
    pointer-events: none;
    font-size: 14px;
    padding: 0 10px 0 0;
    font-weight: 700;

    @media ${media.midUp} {
        font-size: 16px;
    }
`;

const Triggers = styled.div`
    color: #888;
    text-transform: uppercase;
    font-size: 10px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    font-weight: 700;

    @media ${media.midUp} {
        font-size: 12px;
    }
`;

export const generateColorPair = () => {
    const hue = Math.floor(Math.random() * 360);
    const oppositeHue = hue > 180 ? hue - 180 : hue + 180;

    return {
        color: generatePrettyColor(hue),
        dotColor: generatePrettyColor(oppositeHue),
    };
};

const Rainbow = styled.div`
    display: block;
    background-color: #efd002;
    background-image: linear-gradient(
        319deg,
        #efd002 0%,
        #31b74a 37%,
        #442ce0 100%
    );
    position: absolute;
    z-index: 3;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
    border-radius: 3px;

    &:hover {
        opacity: 1;
    }
`;

const Shape = styled.div`
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #666;
    background: rgba(208, 26, 124, 1);
    margin: 0 0 0 10px;
    border-radius: 7px;
    vertical-align: middle;
`;

export const Controls: React.FC<{
    blobityInstance: React.MutableRefObject<Blobity | null>;
}> = ({ blobityInstance }) => {
    const focusRef = useRef<HTMLDivElement | null>(null);
    const bouncingInterval = useRef<number>();

    const focus = () => {
        const blobity = blobityInstance.current;

        if (focusRef.current) {
            blobity && blobity.focusElement(focusRef.current);
        }
    };

    const tooltip = () => {
        const blobity = blobityInstance.current;

        blobity && blobity.showTooltip('Like this');
    };

    const reset = () => {
        const blobity = blobityInstance.current;

        if (focusRef.current) {
            blobity && blobity.reset();
        }
    };

    const startBouncing = () => {
        const blobity = blobityInstance.current;
        bouncingInterval.current && clearInterval(bouncingInterval.current);
        const bounce = () => {
            blobity && blobity.bounce();
        };
        bouncingInterval.current = window.setInterval(bounce, 800);
        bounce();
    };
    const stopBouncing = () => {
        const blobity = blobityInstance.current;

        bouncingInterval.current && clearInterval(bouncingInterval.current);
        bouncingInterval.current = undefined;
    };

    return (
        <Wrapper>
            <Option>
                <Desc>
                    <div ref={focusRef}>Draw attention</div>
                </Desc>
                <Triggers>
                    <Button tiny ghost onClick={focus}>
                        Focus element
                    </Button>
                </Triggers>
            </Option>
            <Option>
                <Desc>Clarify things</Desc>
                <Triggers>
                    <Button tiny ghost onClick={tooltip}>
                        Show tooltip
                    </Button>
                </Triggers>
            </Option>
            <Option>
                <Desc>Reset all of the above</Desc>
                <Triggers>
                    <Button tiny ghost onClick={reset}>
                        Reset controls
                    </Button>
                </Triggers>
            </Option>
            <Option onMouseOver={startBouncing} onMouseLeave={stopBouncing}>
                <Desc>Instant feedback</Desc>
                <Triggers>Hover to bounce</Triggers>
            </Option>
        </Wrapper>
    );
};
