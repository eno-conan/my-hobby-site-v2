import React, { useState } from 'react'



function SuperSlowComponent() {
    const now = performance.now();
    while (performance.now() - now < 200) { }
    return <div>Super slow component</div>;
}

function Form({ left, right }: any) {
    const [name, setName] = useState("");

    const checkValue = () => {
        setName('')
    }
    return (
        <>
            <form onSubmit={checkValue}>
                {left}
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {right}
                <button type='submit'>提出</button>
            </form>
        </>
    );
}

const LearnMemo2 = () => {
    // const [name2, setName2] = useState("");
    return (
        <>
            <div className='container pl-8'>
                <Form right={<SuperSlowComponent />} left={<h1>Hello</h1>} />
            </div>
        </>
    );
}

export default LearnMemo2
