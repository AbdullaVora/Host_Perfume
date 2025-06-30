const frontendURL = process.env.NEXT_FRONTEND_URL;

export const metadata = {
    title: "Return & Cancellation Policy - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Learn about HQ PERFUME's return and cancellation policy including eligibility, and conditions for order changes.",
    alternates: {
        canonical: `${frontendURL}/cancellation-policy`,
    },
};

export default function ReturnPolicyLayout({ children }) {
    return <>{children}</>;
}
