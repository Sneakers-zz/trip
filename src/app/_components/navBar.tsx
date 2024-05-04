  // eslint-disable-next-line @next/next/no-img-element
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const Navbar: React.FC = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="relative pb-16 pt-6 sm:pb-24">
      <nav
        className="relative flex items-center justify-between sm:h-10 md:justify-center"
        aria-label="Global"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
        <div className="hidden list-none md:flex md:space-x-10">
          <li>
            <a
              href="/"
              className="list-none text-base font-normal text-gray-500 hover:text-gray-900"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/search"
              className="list-none text-base font-normal text-gray-500 hover:text-gray-900"
            >
              Search
            </a>
          </li>
          <li>
            <a
              href="/weather"
              className="list-none text-base font-normal text-gray-500 hover:text-gray-900"
            >
              Weather
            </a>
          </li>
          <li>
            <a
              href="/data"
              className="list-none text-base font-normal text-gray-500 hover:text-gray-900"
            >
              data
            </a>
          </li>
        </div>
        <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
          <div className="inline-flex rounded-full shadow">
            <div className="font-base inline-flex cursor-pointer items-center rounded-full border border-transparent bg-white px-4 py-2 text-base text-gray-900 hover:bg-gray-50 ">
            </div>
            {session ? (
              <div>
                <img
                  src={session.user.image!}
                  alt="Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <span>Logged in as {session.user?.name}</span>
              </div>
            ) : (
              <span>No user is signed in</span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
