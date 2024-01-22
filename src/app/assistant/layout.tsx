export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col h-full">
      <main className="mt-8 pb-8">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">Assistant</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
