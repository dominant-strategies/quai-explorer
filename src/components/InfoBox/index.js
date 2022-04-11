function InfoBox({ Icon, title, className, value }) {
    return (
        <div className="flex items-center justify-center md:justify-start border border-gray-500 p-2">
            <Icon className={`${className} h-28 w-28`} />
            <div className="ml-3">
                <h1 className="text-base">{title}</h1>
                <p className={`${className} text-4xl`}>{value}</p>
            </div>
        </div>
    )
}

export default InfoBox
