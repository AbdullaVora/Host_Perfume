const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "About Us - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Learn the story behind HQ PERFUME – our passion for fine fragrance, craftsmanship, and timeless luxury.",
    alternates: {
        canonical: `${frontendURL}/about`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
