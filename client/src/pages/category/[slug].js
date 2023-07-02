import Sidebar from "../../components/Sidebar";
import HomePage from "../HomePage";

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);
  const data = await response.json();

  const paths = data.map((category) => ({
    params: { slug: category.category_slug },
  }));
 
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const {slug } = params;
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${slug}`);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${slug}`);
  const category = await response.json();
  return {
    props: { category },
  }
}


const Slug = ({ category }) => {
  if (!category) {
    // Handle the case when category is undefined
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mt-4">
        <div className="row g-5">
          <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom">
              {category.length !== 0 ? category[0].category.category_name : "Not Found Any Post..."}
            </h3>
            {category.map((element, index) => {
              return (
                <HomePage
                  key={index}
                  element={element} // Pass the image property to HomePage
                />
              );
            })}
          </div>
          <aside className="col-md-4">
            <Sidebar />
          </aside>
        </div>
      </div>
    </>
  );
};


export default Slug;

