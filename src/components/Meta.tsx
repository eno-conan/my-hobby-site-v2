import React from 'react'
import Head from 'next/head'

// ページのタイトル（chromeタブの文言などを設定）
const Meta = ({ title = "Eno Record App", description = "Eno Record App" }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${process.env.SITE_URL}/ogp_large.png`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="robots" content="noindex" />
            {/* Windowsでは対応してないから、設定しておくだけマシくらいらしい */}
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="white" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
        </Head>
    )
}

export default Meta
