import React, { useState } from 'react'

const LearnMemo2 = () => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(100);

    const countUpCounter1 = () => {
        setCounter1(counter1 + 1);
    };
    const countUpCounter2 = () => {
        setCounter2(counter2 + 100);
    };

    const weightFunction = () => {
        // 重い処理を実行する。
        let i = 0;
        while (i < 10) {
            i++;
        };

        return counter2 * counter2;
    };

    return (
        <>
            <div className='container pl-8'>
                <p>カウンター１: {counter1}</p>
                <p>カウンター２: {counter2}</p>
                <p>weightFunctionResult: {weightFunction()}</p>
                <div className='my-8'>
                    <button onClick={countUpCounter1} className={"bg-red-500"}>+1</button>
                </div>
                <button onClick={countUpCounter2} className={"bg-blue-300"}>+100</button>
                <div className='line'></div>
            </div>
        </>
    );
}

export default LearnMemo2
