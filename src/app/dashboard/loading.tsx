import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-8 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center animate-pulse">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Loading your projects...</h2>
        <p className="text-sm text-gray-500 mt-2">Fetching architectural data from the server</p>
      </div>
    </div>
  );
}