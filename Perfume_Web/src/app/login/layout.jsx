const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Login - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Access your HQ PERFUME account to manage orders, wishlist, and enjoy a personalized fragrance experience.",
    alternates: {
        canonical: `${frontendURL}/login`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
