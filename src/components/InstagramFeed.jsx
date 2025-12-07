export default function InstagramFeed() {
  return (
    <section className="max-w-7xl mx-auto p-6 text-white">
      <h3 className="text-xl font-semibold mb-4">Instagram Feed</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition"
          >
            <img src={`/insta${i}.jpg`} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
