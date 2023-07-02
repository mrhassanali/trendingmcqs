import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export async function getServerSideProps({req,res}) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  let publishedPost = await response.json();
  const session = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }



  return {
    props: { publishedPost,session }, // will be passed to the page component as props
   
  };
}

export default function Post({ publishedPost }) {
  let router = useRouter();


 function deletePost(id) {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,{
      method: 'Delete',
      headers: {
        'authorization':window.localStorage.getItem('token')
      }
  });
   router.push('/Admin/Post');
  
}

  return (
    <div className="container mt-3 fs-5">
      <div className="d-flex flex-row-reverse">
        <div className="p-2">
          <Link href={"./AddPost"}>
            <button type="button" className="btn btn-primary">
              Add New Post
            </button>
          </Link>
        </div>
      </div>
      {publishedPost.map((element, index) => {
        const {id,title,slug,published,updated,status,image} = element;
        return (
          <div className="card mb-3" key={index}>
            <div className="row g-0">
              <div className="col-md-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${image}`}
                  className="img-fluid rounded-start float-start"
                  alt="..."
                  width={900}
                  height={250}
                  style={{ objectFit: "fill", height: "100%" }}
                  priority
                />
              </div>
              <div className="col-md-10">
                <div className="d-flex">
                  <div className="p-2 w-100">
                    <h5
                      className="card-title fs-4 fw-bold"
                      style={{ fontFamily: "arial" }}
                    >
                      {title}
                    </h5>
                    {
  status === "Published" && (
    <small className="d-inline-flex mb-3 px-2 py-1 fw-semibold text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">
      {status}
    </small>
  )
}
{
  (status === "Draft" || status === "Save") && (
    <small className="d-inline-flex mb-3 px-2 py-1 fw-semibold text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2">
      Draft
    </small>
  )
}


                    <p className="card-text">
                      <small className="text-body-secondary">
                        {new Date(published).toLocaleString()}
                      </small>
                    </p>
                  </div>
                  <div
                    className="p-2 flex-shrink-1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                      <Link href={`/Admin/Edit/${slug}`}  state={id}>
                      <button type="button" className="btn btn-primary">
                        Edit
                      </button>
                      </Link>
                      <Link href={`/post/${slug}`}>
                        <button className="btn btn-primary " type="button">
                          View
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => deletePost(id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

