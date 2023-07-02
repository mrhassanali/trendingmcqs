let pages = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.trendingmcqs.com/page/about</loc>
    <lastmod>2023-06-01</lastmod>
  </url>
  <url>
    <loc>https://www.trendingmcqs.com/page/privacy</loc>
    <lastmod>2023-06-02</lastmod>
  </url>
  <url>
    <loc>https://www.trendingmcqs.com/page/contact</loc>
    <lastmod>2023-06-03</lastmod>
  </url>
</urlset>
`;

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site


  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(pages);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
