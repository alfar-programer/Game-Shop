import { useState } from 'react';

const FAKE_ORDERS = [
  { id: 'ORD-INT-9921', user: 'Mazen', item: '1000 VP points', amount: '$9.99', status: 'Completed', date: '2026-05-14' },
  { id: 'ORD-INT-9922', user: 'John Doe', item: 'Battle Pass', amount: '$14.99', status: 'Pending', date: '2026-05-14' },
  { id: 'ORD-INT-9923', user: 'Jane Smith', item: '500 VP points', amount: '$4.99', status: 'Completed', date: '2026-05-13' },
  { id: 'ORD-INT-9924', user: 'Admin', item: 'Premium Game time', amount: '$29.99', status: 'Failed', date: '2026-05-13' }
];

export default function Orders() {
  const [orders] = useState(FAKE_ORDERS);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Recent Orders</h1>
      
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-background/50 border-b border-border text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Item</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-primary">{order.id}</td>
                  <td className="px-6 py-4 text-white">{order.user}</td>
                  <td className="px-6 py-4">{order.item}</td>
                  <td className="px-6 py-4 text-white font-medium">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs box-shadow ${
                      order.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
