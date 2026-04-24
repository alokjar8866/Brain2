import { Button } from '../components/Button'
import { Card } from '../components/Card'
import '../App.css'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { LogOutIcon } from '../icons/Logout'
import { jwtDecode } from 'jwt-decode'


export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

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
      const shareUrl = `http://localhost:5173/brain/${data.hash}`;
      alert(`Share this link: ${shareUrl}`);
    },
    onError: () => {
      alert("Failed to generate share link.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (contentId: string) => {
      await axios.delete(`${BACKEND_URL}/api/v1/deletecontent`, {
        data: { contentId }, // Assuming your backend expects contentId in the body
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
      localStorage.removeItem("token");
    },
    onSuccess: () => {
      // Clear the cache so the next user doesn't see old data
      queryClient.clear();

      // Redirect to login page
      window.location.href = "/signin";
    },
    onError: () => {
      alert("An error occurred during logout.");
    }
  });




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
  const filteredContents = filter
    ? contents.filter((item: any) => item.type.toLowerCase() === filter.toLowerCase())
    : contents;


  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900">
      <Sidebar selectedType={filter} setSelectedType={setFilter} />

      {/* Main Content Area: Scrollable */}
      <div className='flex-1 ml-65 overflow-y-auto'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

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
                onClick={() => {
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
