import Head from 'next/head';

/**
 * Header component
 * @returns 
 */
export default function Header() {
    return (
        <Head>
            <title>FCL Quickstart with NextJS</title>
            <meta name="description" content="My first web3 app on Flow!" />
            <link rel="icon" href="/favicon.png" />
        </Head>
    );
}