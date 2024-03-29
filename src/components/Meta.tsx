import React from "react";
import Head from "next/head";

// ページのタイトル（chromeタブの文言などを設定）
const Meta = ({ title = "Eno Record App", description = "Eno Record App" }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.SITE_URL}/ogp_large.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="noindex" />
      {/* Windowsでは対応してないから、設定しておくだけマシくらいらしい */}
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="white"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="black"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/kogoro/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/kogoro/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/kogoro/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/kogoro/site.webmanifest" />
    </Head>
  );
};

export default Meta;
