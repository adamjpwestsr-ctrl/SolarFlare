import IdentitySelector from "./IdentitySelector";

export const metadata = {
  hideNav: true,
  title: "Cosmic Identity Terminal"
};

export default function IdentityPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <IdentitySelector />
    </div>
  );
}
