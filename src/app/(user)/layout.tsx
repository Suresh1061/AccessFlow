import Navbar2 from "@/components/navbar2";

export default function AuthLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <main className={`min-h-screen bg-background`}>
               <Navbar2/>
               {children}
          </main>
     );
}
