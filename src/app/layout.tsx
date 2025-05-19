import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400','600','800'] })

export const metadata = {
  title: 'ScanMesa',
  description: 'Software para la gestión de mesas de un restaurante',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className}>
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  )
}
