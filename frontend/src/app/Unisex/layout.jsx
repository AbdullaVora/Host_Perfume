const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Unisex - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Experience the harmony of our Unisex Collection – versatile fragrances that transcend gender and celebrate individuality.",
    alternates: {
        canonical: `${frontendURL}/Unisex`, // ✅ Canonical URL
    },
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
