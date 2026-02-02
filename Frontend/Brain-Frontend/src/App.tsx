import { Button } from './components/Button'
import { Card } from './components/Card'
import './App.css'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { CreateContentModal } from './components/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from './components/Sidebar'

function App() {

  const [modalOpen, setModalOpen] = useState(true);
  return (
   <div>

  <Sidebar/>

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
          startIcon={<ShareIcon size='lg' />}
          size="sm"
          variant='secondary'
          text='Share' />
      </div>

      <div className='flex gap-4'>
        <Card type="youtube" link="" />
        <Card type="youtube" link="" />
        <Card type="youtube" link="" />
      </div>
    </div>
 </div>
  )
}

export default App
