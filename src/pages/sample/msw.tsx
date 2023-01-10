import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Source } from "../../../types";

// type Props = {
//     data: Source;
// };

const MswIndex: NextPage = (props: any) => {
    // const { status, data } = useFetchData();
    // if (status === 'loading') {
    //     return <p>Loading...</p>;
    // }
    // if (status === 'error') {
    //     return <p>There was an error fetching the data!</p>;
    // }
    return (
        <>
            {props.data && props.data.map((d: any, idx: number) => {
                return (
                    <div key={idx}>
                        {idx % 50 == 0 ? (<>{d.title}</>) : (<></>)}
                    </div>
                )
            })}
        </>
    );
};

interface IResData {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

// function useFetchData() {
//     const [status, setStatus] = useState('idle');
//     const [data, setData] = useState<IResData[]>();
//     useEffect(() => {
//         setStatus('loading');
//         fetch('https://jsonplaceholder.typicode.com/todos')
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(res.statusText);
//                 }
//                 return res;
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 setStatus('success');
//                 setData(data);
//             })
//             .catch(() => {
//                 setStatus('error');
//             });
//     }, []);
//     return {
//         status,
//         data,
//     };
// }

export const getServerSideProps: GetServerSideProps<any> = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const dataJson = await data.json();
    return {
        props: {
            data: dataJson,
        },
    };
};

export default MswIndex;
