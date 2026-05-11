"use client";

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
    { id: "1", name: "Friday Night Alpha" },
    { id: "2", name: "Post Golf Boys" },
    { id: "3", name: "Brewery Crawl" },
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
    <main className="min-h-screen bg-[#FAFAF8] text-[#001524]">
      <div className="mx-auto w-full max-w-md pb-36">
        <div className="px-4">
          <div className="pt-4 pb-3">
            <h1 className="text-[32px] font-black italic tracking-tight text-[#001524]">
              Log a Drink
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo Upload */}
            <div className="rounded-lg border border-[#D4D0CC] bg-white p-6">
              <label htmlFor="photo-upload" className="block cursor-pointer">
                <div className="border-2 border-dashed border-[#D4D0CC] rounded-lg p-8 text-center hover:border-[#15616d] transition-colors">
                  <Upload className="h-8 w-8 text-[#8B8680] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#001524]">
                    Add Photo
                  </p>
                  <p className="text-xs text-[#8B8680] mt-1">Optional</p>
                </div>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Beer Name */}
            <div className="rounded-lg border border-[#D4D0CC] bg-white p-4">
              <label className="block text-sm font-semibold text-[#001524] mb-2">
                Beer Name
              </label>
              <input
                type="text"
                name="beerName"
                value={formData.beerName}
                onChange={handleInputChange}
                placeholder="Enter beer name"
                className="w-full rounded-lg border border-[#D4D0CC] bg-white px-4 py-3 text-sm placeholder:text-[#8B8680] focus:border-[#15616d] focus:outline-none focus:ring-2 focus:ring-[#15616d]/10"
                required
              />
            </div>

            {/* Size Selector */}
            <div className="rounded-lg border border-[#D4D0CC] bg-white p-4">
              <label className="block text-sm font-semibold text-[#001524] mb-2">
                Size
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#D4D0CC] bg-white px-4 py-3 text-sm focus:border-[#15616d] focus:outline-none focus:ring-2 focus:ring-[#15616d]/10"
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Session Selector */}
            <div className="rounded-lg border border-[#D4D0CC] bg-white p-4">
              <label className="block text-sm font-semibold text-[#001524] mb-2">
                Tab
              </label>
              <select
                name="session"
                value={formData.session}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#D4D0CC] bg-white px-4 py-3 text-sm focus:border-[#15616d] focus:outline-none focus:ring-2 focus:ring-[#15616d]/10"
                required
              >
                <option value="">Select a tab</option>
                {sessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="rounded-lg border border-[#D4D0CC] bg-white p-4">
              <label className="block text-sm font-semibold text-[#001524] mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Where did you log this?"
                className="w-full rounded-lg border border-[#D4D0CC] bg-white px-4 py-3 text-sm placeholder:text-[#8B8680] focus:border-[#15616d] focus:outline-none focus:ring-2 focus:ring-[#15616d]/10"
              />
            </div>

            {/* Notes */}
            <div className="rounded-lg border border-[#D4D0CC] bg-white p-4">
              <label className="block text-sm font-semibold text-[#001524] mb-2">
                Notes
              </label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleInputChange}
                placeholder="Add notes about this drink..."
                rows={3}
                className="w-full rounded-lg border border-[#D4D0CC] bg-white px-4 py-3 text-sm placeholder:text-[#8B8680] focus:border-[#15616d] focus:outline-none focus:ring-2 focus:ring-[#15616d]/10 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#ff7d00] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#e66f00] transition-colors"
            >
              Log Drink
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
