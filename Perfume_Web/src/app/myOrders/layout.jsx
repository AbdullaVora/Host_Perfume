const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "My Orders - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Track your orders and view your fragrance purchase history with HQ PERFUME.",
    alternates: {
        canonical: `${frontendURL}/myOrders`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
