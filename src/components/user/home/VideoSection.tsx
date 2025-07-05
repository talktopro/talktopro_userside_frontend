interface VideoData {
  id: string
  title: string
  description: string
  embedUrl: string
};

function Tutorials() {
  const videos: VideoData[] = [
    {
      id: "1",
      title: "How to Use Our Application - Complete Guide",
      description: "Learn step-by-step how to navigate and use all features of our application effectively.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&origin=https://v0.dev",
    }, {
      id: "2",
      title: "How to Earn Money - Monetization Strategies",
      description: "Discover proven methods and strategies to generate income using our platform.",
      embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw?enablejsapi=1&origin=https://v0.dev",
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-6xl px-8 not-sm:px-4 mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl not-sm:text-xl font-bold mb-5">Learn & Earn with Our Platform</h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Master our application with these comprehensive tutorials and discover how to maximize your earning
            potential.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex-1 group bg-card rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 border border-border"
            >
              <div className="relative aspect-video bg-muted">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="absolute inset-0 w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed not-sm:text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default Tutorials;