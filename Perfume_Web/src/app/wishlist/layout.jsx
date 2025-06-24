const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Wishlist - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Save your favorite HQ PERFUME fragrances and build a wishlist of scents you love or plan to explore.",
    alternates: {
        canonical: `${frontendURL}/wishlist`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
