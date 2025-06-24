// lib/seo.js

export function generateSeoMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  robots = 'index, follow',
}) {
  return {
    title: title || 'Default Title',
    description: description || 'Default description',
    keywords,
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      images: ogImage ? [ogImage] : [],
      url: ogUrl || canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: twitterCard,
      title: ogTitle || title,
      description: ogDescription || description,
      images: ogImage ? [ogImage] : [],
    },
    robots,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
