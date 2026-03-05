// Avatars are stored in localStorage to avoid bloating JWT cookies.
// Key: ff_avatar_<userId>
// Falls back to the OAuth avatar_url from user metadata (e.g. Google photo).

const KEY = (userId: string) => `ff_avatar_${userId}`;

export function getLocalAvatar(userId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY(userId));
}

export function setLocalAvatar(userId: string, dataUrl: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY(userId), dataUrl);
}

/** Returns the best available avatar: local custom → OAuth photo → null */
export function resolveAvatar(userId: string, oauthAvatarUrl?: string | null): string | null {
  return getLocalAvatar(userId) ?? oauthAvatarUrl ?? null;
}
