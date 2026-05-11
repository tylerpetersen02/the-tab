import { Page } from "@/components/layout/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  return (
    <Page title="Profile">
      <div className="space-y-6">
        <Card>
          <div>
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">
              TP
            </div>
            <h2 className="text-xl font-bold">Tyler Petersen</h2>
            <p className="text-sm opacity-60">tyler@example.com</p>
          </div>
        </Card>

        <div>
          <h3 className="font-semibold mb-3">Stats</h3>
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">47.5</p>
                <p className="text-xs opacity-60">Pint Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">76</p>
                <p className="text-xs opacity-60">Beers Logged</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs opacity-60">Tabs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">6</p>
                <p className="text-xs opacity-60">Buddies</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Button variant="secondary" className="w-full" disabled>
            ⚙️ Settings (Coming Soon)
          </Button>
          <Button variant="ghost" className="w-full" disabled>
            🚪 Logout (Coming Soon)
          </Button>
        </div>
      </div>
    </Page>
  );
}
