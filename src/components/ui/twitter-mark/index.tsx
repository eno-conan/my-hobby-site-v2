import { useTheme } from "next-themes";
import Image from "next/image";

const TwitterMark = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <a
      href="https://twitter.com/home?lang=ja"
      aria-label="GitHub"
      target="_blank"
      rel="noreferrer"
      className="relative h-6 w-6 md:h-8 md:w-8 cursor-pointer overflow-hidden"
    >
      <Image
        src={currentTheme === "dark" ? "/images/twitter-mark.png" : "/images/twitter-mark.png"}
        fill
        alt="github mark"
        // width={300}
        // height={300}
      />
    </a>
  );
};

export default TwitterMark;
