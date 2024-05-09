const DashboardLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen" id="TEST">
            {children}
        </div>
    );
}

export default DashboardLayout;