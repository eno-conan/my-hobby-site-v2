import styles from "../styles/components/headline.module.css";

interface Props {
  headline: string;
}

// ページ見出しComponent
const Headline = ({ headline }: Props) => {
  return <div className={styles.Label}>{headline}</div>;
};

export default Headline;
