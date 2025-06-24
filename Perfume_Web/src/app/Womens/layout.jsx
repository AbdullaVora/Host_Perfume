const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Womens Collection - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Discover our luxurious Women's Collection – elegant, timeless scents designed to captivate and empower.",
    alternates: {
        canonical: `${frontendURL}/Womens`, // ✅ Canonical URL
    },
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
