const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Forgot Password - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Reset your HQ PERFUME account password quickly and securely to continue enjoying our luxury fragrance experience.",
    alternates: {
        canonical: `${frontendURL}/forgot`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
