const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Register - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Create your HQ PERFUME account to explore exclusive fragrances and receive personalized recommendations.",
    alternates: {
        canonical: `${frontendURL}/register`, // ✅ Canonical URL
    },
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
