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


  return (
    <div>

      <Sidebar />

      <div className='p-4 ml-72 min-h-screen bg-gray-500'>

        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />


        <div className='flex justify-between items-center mb-8 bg-gray-600/30 px-4 py-2 rounded-xl border border-gray-400'>

          {/* Greeting Section */}
          <div>
            <h1 className="text-4xl font-extrabold text-white mt-1">
              {timeGreeting}, <span className="text-amber-300 capitalize">{displayName}</span>!
            </h1>
            <p className="text-gray-300 mt-2 text-sm font-medium">
              You have {contents.length} items saved in your second brain.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4'>
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

        <div className='flex gap-5 flex-wrap'>
          {isLoading && <p className="text-white">Loading your brain...</p>}

          {
            contents.length === 0 && !isLoading && <p className="text-white">No content found. Add some!</p>
          }

          {
            contents.map((item: any, index: number) => <Card
              key={index || item._id}
              type={item.type}
              link={item.link}
              title={item.title}
              onClick={() => {
                if (window.confirm("Are you sure???")) {
                  deleteMutation.mutate(item._id)
                }
              }}
            />)
          }
        </div>
      </div>
    </div>
  )
}
