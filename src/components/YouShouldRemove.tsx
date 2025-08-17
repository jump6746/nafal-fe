import CountdownTimer from "./CountdownTimer";

const YoushouldRemove=()=>{
    return(<div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-20 blur-3xl animate-pulse"></div>
        
        <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 p-6 rounded-2xl shadow-2xl border border-purple-400/30 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
          
          <div className="text-center space-y-4">            <div className="relative">
              <span className="text-xl sm:text-4xl md:text-6xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                🚀 해커톤 종료까지 🚀
              </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-xl scale-110 animate-ping"></div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl shadow-lg border border-purple-300/50 text-white text-xl sm:text-4xl md:text-6xl">
                <CountdownTimer endDate="2025-08-24 00:00:00" /> 남음
              </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 blur-2xl scale-110 animate-pulse"></div>
            </div>
                        <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>
            <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-10 right-10 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-75" style={{animationDelay: '3s'}}></div>
      </div>)
}

export default YoushouldRemove;