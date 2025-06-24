import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./mediaqueries.css";
import ReduxProvider from "../redux/ReduxProvider"; // Import Redux Provider
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingWrapper from "@/components/Loader";
import UserDataStore from "@/helper/UserDataStore";
import logo from "../../public/images/logo.png"

const frontendURL = process.env.NEXT_FRONTEND_URL;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
  description:
    "Explore premium, luxury and long-lasting perfumes at HQ PERFUME. Discover elegant scents for men and women with fast delivery and exclusive offers.",
  alternates: {
    canonical: frontendURL, // ✅ Canonical URL
  },
  openGraph: {
    title: "HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description:
      "Luxury perfumes curated for your senses. Discover HQ PERFUME's elegant and lasting fragrances.",
    url: frontendURL,
    siteName: "HQ PERFUME",
    images: [
      {
        url: `${frontendURL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: "HQ PERFUME Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HQ PERFUME - Premium, Long-Lasting Luxury Perfumes",
    description:
      "Explore premium and long-lasting perfumes for men and women at HQ PERFUME.",
    images: [`${frontendURL}/images/logo.png`],
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider> {/* Wrap app in Redux Provider */}
          <UserDataStore>
            <LoadingWrapper>
              <Header />
              {children}
              <Footer />
            </LoadingWrapper>
          </UserDataStore>
        </ReduxProvider>
      </body>
    </html>
  );
}
