import { useTheme } from 'next-themes';
import Image from 'next/image';

const GitHubMark = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <a
      href="https://github.com/eno-conan/my-hobby-site-v2"
      aria-label="GitHub"
      target="_blank"
      rel="noreferrer"
      className="relative h-6 w-6 md:h-8 md:w-8 cursor-pointer overflow-hidden"
    >
      <Image
        src={
          currentTheme === 'dark'
            ? '/images/github-mark-white.png'
            : '/images/github-mark.png'
        }
        fill
        objectFit="cover"
        alt="github mark"
        // width={300}
        // height={300}
      />
    </a>
  );
};

export default GitHubMark;
