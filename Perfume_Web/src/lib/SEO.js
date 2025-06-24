
// Base SEO configuration
export const siteConfig = {
  name: "LuxScent - Premium Perfumes & Fragrances",
  description: "Discover premium perfumes and fragrances for men and women. Shop luxury scents, designer fragrances, and exclusive collections online.",
  url: "https://your-domain.com",
  ogImage: "/images/og-image.jpg",
  twitter: "@yourhandle",
  keywords: "perfume, fragrance, luxury perfume, designer fragrance, men perfume, women perfume, cologne, eau de parfum"
}

// Generate metadata for any page
export function generateMetadata(seoData, path = '') {
  const canonical = seoData.canonical || `${siteConfig.url}${path}`
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    robots: seoData.noindex ? "noindex, nofollow" : "index, follow",
    canonical,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: seoData.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage || siteConfig.ogImage],
      creator: siteConfig.twitter,
    },
    alternates: {
      canonical,
    },
    other: {
      'google-site-verification': 'your-google-verification-code',
    }
  }
}

// Product SEO data generator
export function generateProductSEO(product) {
  return {
    title: `${product.name} - ${product.brand} | ${siteConfig.name}`,
    description: `Buy ${product.name} by ${product.brand}. ${product.description || 'Premium quality perfume with long-lasting fragrance.'} Free shipping available.`,
    keywords: `${product.name}, ${product.brand}, perfume, fragrance, ${product.category}, buy online, ${product.metaTitle || ''}, ${product.metaKeywords || ''}`,
    ogImage: product.image || siteConfig.ogImage,
  }
}

// Blog SEO data generator
export function generateBlogSEO(blog) {
  return {
    title: blog.metaTitle || `${blog.title} | ${siteConfig.name} Blog`,
    description: blog.metaDescription || blog.excerpt || blog.description,
    keywords: blog.metaKeywords || blog.tags?.join(', ') || 'perfume tips, fragrance guide',
    ogImage: blog.featuredImage || siteConfig.ogImage,
  }
}

// Static pages SEO data
export const staticPagesSEO = {
  home: {
    title: `${siteConfig.name} - Premium Perfumes & Designer Fragrances Online`,
    description: "Shop premium perfumes and luxury fragrances online. Discover exclusive collections for men and women with free shipping and authentic products.",
    keywords: "buy perfume online, luxury fragrance, designer perfume, men cologne, women perfume, authentic fragrance store"
  },
  
  collection: {
    title: `Perfume Collections | ${siteConfig.name}`,
    description: "Explore our curated perfume collections featuring top brands and exclusive fragrances. Find your signature scent from our premium selection.",
    keywords: "perfume collection, fragrance collection, luxury perfume brands, designer fragrance collection"
  },
  
  mens: {
    title: `Men's Perfumes & Colognes | ${siteConfig.name}`,
    description: "Discover premium men's perfumes and colognes. Shop masculine fragrances from top designers and luxury brands with authentic guarantee.",
    keywords: "men perfume, mens cologne, masculine fragrance, men's eau de toilette, designer cologne for men"
  },
  
  womens: {
    title: `Women's Perfumes & Fragrances | ${siteConfig.name}`,
    description: "Shop elegant women's perfumes and fragrances. Discover floral, fruity, and sophisticated scents from luxury brands.",
    keywords: "women perfume, ladies fragrance, feminine scent, women's eau de parfum, luxury perfume for women"
  },
  
  fragrance: {
    title: `All Fragrances | ${siteConfig.name}`,
    description: "Browse our complete fragrance collection. Find the perfect scent from our extensive range of premium perfumes and colognes.",
    keywords: "all fragrances, complete perfume collection, fragrance catalog, perfume shop online"
  },
  
  about: {
    title: `About Us | ${siteConfig.name}`,
    description: "Learn about our passion for premium fragrances. Discover our story, mission, and commitment to bringing you authentic luxury perfumes.",
    keywords: "about us, perfume store story, luxury fragrance retailer, authentic perfumes"
  },
  
  contact: {
    title: `Contact Us | ${siteConfig.name}`,
    description: "Get in touch with our fragrance experts. Contact us for perfume advice, orders, or any questions about our luxury fragrance collection.",
    keywords: "contact perfume store, fragrance customer service, perfume support, get in touch"
  },
  
  blogs: {
    title: `Fragrance Blog | ${siteConfig.name}`,
    description: "Read our fragrance blog for perfume tips, scent guides, and the latest trends in luxury fragrances. Expert advice and reviews.",
    keywords: "perfume blog, fragrance tips, scent guide, perfume reviews, fragrance trends"
  }
}

// SEO Schema markup generators
export function generateProductSchema(product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteConfig.url}/products/${product.slug}`,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": siteConfig.name
      }
    },
    "aggregateRating": product.rating && {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount || 1
    }
  }
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteConfig.url}${item.url}`
    }))
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-xxx-xxx-xxxx",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/yourpage",
      "https://instagram.com/yourpage",
      "https://twitter.com/yourhandle"
    ]
  }
}