import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';

import RegisterModal from './components/modal/RegisterModal';
import ToasterProviders from './providers/ToasterProviders';
import LoginModal from './components/modal/LoginModal';
import getCurrentUser from './action/getCurrentUser';
import RentModal from './components/modal/RentModal';


export const metadata = {
  title: 'CariKost',
  description: 'Tempat orang-orang mencari tempat singgah',
}

const font = Nunito({
  subsets:  ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProviders/>
          <RentModal/>
          <LoginModal/>
         <RegisterModal/>
          <Navbar currentUser= {currentUser}/>
        
        </ClientOnly>
        {children}</body>
    </html>
  )
}
