const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "All Collections - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Browse our full range of premium fragrances – including Men’s, Women’s, and Unisex collections.",
    alternates: {
        canonical: `${frontendURL}/collection`, // ✅ Canonical URL
    },
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
