import { CheckSquare } from "lucide-react";

export function AuthPreview() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[310px] min-h-[570px] p-5 border-[8px] border-slate-100 rounded-[46px] bg-slate-50 shadow-2xl relative overflow-hidden">
        {/* Mock notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-100 rounded-b-xl z-20"></div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 h-[220px] rounded-[30px] p-6 text-white shadow-xl flex flex-col pt-10">
          <div className="text-xl font-bold opacity-90">Dashboard</div>
          <div className="text-3xl font-black mt-1 tracking-tight">Today</div>
          <div className="ml-auto bg-white/20 px-3 py-1 rounded-full text-xs font-bold mt-auto backdrop-blur-sm border border-white/30">
            2 Due
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-blue-100 to-blue-50 text-blue-500 flex items-center justify-center">
              <CheckSquare size={20} />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm">Drink Water</div>
              <div className="text-slate-500 text-xs mt-0.5">Every 1 day</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-purple-100 to-purple-50 text-purple-500 flex items-center justify-center">
              <CheckSquare size={20} />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm">Read Book</div>
              <div className="text-slate-500 text-xs mt-0.5">Every 1 day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
