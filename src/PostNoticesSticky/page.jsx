const StickyNotice = () => {
    return (
      <a
        href="/post-notice"
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#001A3B] text-white px-4 py-2 
                   rounded-l-xl text-lg font-semibold tracking-wide rotate-180 
                   writing-vertical transition-transform hover:scale-105 hover:bg-blue-700"
        style={{ writingMode: "vertical-rl" }}
      >
        Post Your Notice
      </a>
    );
  };
  
  export default StickyNotice;