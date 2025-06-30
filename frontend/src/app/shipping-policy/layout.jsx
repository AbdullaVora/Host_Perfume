const frontendURL = process.env.NEXT_FRONTEND_URL;

export const metadata = {
    title: "Shipping Policy - HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description: "Find out how HQ PERFUME handles shipping, delivery timelines, and tracking for your orders.",
    alternates: {
        canonical: `${frontendURL}/shipping-policy`,
    },
};

export default function ShippingLayout({ children }) {
    return <>{children}</>;
}
