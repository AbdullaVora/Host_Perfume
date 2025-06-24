const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Mens Collection - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Explore our exclusive Men's Collection – premium, long-lasting fragrances crafted for sophistication.",
    alternates: {
        canonical: `${frontendURL}/Mens`, // ✅ Canonical URL
    },
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
