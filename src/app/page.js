import Link from "next/link";

function LandingPage() {
  return (
    <div
      className="relative h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url('/main.png')` }}
    >
      {/* Button centered at the bottom */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <Link
          href="/home"
          className="bg-white text-teal-700 font-bold py-2 px-4 rounded-full border-2 border-teal-700 hover:bg-teal-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
        >
          Start Customizing
        </Link>
      </div>

      {/* PNG Assets with the X icon as a hyperlink */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-6">
        <a
          href="https://x.com/molang_onsol?t=ogCEBXtv9DMYHYIJErMZUQ&s=09"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/x.png"
            alt="X Icon"
            className="w-12 h-12 object-contain"
          />
        </a>
        <img
          src="/tele.png"
          alt="Tele Icon"
          className="w-12 h-12 object-contain"
        />
        <img
          src="/buy.png"
          alt="Buy Icon"
          className="w-12 h-12 object-contain"
        />
      </div>
    </div>
  );
}

export default LandingPage;
