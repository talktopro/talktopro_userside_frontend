const YoutubePart = () => {
  return (
    <div className="lg:w-1/2 w-full h-80" >
      <iframe
        width="100%"
        height="100%"
        // Replace with our tutorial video id
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Tutorial"
        className="rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div >
  );
};

export default YoutubePart;