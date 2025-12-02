export default function Container({ children }) {
    return (
        <div className="container shadow-sm p-3 mb-5 bg-body rounded mt-4">
            {children}
        </div>
    );
}
