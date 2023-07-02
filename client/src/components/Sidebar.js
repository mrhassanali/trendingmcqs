import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image'

import moment from "moment/moment";

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category?key=${process.env.API_KEY}`);
//   const categorys = await res.json();
  
 
//   // Pass data to the page via props
//   console.log(categorys);
//   return { props: { categorys } };
// }

export default function Sidebar() {
const[category,setcategory] = useState([]);
const[post,setPost] = useState([]);

useEffect(() => {

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      setcategory(data);
      // console.log(data)
    }).
    catch((error) => console.log(error));


    // fetch(`/api/post?key=${process.env.API_KEY}`, {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        // console.log(data)
      }).
      catch((error) => console.log(error));

}, []);



// const publishedDate = '2023-04-20T00:22:12.000Z';
// const timeAgo = moment(publishedDate).fromNow();
// console.log(timeAgo); // will output something like '2 hours ago' or '3 days ago'




  return (
<div className="position-sticky" style={{top: "2rem"}}>

<h3 className="pb-4 mb-4 fst-italic border-bottom">Popular Post</h3>
<div className="list-group">
{
  post.slice(0,5).map((element,index)=>{
    return(
      <Link href={`/post/${element.slug}`} key={index} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
      {/* <img src="https://github.com/twbs.png" /> */}
      <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${element.image}`} 
            width="32" height="32"  alt="twbs" className="rounded-circle flex-shrink-0"
            style={{objectFit:"fill"}}
            />
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 className="mb-0">{element.title}</h6>
          <p className="mb-0 opacity-75">{element.description.slice(0,45)}</p>
        </div>
        <small className="opacity-50 text-nowrap">{element.published? moment(element.published).fromNow():moment(element.updated).fromNow()}</small>
      </div>
    </Link>
    )
  })
}

  </div>


    {/* <div  className="p-4">
      <h4  className="fst-italic">Archives</h4>
      <ol  className="list-unstyled mb-0">
        <li><a href="#">March 2021</a></li>
        <li><a href="#">February 2021</a></li>
        <li><a href="#">January 2021</a></li>
        <li><a href="#">December 2020</a></li>
      </ol>
    </div> */}


    <div className="p-4">
      <h4 className="fst-italic">Category</h4>
      {
        category.slice(0,5).map((element,index)=>{
          // const{category_name,category_slug} = element;
         return(
          <Link href={`/category/${element.category_slug}`} key={index}>
          <button type="button" className="btn btn-outline-primary m-1">{element.category_name}</button>
        </Link>
         )
        })
      }
    </div>

  </div>
  )
}
