import Link from "next/link";
import {footerDescription} from "../../config";
import Image from "next/image";

export default function Footer(){
    return(
<footer>

<div className="container-fluid mt-5">
  <div className="p-5 text-center bg-body-tertiary rounded-3">
    <Image src="/trendingmcqs.png" alt="trendingmcqs.com" width="150" height="150" className="mb-3"/>
     <h1 className="text-body-emphasis">About Website</h1>
    <p className="col-lg-8 mx-auto fs-5 text-muted">{footerDescription}<br></br>
      if you have any Query then Contact me
    </p>
    <div className="d-inline-flex gap-2 mb-5">
      <Link href={"/page/contact"}>
      <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
        Contact</button>
      </Link>
    </div>
  </div>
</div>

<div className="container">
    <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div  className="col-md-4 d-flex align-items-center">
      <span  className="mb-3 mb-md-0 text-muted">© 2023 TrendingMCQs.com All Right Reserved</span>
    </div>
    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><Link className="text-muted" href="https://twitter.com/hihassanali" target="_blank">  Twitter</Link></li>
      <li className="ms-3"><Link className="text-muted" href="https://instagram.com/web.hassanali" target="_blank">instagram</Link></li>
      <li className="ms-3"><Link className="text-muted" href="https://facebook.com/technicalhassanali" target="_blank"> facebook</Link></li>
    </ul>
    </div>
</div>
</footer>
    )
}