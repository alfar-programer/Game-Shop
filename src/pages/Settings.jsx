import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">System Settings</h1>
      
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold text-primary mb-6">General Preferences</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Platform Name</label>
              <input 
                type="text" 
                defaultValue="NexusPay Gaming"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@nexuspay.com"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
              />
            </div>
          </div>

          <div className="border-t border-border/50 pt-6">
            <h3 className="text-white font-medium mb-4">Security</h3>
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Require 2FA for all admin accounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <div className="border-t border-border/50 pt-6 flex justify-end">
             <button className="bg-primary text-black font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-all neon-box-primary flex items-center">
               <Save className="w-4 h-4 mr-2" />
               Save Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
