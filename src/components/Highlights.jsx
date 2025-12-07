export default function Highlights() {
  return (
    <section className="max-w-7xl mx-auto p-6 text-white space-y-4">
      <h3 className="text-xl font-semibold">Latest Highlights</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#101010] border border-white/10 p-4 rounded-xl hover:bg-[#151515] transition"
          >
            <img
              src={`/h${i}.jpg`}
              className="h-40 w-full object-cover rounded-lg"
            />
            <p className="mt-3 text-gray-300">Short highlight story {i}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
