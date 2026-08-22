export default function Page({ params }) {
  const { category } = params;

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Facts: {category}</h1>
      <p className="opacity-70 mt-4">Category page coming soon.</p>
    </div>
  );
}
