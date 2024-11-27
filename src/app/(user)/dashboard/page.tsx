const Dashboard = () => {
     return (
          <main className="max-w-screen-xl mx-auto mt-8 p-4 text-center">
               <h1 className=" text-2xl sm:text-3xl font-bold mb-10 ">Welcome to AccessFlow!</h1>
               <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">About AccessFlow</h2>
                    <p className="text-muted-foreground">
                         AccessFlow is a user-friendly platform for managing roles and permissions.
                         It allows admins to assign roles and customize permissions while providing users
                         a clear view of their responsibilities and access.
                    </p>
               </section>
               <section>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Getting Started</h2>
                    <p className="text-muted-foreground">
                         Visit the <a href="/status" className="text-blue-500">Status</a> page to check your role, permissions, and account details.
                         Manage your session easily with the logout option when needed.
                    </p>
               </section>
          </main>
     )
}

export default Dashboard