import React, { useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import weserve from "../assets/banner/weserve.png";
import bgimg from "../assets/banner/bgimg.png";

const Weserve = () => {
  useEffect(() => {
    import("https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm").then(
      (module) => {
        const KeenSlider = module.default;

        const keenSlider = new KeenSlider(
          "#keen-slider",
          {
            loop: true,
            slides: {
              origin: "auto",
              perView: 4,
              spacing: 16,
            },
            breakpoints: {
              "(min-width: 1024px)": {
                slides: {
                  perView: 4,
                  spacing: 16,
                },
              },
              "(max-width: 1024px)": {
                slides: {
                  perView: 2,
                  spacing: 8,
                },
              },
              "(max-width: 640px)": {
                slides: {
                  perView: 1,
                  spacing: 4,
                },
              },
            },
          },
          []
        );

        document
          .getElementById("keen-slider-previous")
          .addEventListener("click", () => keenSlider.prev());
        document
          .getElementById("keen-slider-next")
          .addEventListener("click", () => keenSlider.next());

        return () => keenSlider.destroy();
      }
    );
  }, []);

  return (
    <section
      className="bg-gray-50 overflow-hidden mt-16 p-4"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-full px-4 py-12 sm:px-2 lg:py-16 lg:px-8 xl:py-24">
        <div className="flex items-center justify-between space-x-4 px-4 lg:pl-7 col-span-2">
          <div className="flex items-center space-x-2 font-[700]">
            <h1 className="text-4xl font-semibold text-[#fff] transition-all duration-300 ease-in-out hover:text-[#A99067]">Who</h1>
            <h1 className="text-4xl font-semibold text-[#A99067] transition-all duration-300 ease-in-out hover:text-[#fff]">We Serve</h1>
          </div>

          <div className="flex gap-4">
            <button
              aria-label="Previous slide"
              id="keen-slider-previous"
              className="rounded-full border border-white p-3 text-white transition hover:bg-white hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              aria-label="Next slide"
              id="keen-slider-next"
              className="rounded-full border border-white p-3 text-white transition hover:bg-white hover:text-black"
            >
              <svg
                className="size-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="keen-slider mt-8"
          id="keen-slider"
          style={{
            overflow: "hidden",
          }}
        >
          {/* Slide 1 */}
          <div className="keen-slider__slide" style={{ width: "calc(25% - 16px)" }}>
            <blockquote className="flex h-full flex-col justify-between bg-[#001A3B] rounded-md p-4 shadow-sm sm:p-6 lg:p-8 transition-transform duration-300 ease-in-out hover:scale-105">
              <p className="text-[20px] font-semibold text-white">
                Real Estate Professionals
              </p>
              <p className="text-[16px] leading-relaxed text-white">
                Stay informed about regulatory updates and property notices.
              </p>
              <button className="border-[#A99067] border w-28 h-10 text-sm font-medium text-[#A99067] transition-all duration-300 ease-in-out hover:bg-[#A99067] hover:text-white">
                Read More
              </button>
            </blockquote>
          </div>

          {/* Slide 2 */}
          <div className="keen-slider__slide" style={{ width: "calc(25% - 16px)" }}>
            <blockquote className="flex h-full flex-col justify-between rounded-md bg-[#001A3B] p-4 shadow-sm sm:p-6 lg:p-8 transition-transform duration-300 ease-in-out hover:scale-105">
              <p className="text-[20px] font-semibold text-white">
                Corporate Executives and Business Leaders
              </p>
              <p className="text-[16px] leading-relaxed text-white">
                Gain quick access to the latest corporate and legal updates.
              </p>
              <button className="border-[#A99067] border w-28 h-10 text-sm font-medium text-[#A99067] transition-all duration-300 ease-in-out hover:bg-[#A99067] hover:text-white">
                Read More
              </button>
            </blockquote>
          </div>

          {/* Slide 3 */}
          <div className="keen-slider__slide" style={{ width: "calc(25% - 16px)" }}>
            <blockquote className="flex h-full flex-col justify-between rounded-md bg-[#001A3B] p-4 shadow-sm sm:p-6 lg:p-8 transition-transform duration-300 ease-in-out hover:scale-105">
              <p className="text-[20px] font-semibold text-white">
                Banks and Financial Institutes
              </p>
              <p className="text-[16px] mt-2 leading-relaxed text-white">
                Ensure that critical notices are published and compliant with
                legal standards.
              </p>
              <button className="mt-2 border-[#A99067] border w-28 h-10 text-sm font-medium text-[#A99067] transition-all duration-300 ease-in-out hover:bg-[#A99067] hover:text-white">
                Read More
              </button>
            </blockquote>
          </div>

          {/* Slide 4 */}
          <div className="keen-slider__slide" style={{ width: "calc(25% - 16px)" }}>
            <blockquote className="flex h-full flex-col justify-between rounded-md bg-[#001A3B] p-4 shadow-sm sm:p-6 lg:p-8 transition-transform duration-300 ease-in-out hover:scale-105">
              <p className="text-[20px] font-semibold text-white">
                The General Public
              </p>
              <p className="text-[16px] leading-relaxed text-white">
                Easily find public notices for real estate, corporate changes,
                or local events.
              </p>
              <button className="border-[#A99067] border w-28 h-10 text-sm font-medium text-[#A99067] transition-all duration-300 ease-in-out hover:bg-[#A99067] hover:text-white">
                Read More
              </button>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weserve;
