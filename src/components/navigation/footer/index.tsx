const Footer = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-800 py-6">
      <div className="container mx-auto min-h-[10vh] md:min-h-fit flex flex-col md:flex-row items-center justify-between px-2 md:px-10 py-2">
        <div className="social">
          <a
            href="https://vercel.com/eno-conan"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="headingxs hover:underline"
          >
            Check on Vercel
          </a>
        </div>
        <div>Copyright &copy; {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
};

export default Footer;
