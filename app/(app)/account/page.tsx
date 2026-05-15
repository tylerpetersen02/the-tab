"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Edit2, Check, X } from "lucide-react";
import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { PageSection } from "@/components/common/PageSection";
import { CardShell } from "@/components/common/CardShell";
import { AppButton } from "@/components/common/AppButton";
import { AppText } from "@/components/common/AppText";
import { UserAvatar } from "@/components/common/UserAvatar";
import { inputStyles } from "@/lib/inputStyles";
import { useAuth } from "@/components/auth/useAuth";
import { AvatarUpload } from "@/components/common/AvatarUpload";

export default function AccountPage() {
  const router = useRouter();
  const { user, signOut, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    display_name: user?.display_name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    home_city: user?.home_city || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError(null);
    setIsSaving(true);

    const result = await updateProfile(formData);

    if (result.error) {
      setError(result.error);
      setIsSaving(false);
    } else {
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      display_name: user?.display_name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      home_city: user?.home_city || "",
    });
    setIsEditing(false);
    setError(null);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <AppPage>
        <AppHeader title="Account" />
        <PageSection>
          <div className="flex justify-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-medium-gray border-t-teal"></div>
          </div>
        </PageSection>
      </AppPage>
    );
  }

  if (!user) {
    return (
      <AppPage>
        <AppHeader title="Account" />
        <PageSection>
          <CardShell>
            <AppText variant="body" className="text-center text-dark-gray">
              Not logged in. Redirecting...
            </AppText>
          </CardShell>
        </PageSection>
      </AppPage>
    );
  }

  return (
    <AppPage>
      <AppHeader title="Account" subtitle="Manage your profile" />

      <PageSection>
        <CardShell>
          <div className="space-y-6">
            {/* Avatar & Name */}
            <div className="flex items-center gap-4">
              <UserAvatar
                initials={user.initials || "?"}
                size="lg"
                avatarUrl={user.avatar_url}
              />
              <div className="flex-1">
                <AppText variant="cardTitle">{user.display_name}</AppText>
                <AppText variant="meta" className="text-dark-gray">
                  @{user.username}
                </AppText>
                <AppText variant="meta" className="text-teal mt-1">
                  {user.email}
                </AppText>
              </div>
            </div>

            {/* Edit/Save Button */}
            <div>
              {!isEditing ? (
                <AppButton
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </AppButton>
              ) : (
                <div className="flex gap-2">
                  <AppButton
                    size="md"
                    fullWidth
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <Check className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save"}
                  </AppButton>
                  <AppButton
                    variant="outline"
                    size="md"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4" />
                  </AppButton>
                </div>
              )}
            </div>
          </div>
        </CardShell>
      </PageSection>

      {/* Profile Fields */}
      {isEditing && (
        <PageSection>
          <div className="space-y-4">
            <div>
              <AppText variant="meta" className="text-ink mb-3 block">
                Profile Photo
              </AppText>
              <AvatarUpload
                userId={user.id}
                currentAvatarUrl={user.avatar_url}
                onUploadComplete={(avatarUrl) => {
                  // Update user state with new avatar
                  // This will be reflected through the next profile fetch
                }}
              />
            </div>
            <div>
              <AppText variant="meta" className="text-ink">Display Name</AppText>
              <input
                type="text"
                name="display_name"
                value={formData.display_name}
                onChange={handleInputChange}
                className={inputStyles}
                placeholder="Your full name"
              />
            </div>

            <div>
              <AppText variant="meta" className="text-ink">Username</AppText>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={inputStyles}
                placeholder="@username"
              />
            </div>

            <div>
              <AppText variant="meta" className="text-ink">Bio</AppText>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className={inputStyles}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            <div>
              <AppText variant="meta" className="text-ink">Home City</AppText>
              <input
                type="text"
                name="home_city"
                value={formData.home_city}
                onChange={handleInputChange}
                className={inputStyles}
                placeholder="San Diego, CA"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3">
                <AppText variant="bodySmall" className="text-red-700">
                  {error}
                </AppText>
              </div>
            )}
          </div>
        </PageSection>
      )}

      {/* Account Info */}
      {!isEditing && (
        <PageSection>
          <CardShell>
            <div className="space-y-4">
              {user.bio && (
                <div>
                  <AppText variant="meta" className="text-dark-gray">
                    Bio
                  </AppText>
                  <AppText variant="body" className="mt-1">
                    {user.bio}
                  </AppText>
                </div>
              )}

              {user.home_city && (
                <div>
                  <AppText variant="meta" className="text-dark-gray">
                    Home City
                  </AppText>
                  <AppText variant="body" className="mt-1">
                    {user.home_city}
                  </AppText>
                </div>
              )}

              <div className="border-t border-light-gray pt-4">
                <AppText variant="meta" className="text-dark-gray">
                  Account Status
                </AppText>
                <AppText variant="body" className="mt-1">
                  {user.is_private ? "Private" : "Public"}
                </AppText>
              </div>
            </div>
          </CardShell>
        </PageSection>
      )}

      {/* Danger Zone */}
      <PageSection className="border-t border-light-gray pt-4">
        <AppButton
          variant="outline"
          size="md"
          fullWidth
          onClick={handleSignOut}
          className="border-orange-200 text-orange-600 hover:bg-orange-50"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </AppButton>
      </PageSection>
    </AppPage>
  );
}
