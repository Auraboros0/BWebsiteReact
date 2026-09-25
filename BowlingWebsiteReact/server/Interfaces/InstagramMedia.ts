export interface InstagramMedia {
    id: string;
    username: string;
    profile_picture_url: string;
    caption?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    permalink: string;
    timestamp: string;
}