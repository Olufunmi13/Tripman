export function getAvatarInitials(username: string): string {
    return username.charAt(0).toUpperCase();
  }
  
  export function getAvatarColor(username: string): string {
    const hash = Math.abs(username.charCodeAt(0));
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }