import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useState,useEffect  } from 'react';
import { AppContext } from '../context/AppContext';
import { useContext, useTransition } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const {user, authenticated,Logout  } = useContext(AppContext);
  const router= useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const { data:session,status } = useSession();
  
  return ( 
  <header>
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <span className='ms-4 fw-bold fst-italic fs-'>TrendingMCQs</span>
        </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/page/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/page/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/page/privacy">Privacy Policy</Link>
             </li>

             
{
(status == 'authenticated')?(
  <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Post
  </a>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" href="/Admin/Post">Posts</Link></li>
    <li><Link className="dropdown-item" href="/Admin/Category">Category</Link></li>
    <li><Link className="dropdown-item" href="/Admin/AddPost">Add New Post</Link></li>
    {/* <li><hr className="dropdown-divider"/></li> */}
    </ul>
</li>
):null
}

            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> &nbsp;
            

 <div className="d-flex">

 {
(status == 'authenticated')? (<button type="button" className="btn btn-primary ms-2" onClick={()=>{
  window.localStorage.removeItem("token");
  Logout();

}}>Logout</button>
):
("")     
// (<Link href="/Login"><button type="button" className="btn btn-primary ms-2">Login</button></Link>)     
            }

</div>           

          </div>
        </div>
    </nav>
  </header>
  )
}
