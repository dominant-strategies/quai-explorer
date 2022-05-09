function Table({ headers, contents }) {
    return (
        <div>
            <div className="flex flex-col">
                <div className="border border-t px-6 py-4">
                    <h1>Blocks</h1>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table
                                size="sm"
                                className="min-w-full border shadow-lg"
                            >
                                <thead className="bg-white border-b">
                                    <tr>
                                        {headers?.map((header) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {contents?.map((content) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {content.location}
                                            </td>
                                            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                {content.number}
                                            </td>
                                            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap" />
                                            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap" />
                                            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                {content.timestamp}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
