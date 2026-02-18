
//Helper Function for the Youtube
export const getYoutubeEmbedUrl = (url: string) => {
    // This regex captures the ID from youtube.com/watch?v=ID or youtu.be/ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};


//Helper Function for the Facebook
export const getFacebookEmbedUrl = (url: string) => {
    return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=auto`;
};


//Helper Function for the Facebook
export const getLinkedInEmbedUrl = (url: string) => {
    // LinkedIn post IDs are usually digits at the end of the URL
    const match = url.match(/(?:urn:li:share:|activity:)(\d+)/) || url.match(/\/(\d+)\/?$/);
    const postId = match ? match[1] : null;
    return postId ? `https://www.linkedin.com/embed/feed/update/urn:li:share:${postId}` : "";
};

//Instagram
export const getInstagramEmbedUrl = (url: string) => {
    // Remove query params and ensure it ends with /embed/
    const baseUrl = url.split(/[?#]/)[0]; 
    const cleanUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanUrl}embed/`;
};


