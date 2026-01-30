import { Button } from './components/Button'
import './App.css'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
 

  return (
    <>
      <Button 
      startIcon={<PlusIcon size='lg'/>} 
      endIcon={<ShareIcon size='lg'/>}
      size="sm" 
      variant='primary' 
      text='share'/>

      <Button 
      startIcon={<PlusIcon size='md'/>} 
      endIcon={<ShareIcon size='md'/>}
      size="md" 
      variant='secondary' 
      text='share'/>

      <Button 
      startIcon={<PlusIcon size='sm'/>} 
      endIcon={<ShareIcon size='sm'/>}
      size="sm" 
      variant='secondary' 
      text='share'/>
    </>
  )
}

export default App
