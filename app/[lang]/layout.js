import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "500", "700", "900"] });

export default async function Layout({ children, params }) {
    const { lang } = await params;
    const isAr = lang === 'ar';

    return (
        <div dir={isAr ? "rtl" : "ltr"} className={isAr ? cairo.className : ''}>
            {children}
        </div>
    );
}
