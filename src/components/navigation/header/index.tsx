// import Logo from '@/components/brand/logo';
import Link from 'next/link';
import GitHubMark from 'src/components/ui/github-mark';
import styles from "../../../styles/navigation/header.module.css";

const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'Components', link: '/' },
];

const Header = () => {
  return (
    <section className="bg-indigo-300 border-b-2 border-slate-500 dark:border-slate-600">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-2">
        <div className={styles.Label}>
          <Link href={'/'}> My Record App</Link>
        </div>
        {/* menu */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <GitHubMark />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
