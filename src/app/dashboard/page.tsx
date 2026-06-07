import { connectToDatabase } from "@/lib/db";
import SavedDesign from "@/models/SavedDesign";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, IndianRupee, Layers, PaintBucket } from "lucide-react";
import DeleteButton from "@/components/dashboard/DeleteButton"; // Import Client Component

// ================= THE MAGIC FIX =================
// Ye line Next.js ko force karti hai ki page ko build time par render na kare.
// Vercel build ab crash nahi hogi kyunki DB call sirf actual page visit par hogi.
export const dynamic = "force-dynamic";
// =================================================

async function getSavedProjects() {
  try {
    await connectToDatabase();
    const projects = await SavedDesign.find({}).sort({ createdAt: -1 }).lean();
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const projects = await getSavedProjects();

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Saved Projects</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Manage and review your 3D architectural renders</p>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-5 py-2.5 rounded-xl font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Studio
          </Link>
        </header>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No projects found</h3>
            <p className="text-gray-500 mt-1">You haven't saved any 3D designs yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <div key={project._id.toString()} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {project.projectName}
                    </h3>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {/* YAHAN HUMNE DELETE BUTTON ADD KIYA HAI */}
                  <DeleteButton id={project._id.toString()} />
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span>Plot Size: <strong className="text-gray-900">{project.plotSize}</strong></span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span>Floor: <strong className="text-gray-900 capitalize">{project.floorTexture.replace('_', ' ')}</strong></span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <PaintBucket className="w-4 h-4 text-gray-400" />
                    <span className="flex items-center gap-2">
                      Wall Color: 
                      <div 
                        className="w-5 h-5 rounded-md shadow-sm border border-gray-200" 
                        style={{ backgroundColor: project.wallColor }} 
                      />
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <IndianRupee className="w-4 h-4 text-gray-400" />
                    <span>Budget: <strong className="text-green-600">₹{(project.budget / 100000).toFixed(2)} Lakhs</strong></span>
                  </div>
                </div>

                {project.aiSuggestion && (
                  <div className="mt-5 pt-5 border-t border-gray-50">
                    <p className="text-xs text-indigo-900/80 leading-relaxed bg-indigo-50/50 p-3 rounded-lg border border-indigo-50">
                      <strong className="text-indigo-700 block mb-1">AI Suggestion:</strong>
                      "{project.aiSuggestion.length > 100 ? project.aiSuggestion.substring(0, 100) + "..." : project.aiSuggestion}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}