const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Checkout - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Securely complete your purchase of HQ PERFUME’s premium fragrances. Fast and easy checkout process.",
    alternates: {
        canonical: `${frontendURL}/checkOut`, // ✅ Canonical URL
    }    
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
