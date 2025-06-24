// Example mock fetch
async function fetchProductById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/IdpProduct/${id}`);
    // console.log("Fetching product with ID:", res.json());
    return res.ok ? res.json() : null;
}

export async function generateMetadata({ params }) {
    const { id } = params;
    const product = await fetchProductById(id);
    console.log("params:", product.product);

    if (!product) {
        return {
            title: "Product Not Found - HQ PERFUME",
            description: "We couldn't find the fragrance you're looking for.",
        };
    }

    return {
        title: `${product?.product?.metaTitle} - HQ PERFUME`,
        description: product?.product?.metaDescription || "Discover luxurious scents at HQ PERFUME.",
        keywords: `${product?.product?.metaKeywords}, HQ PERFUME, luxury perfume, long-lasting fragrance`,
        authors: [{ name: "HQ PERFUME" }],
        creator: "HQ PERFUME",
        metadataBase: new URL(process.env.NEXT_FRONTEND_URL), // for full OG image paths
        openGraph: {
            title: `${product?.product?.metaTitle} - HQ PERFUME`,
            description: product?.product?.metaDescription,
            url: `${process.env.NEXT_FRONTEND_URL}/${id}`,
            type: "website",
            siteName: "HQ PERFUME",
            images: [
                {
                    url: product?.product?.main, // full URL preferred
                    width: 1200,
                    height: 630,
                    alt: product?.product?.metaTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product?.product?.metaTitle} - HQ PERFUME`,
            description: product?.product?.metaDescription,
            images: [product?.product?.main],
        },
    };
}

export default function ProductLayout({ children }) {
    return <>{children}</>;
}
