import { Button } from '../components/Button'
import { Card } from '../components/Card'
import '../App.css'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'
import axios from 'axios'
import { BACKEND_URL, FRONTEND_URL } from '../config'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { LogOutIcon } from '../icons/Logout'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_MAP } from '../utils/typeMap'
import { EditContentModal } from '../components/EditContentModal'


export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: contents = [], isLoading } = useQuery({
    queryKey: ['contents'],
    queryFn: async () => {
      const response = await axios.post(`${BACKEND_URL}/api/v1/getContent`, {}, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      console.log("API Result:", response.data);
      console.log("API Result:", response.data.content);
      return response.data.content;
    }
  });

  const shareMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      const url = `${FRONTEND_URL}/brain/shared/${data.hash}`;
      setShareUrl(url);
      setCopied(false);
    },
    onError: () => {
      alert("Failed to generate share link.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (contentId: string) => {
      await axios.delete(`${BACKEND_URL}/api/v1/deletecontent`, {
        data: { contentId }, // Assuming backend expects contentId in the body
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
    },
    onSuccess: () => {
      // Invalidate and refetch the 'contents' query to update the UI
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
    onError: () => {
      alert("Failed to delete the item.");
    }
  });


  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${BACKEND_URL}/api/v1/logout`,
        {},
        { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
      );
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      toast.warning("Logged out successfully");
      navigate("/signin");
    },
    onError: () => {
      toast.error("Error in Logging Out...");
    }
  });

  const copyShareLink = async () => {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
      setShareUrl(null); // closes modal after copy
    }, 1500);
  };

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";


  //The Dynamic User name load logic
  let displayName = "User";
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // We cast as 'any' or your specific Interface so TS doesn't complain
      const decoded: any = jwtDecode(token);
      console.log("Decoded Token Payload:", decoded);

      // Fix: Assign the value to our outside variable
      // Ensure the key matches exactly what you saw in console.log
      displayName = decoded.name || "User";
    } catch (e) {
      console.error("Invalid Token Format", e);
    }
  }


  //for filteration of contents 
  const [filter, setFilter] = useState<string | null>(null);
  /*const filteredContents = filter
    ? contents.filter((item: any) => item.type.toLowerCase() === filter.toLowerCase())
    : contents; */

  const filteredContents = contents?.filter((item: any) => {
    if (!filter || filter === "unsorted") return true;
    const allowed = CATEGORY_MAP[filter];
    if (!allowed) return true;
    return allowed.includes(item.type);
  });


  const [editTarget, setEditTarget] = useState<any>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900">
      <Sidebar selectedType={filter} setSelectedType={setFilter} />

      {/* Main Content Area: Scrollable */}
      <div className='flex-1 ml-65 overflow-y-auto'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <EditContentModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          contentId={editTarget?._id ?? ""}
          initialTitle={editTarget?.title ?? ""}
          initialTags={editTarget?.tags ?? []}
        />

        {shareUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShareUrl(null)}
            />

            {/* Modal */}
            <div
              className={`relative w-137.5 max-w-[92vw] rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl transition-all duration-300 ${copied
                  ? "opacity-0 scale-95"
                  : "opacity-100 scale-100"
                }`}
            >
              <h2 className="text-xl font-bold text-white">
                Share Your Second Brain
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Anyone with this link can access your shared content.
              </p>

              <div className="mt-5 flex gap-3">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  onFocus={(e) => e.target.select()}
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none"
                />

                <button
                  onClick={copyShareLink}
                  className={`rounded-xl px-5 py-2 font-semibold transition-all duration-300 ${copied
                      ? "bg-green-500 text-white"
                      : "bg-[#193cb8] text-black hover:bg-blue-400"
                    }`}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <button
                onClick={() => setShareUrl(null)}
                className="absolute right-4 top-4 text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Sticky Header Section */}
        <div className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-md px-4 pt-3 pb-3 border-b border-zinc-800">
          <div className='flex justify-between items-center bg-zinc-800/50 px-4 py-2 rounded-2xl border border-zinc-700/50 shadow-xl'>

            {/* Greeting Section */}
            <div>
              <h1 className="text-2xl font-bold text-white leading-tight">
                {timeGreeting}, <span className="text-amber-300 capitalize">{displayName}</span>!
              </h1>
              <p className="text-zinc-400 mt-1 text-sm font-medium">
                You have <span className="text-zinc-200">{contents.length} items</span> saved in your second brain.
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <Button
                onClick={() => setModalOpen(true)}
                startIcon={<PlusIcon size='lg' />}
                size="sm"
                variant='primary'
                text='Add Content' />

              <Button
                onClick={() => shareMutation.mutate()}
                startIcon={<ShareIcon size='lg' />}
                size="sm"
                variant='secondary'
                text={shareMutation.isPending ? 'Sharing...' : 'Share'}
              />

              <Button
                onClick={() => logoutMutation.mutate()}
                startIcon={<LogOutIcon size='md' />}
                size="sm"
                variant='danger'
                text='Logout'
              />
            </div>
          </div>
        </div>


        {/* Cards Grid Area */}
        <div className='p-4'>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3'>
            {isLoading && (
              <div className="col-span-full py-10 text-center">
                <p className="text-zinc-500 animate-pulse">Loading your brain...</p>

                <div className="flex items-center justify-center mt-4">
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-700 border-t-zinc-400 animate-spin" />
                </div>

              </div>
            )}

            {contents.length === 0 && !isLoading && (
              <div className="col-span-full py-10 text-center">
                <p className="text-zinc-500">No content found. Start building your brain!</p>
              </div>
            )}

            {filteredContents.map((item: any, index: number) => (
              <Card
                key={item._id || index}
                type={item.type}
                link={item.link}
                title={item.title}
                tags={item.tags}
                date={new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
                //onEdit={() => alert('under dev')}
                onEdit={() => setEditTarget(item)}
                onDelete={() => {
                  if (window.confirm("Are you sure?")) {
                    deleteMutation.mutate(item._id)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
