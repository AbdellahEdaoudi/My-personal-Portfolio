import { Cairo } from "next/font/google";

const cairo = Cairo({ 
  subsets: ["arabic"], 
  weight: ["400", "500", "700", "900"],
  display: "swap"
});

export default async function Layout({ children, params }) {
    const { lang } = await params;
    const isRtl = lang === 'ar';

    return (
        <div lang={lang} dir={isRtl ? "rtl" : "ltr"} className={isRtl ? cairo.className : ""}>
            {children}
        </div>
    );
}
