function DashboardCard({ title, value, icon, color }) {
    return (
        <div
            className="dashboard-card"
            style={{ background: color }}
        >

            <div className="card-icon">
                <i className={icon}></i>
            </div>

            <div className="card-content">
                <p>{title}</p>
                <h2>{value}</h2>
            </div>

        </div>
    );
}

export default DashboardCard;