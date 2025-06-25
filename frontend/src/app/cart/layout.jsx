const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Your Cart - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Review the luxury fragrances in your cart and get ready for an exquisite checkout experience with HQ PERFUME.",
    alternates: {
        canonical: `${frontendURL}/cart`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
