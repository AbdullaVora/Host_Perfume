const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
     title: "Fragrances - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Immerse yourself in the world of HQ PERFUME – a curated collection of luxurious, long-lasting fragrances for every mood and moment.",
    alternates: {
        canonical: `${frontendURL}/Fragnance`, // ✅ Canonical URL
    },
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
