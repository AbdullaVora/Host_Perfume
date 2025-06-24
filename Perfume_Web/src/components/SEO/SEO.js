const { generateMetadata } = require("@/lib/SEO");

export const metadata = ({ data, url }) => {
  return generateMetadata(data, url);
};

 
