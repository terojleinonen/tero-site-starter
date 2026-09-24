import '@/app/globals.css'
import '@/app/styles/ai.css'
import MouseGlow from '@/components/ui/MouseGlow'
import ReadingProgress from '@/components/article/ReadingProgress'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'

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
        <SiteHeader />

        <main className="site-main">{children}</main>

        <SiteFooter />
      </body>
    </html>
  )
}
