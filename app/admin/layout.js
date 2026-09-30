
export const metadata = {
    title: 'Admin Dashboard',
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: '/admin',
    },
};

export default function AdminLayout({ children }) {
    return children;
}
