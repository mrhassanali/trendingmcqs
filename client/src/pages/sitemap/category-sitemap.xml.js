//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`;

function generateSiteMap(category) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${category.map(({ category_slug, published,updated }) => {
           return `
             <url>
               <loc>${`https://www.trendingmcqs.com/category/${category_slug}`}</loc>
               <lastmod>${updated==null?published:updated}</lastmod>
             </url>
           `;
         })
         .join('')}
     </urlset>
   `;
  }
  
  

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const category = await request.json();

  // We generate the XML sitemap with the category data
  const sitemap = generateSiteMap(category);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;