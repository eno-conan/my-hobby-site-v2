import React, { useMemo, useState } from 'react'

const LearnMemo = () => {
    const [countNormal, setCountNormal] = useState(0);
    const [countHeavy, setCountHeavy] = useState(0);

    const heavyFunction = (count: number) => {
        let i = 0;
        while (i < 10000000) i++;
        return count;
    };

    return (
        <>
            <div className='container pl-8'>
                <div className="app-counter">
                    <div>Normal: {countNormal}</div>
                    <div>Heavy: {heavyFunction(countHeavy)}</div>
                </div>
                <div className="app-button">
                    <div>
                        <button onClick={() => setCountNormal(countNormal + 1)}>Normal+</button>
                    </div>
                    <div>
                        <button onClick={() => setCountHeavy(countHeavy + 1)}>Heavy+</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LearnMemo
