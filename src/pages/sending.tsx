import React from "react";
import styles from "../styles/pages/loading.module.css";

const Sending = () => {
  return (
    <>
      <div className={styles.Label}>Sending...</div>
      <div className={"flex justify-center"}>
        <div className={"animate-ping h-2 w-2 bg-purple-700 rounded-full"} />
        <div className={"animate-ping h-2 w-2 bg-purple-700 rounded-full mx-4"} />
        <div className={"animate-ping h-2 w-2 bg-purple-700 rounded-full"} />
      </div>
    </>
  );
};

export default Sending;
