import React, { memo, useMemo, useState } from 'react'

function SuperSlowComponent() {
    const now = performance.now();
    while (performance.now() - now < 200) { }
    return (
        <>
            <div>Super slow component</div>
        </>
    );
}

const MemoSupserSlowComponent = memo(SuperSlowComponent);

const LearnMemo = () => {
    const [name, setName] = useState("");

    return (
        <div className="app">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <MemoSupserSlowComponent />
        </div>
    );
}

export default LearnMemo
