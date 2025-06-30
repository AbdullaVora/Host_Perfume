const frontendURL = process.env.NEXT_FRONTEND_URL;

export const metadata = {
    title: "Terms & Conditions - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Read the Terms and Conditions for shopping with HQ PERFUME. Learn about usage policies, orders, and legal responsibilities.",
    alternates: {
        canonical: `${frontendURL}/terms-and-conditions`,
    },
};

export default function TermsLayout({ children }) {
    return <>{children}</>;
}
