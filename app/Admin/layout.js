
export const metadata = {
    title: 'Admin Dashboard',
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: '/Admin',
    },
};

export default function AdminLayout({ children }) {
    return children;
}
