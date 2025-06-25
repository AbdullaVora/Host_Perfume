const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Change Password - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Update your HQ PERFUME account password to keep your profile secure and your shopping experience safe.",
    alternates: {
        canonical: `${frontendURL}/change-password`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
