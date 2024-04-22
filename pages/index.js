import Head from "next/head";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";

const CryptoCheckout = dynamic(
  () => import("amplify-sdk").then((mod) => mod.CryptoCheckout),
  { ssr: false }
);

export default function Home() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  async function fetchBalance() {
    try {
      const getBalance = await axios.get(
        "http://localhost:3000/api/amplify/balance"
      );

      setBalance(getBalance.data.available);
    } catch (err) {
      setBalance(0);
    }
  }

  return (
    <>
      <Head>
        <title>[AMPLIFY EXAMPLES] Read balance with Next</title>
        <meta name="description" content="[AMPLIFY EXAMPLES] SDK with Next" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.balanceContainer}>
          <p>Balance: {balance}</p>
          <button onClick={fetchBalance}>Refresh balance</button>
        </div>
        <div className={styles.amplifyContainer}>
          <CryptoCheckout
            createPaymentIntentUrl="http://localhost:3000/api/amplify/intent"
            environment="test"
            language="ES"
            theme="dark"
            onError={(e) => console.log(e)}
          />
        </div>
      </main>
    </>
  );
}
