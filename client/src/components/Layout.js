import Navbar from "./Navbar"
import Footer from "./Footer"
import Head from "next/head"
import { siteName, description, sitekeywords } from '../../config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Layout({children}){
  return (
    <>
    <Head>
        <title>{siteName}</title>
        <meta charSet="UTF-8"></meta>
        <link rel="icon" href="/trendingmcqs.png" />
        <meta name="description" content={description} />
        <meta name="keywords" content={sitekeywords} />
        <meta name="author" content="Hassan Ali"/>
        <meta name="google-site-verification" content="vsOmHF3IuXHzeK2Z9HkRTSiPGN2FiUseJmMygiErwuA" />
      </Head>
      <Navbar />
      
<ToastContainer
position="top-right"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <main>{children}</main>
      <Footer/>
    </>
  )
}
