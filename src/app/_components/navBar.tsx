
const Navbar: React.FC = () => {
  return (
    <div className="relative pt-6 pb-16 sm:pb-24">
        <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
    

            <div className="hidden md:flex md:space-x-10 list-none">
                <li>
                    <a href="/" className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        >Home</a>
                </li>
                <li>
                    <a href="/search" className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        >Search
                    </a>
                </li>
                <li>
                    <a href="/weather" className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        >Weather
                    </a>
                </li>
                <li>
                    <a href="/data" className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        >data
                    </a>
                </li>
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <div className="inline-flex rounded-full shadow">
                    <div 
                        className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">
                        Sign in
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}
export default Navbar;
