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
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <div className={styles.Label}>
          My Record App
        </div>
        {/* menu */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center border-r-2">
            {menuItems.map((item, i) => (
              <div className="mr-2" key={i}>
                {/* <Link href={item.link} prefetch={false}>
                  <a className="inline-block px-4 text-md font-medium no-underline rounded-md dark:text-gray-200 hover:text-primary focus:text-primary">
                    {item.label}
                  </a>
                </Link> */}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <GitHubMark />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
