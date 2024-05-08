import { createBrowserClient } from "@supabase/ssr";

 const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  async function DBCheck() {
    const canInitSupabaseClient = () => {
      // This function is just for the interactive tutorial.
      // Feel free to remove it once you have Supabase connected.
      try {
        createClient();
        console.log("Supabase client initialized!");
        return true;
      } catch (e) {
        return false;
      }
    };
  
    const isSupabaseConnected = canInitSupabaseClient();
  
    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
    
            {isSupabaseConnected}
          </div>
        </nav>
        </div>
  );
}
export default DBCheck;