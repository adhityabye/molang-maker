import Link from "next/link";

function LandingPage() {
  return (
    <div className="relative min-h-full bg-white">
      <div className="relative h-screen">
        <video
          className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
          src="/mobile_main.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <video
          className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
          src="/main_vid.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
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
        <div className="absolute top-5 right-5 transform -translate-x-1/2 flex space-x-6">
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
      <div className="h-full mx-auto">
        <div className="mx-auto flex-row justify-center pt-1">
          <div className="w-full flex justify-center">
            <img
              src="/assets/homepage/Meet-Molang.png"
              alt="Meet Molang Title"
              className="w-1/3 md:w-1/4 object-contain"
            />
          </div>
          <div className="w-full flex justify-center">
            <img
              src="/assets/homepage/Desc-Meet-Molang.png"
              alt="Meet Molang Description"
              className="w-3/4 md:w-3/4 object-contain"
            />
          </div>
          <div className="w-full flex justify-center pt-7 pb-16">
            <img
              src="/assets/homepage/Molang-Meme.png"
              alt="Molang Meme Title"
              className="w-1/3 md:w-1/4 object-contain"
            />
          </div>
          <div
            className="mx-auto flex-grow flex justify-center items-center relative w-3/4 h-[590px] p-2 rounded-lg"
            style={{
              backgroundImage: "url('/kolase.png')",
              backgroundSize: "contain", // Ensure the whole image is visible
              backgroundRepeat: "no-repeat", // Prevent repeating the image
              backgroundPosition: "center", // Center the image within the container
            }}
          >
            {/* Placeholder */}
          </div>

          <div className="relative mx-auto w-full flex-row justify-center pt-14">
            <Link href="/home" passHref>
              <img
                src="/assets/homepage/Make-Your-Own.png"
                alt="Make Your Own Molang Title"
                className="w-1/3 md:w-1/4 object-contain mx-auto relative transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-2"
                style={{ cursor: "pointer" }}
              />
            </Link>

            <div className="mx-auto flex-grow flex justify-center items-center relative w-full h-full bg-[#3E8C98] p-10 transform -translate-y-">
              {/* Placeholder */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
