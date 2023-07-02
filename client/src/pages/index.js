import Head from 'next/head'
import Image from 'next/image' 
import Sidebar from '../components/Sidebar'
import Link from 'next/link'
import HomePage from './HomePage'
import Card from '../components/Card'

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  const postdata = await response.json();

  return {
    props: {postdata}, // will be passed to the page component as props
  }
}

export default function Home({postdata}) {

return (
<>


{/* <div className="container px-4 py-1" id="custom-cards">
    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          {
            postdata.slice(0,3).map((element,index)=>{
              return <Card key={index} element={element}/>
            })
          }  
        </div>
    </div> */}

  <div className="container mt-3">
  <div className="row mb-2">
        {
          postdata.slice(0,2).map((element,index)=>{
            const{title,description,slug,published,updated,image} = element;
            return(
              <div className="col-md-6" key={index}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                  <Link href={`/category/${element.category.category_slug}`}>
                    <strong className={`d-inline-block mb-2 ${index==0?'text-primary':'text-success'}`}>{element.category.category_name.toUpperCase()}</strong>
                  </Link>
                    <h3 className="mb-0">{title.slice(0,18)}</h3>
                    <div className="mb-1 text-muted">{updated==null?new Date(published).toLocaleDateString():updated}</div>
                    <p className="card-text mb-auto">{description.slice(0,70)}</p>
            
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link href={`/post/${slug}`}>
                        <button className="btn btn-primary me-md-2" type="button">Read More</button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-auto d-none d-lg-block p-2">
                    <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${image}`}
                    alt={`${title}`}
                    width={210} height={250} 
                    style={{objectFit:"contain"}}  className="bd-placeholder-img" priority/>
                  </div>
                </div>
              </div>
            )
          })
        }
    </div>

      <div className="row g-5">
        <div className="col-md-8">
          <h3 className="pb-4 mb-4 fst-italic border-bottom">Posts</h3>
            {
              postdata.map((element,index)=>{
                return <HomePage key={index} element={element}/>
              })
            }
        </div>
        <aside className="col-md-4"><Sidebar/></aside>
      </div>
</div>
</>
  )
}
