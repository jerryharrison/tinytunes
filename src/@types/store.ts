export interface YouTubeItem {
  id: number;
  name: string;
  yt_id: string;
  is_dir: boolean;
}

export interface UserPreferences {
  height: number;
  width: number;
}

export interface HydrateReturn {
  items: YouTubeItem[];
  preferences: UserPreferences;
}
