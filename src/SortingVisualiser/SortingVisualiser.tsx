import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./SortingVisualiser.css";
import useWindowDimensions from "./hooks/useWindowDimensions";
import {getMergeSortAnimations} from './sortingAlgorithm/sortingAlgorithm';

const SortingVisualiser = () => {
    const [arr, setArr] = useState<Array<number>>([]);
    const { width } = useWindowDimensions();

    const numWidth = Math.floor(width / (arr.length * 3));
    const barWidth = `${numWidth}px`;

    const ANIMATION_SPEED_MS = 20;
    // This is the main color of the array bars.
    const PRIMARY_COLOR = 'turquoise';

    // This is the color of array bars that are being compared throughout the animations.
    const SECONDARY_COLOR = 'red';

    const [size, setSize] = useState<number>(10)

    const resetSize = (x: number) => {
        setSize(x);
        resetArray();
    }




    const mergeSort = ():void => {
        const animations = getMergeSortAnimations(arr);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>);
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    const resetArray = (): void => {
        let tmp: number[] = [];
        for (let i = 0; i < size + 1; i++) {
            tmp.push(getRandomInt(5, 500));
        }
        setArr(tmp);
    };

    useEffect(() => {
        let tmp: number[] = [];
        for (let i = 0; i < 10 + 1; i++) {
            tmp.push(getRandomInt(5, 500));
        }
        setArr(tmp);
    }, []);

    return (
        <>
            <Navbar generate={resetArray} size={resetSize} />
            <button onClick = {mergeSort}>MergeSort</button>
            <div className="array-container">
                {arr.map((value, idx): any => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: "turquoise",
                            height: `${value}px`,
                            width: `${barWidth}`,
                        }}
                    ></div>
                ))}
            </div>
        </>
    );
};

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default SortingVisualiser;
