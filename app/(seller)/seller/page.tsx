export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center py-20">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🚀</span>
        </div>
        <h2 className="text-2xl font-black text-zinc-900 mb-2">
          Welcome to your Vendor Hub!
        </h2>
        <p className="text-sm text-zinc-500 max-w-md">
          This is where you will manage your products, fulfill orders, and
          request payouts. We are building these features right now.
        </p>
      </div>
    </div>
  );
}
