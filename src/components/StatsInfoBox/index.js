export function StatsInfoBox({ Icon, title, value, className }) {
    return (
        <div className="flex justify-between px-4 py-2 border border-gray-500 items-center">
            <div className="flex items-center">
                <Icon className={`${className} h-8 w-8 mr-3`} />
                <h1>{title}</h1>
            </div>
            <p className={`${className} text-base`}>{value}</p>
        </div>
    )
}
