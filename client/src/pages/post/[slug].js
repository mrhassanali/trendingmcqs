import Head from "next/head";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  const data = await response.json();
  const paths = data.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const {slug } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`);
  const post = await response.json();

  return {
    props: { post },
  }
}

const Slug = ({ post }) => {

  useEffect(() => {
    var answerButtons = document.querySelectorAll('.accordion');
    answerButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var answerPanel = this.nextElementSibling;
         answerPanel.setAttribute('style','display:none');
        if (answerPanel.style.display === 'none') {
          answerPanel.style.display = 'block';
        } else {
          answerPanel.style.display = 'none';
        }   
      });
    });
    
      }, []);

  const router = useRouter();
  
  if (router.isFallback) {// If the post is still being fetched, display a loading message
    return <div>Loading...</div>;
  }

  if (!post) {// If the post is not found, display an error message
    return <div>Post not found.</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keyword} />
      </Head>

      <div className="container mt-4">
        <div className="row g-5">
          <div className="col-md-8">
            {
               post.image && (<div className={'image-container'}>
                  <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/image/${post.image}`}
                  alt="image" width="730" height="400" style={{ objectFit: "fill" }}
                  className={'image'}  priority />
              </div> 
            )}

            <h3 className="pb-4 mb-4 fw-bold border-bottom mt-3">{post.title}</h3>
            <article className="fs-4">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

          </div>
          <div className="col-md-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slug;

