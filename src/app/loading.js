export default function loading() {
    return(
        <main className="bg-slate-900 min-h-screen p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="h-10 w-100 bg-slate-800 rounded-lg animated-pulse mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div 
                                key={index}
                                className="bg-slate-800 rounded-xl h-90 animate-pulse p-4 flex flex-col justify-between"
                            >
                                <div className="w-full h-64 bg-slate-700 rounded-lg" />
                                <div className="space-y-2 mt-3">
                                    <div className="h-4 bg-slate-700 rounded w-3/4" />
                                    <div className="h-3 bg-slate-700 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}