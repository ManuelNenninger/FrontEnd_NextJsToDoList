import Head from 'next/head'
import Navbar from "../Navbar";
import Link from 'next/link';
import styles from '../../../styles/Home.module.css'



export default function NotLogedIn() {
  return (
    <>
  <Navbar />
  <div className={styles.container}>
    <Head>
      <title>To Do List in Next</title>
      <meta name="description" content="Not Signed In" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
    </Head>
    <main >
      <div className="container ">
        <h1>
        <Link href="/">
          <a>No session</a>
        </Link>
        </h1>
      </div>
    </main>
  </div>
  </>
)
}
