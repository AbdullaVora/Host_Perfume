const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Blog - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Discover fragrance tips, scent stories, and the latest from the world of HQ PERFUME.",
    alternates: {
        canonical: `${frontendURL}/profile`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
