const frontendURL = process.env.NEXT_FRONTEND_URL

export const metadata = {
    title: "Contact Us - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "We're here to help. Reach out to HQ PERFUME for questions, support, or fragrance consultations.",
    alternates: {
        canonical: `${frontendURL}/contact`, // ✅ Canonical URL
    }
};

export default function MensLayout({ children }) {
    return <>{children}</>; // You can also wrap with a layout structure or styling if needed
}
