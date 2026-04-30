import { promises as fs } from "fs";
import path from "path";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRSVPs() {
  let rsvps: any[] = [];

  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "rsvps.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    rsvps = JSON.parse(fileData);
  } catch {
    // If it fails to read from cwd, try /tmp fallback
    try {
      const fallbackPath = path.join("/tmp", "wedding-data", "rsvps.json");
      const fileData = await fs.readFile(fallbackPath, "utf-8");
      rsvps = JSON.parse(fileData);
    } catch {
      rsvps = [];
    }
  }

  // Sort by newest first
  rsvps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalRSVPs = rsvps.length;
  const attending = rsvps.filter((r) => r.attendance === "yes");
  const totalGuests = attending.reduce((acc, r) => acc + (r.guestsCount || 1), 0);
  const notAttending = rsvps.filter((r) => r.attendance === "no").length;
  const maybeAttending = rsvps.filter((r) => r.attendance === "maybe").length;

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-stone-900 mb-8 text-center">RSVP Dashboard</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Responses" value={totalRSVPs} />
          <StatCard title="Total Guests Coming" value={totalGuests} highlight />
          <StatCard title="Not Attending" value={notAttending} />
          <StatCard title="Maybe" value={maybeAttending} />
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100/50 border-b border-stone-200 text-stone-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-center">Guests</th>
                  <th className="p-4 font-medium">Dietary / Notes</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-stone-500">
                      No RSVPs received yet.
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4 font-medium text-stone-900">{rsvp.name}</td>
                      <td className="p-4 text-stone-600 text-sm">
                        <div>{rsvp.phone}</div>
                        <div className="text-stone-400">{rsvp.email || "-"}</div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={rsvp.attendance} />
                      </td>
                      <td className="p-4 text-center font-medium text-stone-700">
                        {rsvp.attendance === "yes" ? rsvp.guestsCount || 1 : "-"}
                      </td>
                      <td className="p-4 text-sm text-stone-600 max-w-xs">
                        {rsvp.dietary && (
                          <div className="mb-1"><span className="font-semibold">Diet:</span> {rsvp.dietary}</div>
                        )}
                        {rsvp.song && (
                          <div className="italic text-stone-500">"{rsvp.song}"</div>
                        )}
                      </td>
                      <td className="p-4 text-xs text-stone-400">
                        {new Date(rsvp.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, highlight = false }: { title: string; value: number; highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? "bg-primary/5 border-primary/20" : "bg-white border-stone-200"} shadow-sm flex flex-col items-center text-center`}>
      <span className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-2">{title}</span>
      <span className={`text-4xl font-serif ${highlight ? "text-primary" : "text-stone-800"}`}>{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "yes") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Coming
      </span>
    );
  }
  if (status === "no") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Not Coming
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
      <HelpCircle className="w-3 h-3 mr-1" />
      Maybe
    </span>
  );
}
