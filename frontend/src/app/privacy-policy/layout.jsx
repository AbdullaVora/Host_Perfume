const frontendURL = process.env.NEXT_FRONTEND_URL;

export const metadata = {
    title: "Privacy Policy - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Read HQ PERFUME's privacy policy to understand how your personal information is collected, used, and protected.",
    alternates: {
        canonical: `${frontendURL}/privacy-policy`,
    },
};

export default function PrivacyPolicyLayout({ children }) {
    return <>{children}</>;
}
