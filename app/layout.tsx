import '../styles/globals.css'

type LayoutProps = {
  children: React.ReactNode
};

export default function RootLayout ({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <head>
        <title>CS Proj</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
