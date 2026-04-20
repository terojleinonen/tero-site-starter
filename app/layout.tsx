import '@/app/globals.css'
import MouseGlow from '@/components/ui/MouseGlow'
import ReadingProgress from '@/components/article/ReadingProgress'

export const metadata = {
  title: 'Tero Leinonen',
  description: 'Engineering ideas into systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <body>
        <MouseGlow />
        <ReadingProgress />
        <div className="site-bg" />
        <header className="nav">
          <div className="nav-inner">
            <div className="logo">TERO</div>
            <nav>
              <a href="/">Home</a>
              <a href="/blog">Blog</a>
              <a href="/notes">Notes</a>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>
      </body>
    </html>
  )
}