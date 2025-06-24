const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Verify OTP - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Secure your HQ PERFUME account with a one-time password verification step to protect your fragrance journey.",
    alternates: {
        canonical: `${frontendURL}/verify-otp`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
