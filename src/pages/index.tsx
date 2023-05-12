import { Inter } from 'next/font/google'
import Image from 'next/image'
import ToDos from '../components/todos'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <ToDos />
    </div>
  )
}
