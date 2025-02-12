const StickyNotice = () => {
    return (
      <a
        href="/post-notices"
        className="fixed z-40 right-0 top-1/2 -translate-y-1/2 bg-[#001A3B] text-[#A99067] px-3 py-3 
                   text-lg font-semibold tracking-wide rotate-180 
                   writing-vertical transition-transform hover:scale-105 hover:bg-[#00172E]"
        style={{
          writingMode: "vertical-rl",
          borderTopLeftRadius: "9px", 
          borderBottomLeftRadius: "9px", 
        }}
      >
        Post Notice Now
      </a>
    );
  };
  
  export default StickyNotice;
