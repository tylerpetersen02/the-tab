"use client";

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function AddDrinkPage() {
  const [formData, setFormData] = useState({
    beerName: "",
    size: "12oz",
    session: "",
    location: "",
    caption: "",
  });

  const sessions = [
    { id: 1, name: "Friday Night Alpha" },
    { id: 2, name: "Vegas Vibes 2" },
    { id: 3, name: "Weekend Kickoff" },
  ];

  const sizes = ["12oz", "16oz", "20oz", "Pint (16oz)", "Other"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Page title="Log a Drink">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Photo Upload */}
        <Card>
          <CardContent className="pt-6">
            <div className="border-2 border-dashed border-medium-gray rounded-lg p-8 text-center cursor-pointer hover:border-orange transition-colors">
              <Upload className="w-8 h-8 text-dark-gray mx-auto mb-2" />
              <p className="text-sm font-medium text-ink">Add Photo</p>
              <p className="text-xs text-dark-gray mt-1">Optional</p>
              <input type="file" accept="image/*" className="hidden" id="photo-upload" />
            </div>
          </CardContent>
        </Card>

        {/* Beer Name */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Beer Name</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              name="beerName"
              value={formData.beerName}
              onChange={handleInputChange}
              placeholder="Enter beer name"
              className="w-full px-3 py-2 border border-medium-gray rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
              required
            />
          </CardContent>
        </Card>

        {/* Size Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Size</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-medium-gray rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Session Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tab</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              name="session"
              value={formData.session}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-medium-gray rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
              required
            >
              <option value="">Select a tab</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Where did you log this?"
              className="w-full px-3 py-2 border border-medium-gray rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
            />
          </CardContent>
        </Card>

        {/* Caption */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              name="caption"
              value={formData.caption}
              onChange={handleInputChange}
              placeholder="Add notes about this drink..."
              rows={3}
              className="w-full px-3 py-2 border border-medium-gray rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 resize-none"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button className="w-full text-base py-3" type="submit">
          Log Drink
        </Button>
      </form>
    </Page>
  );
}
