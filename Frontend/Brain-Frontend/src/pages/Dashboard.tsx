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
      const shareUrl = `http://localhost:5173/share/${data.hash}`;
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



  return (
    <div>

      <Sidebar />

      <div className='p-4 ml-72 min-h-screen bg-gray-500'>

        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />

        <div className='flex justify-end gap-4 mb-2'>
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
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
        </div>

        <div className='flex gap-4 flex-wrap'>
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
              onClick={()=>{
                if(window.confirm("Are you sure???")){
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
