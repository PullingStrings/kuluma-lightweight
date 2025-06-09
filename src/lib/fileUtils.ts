export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'application/zip',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
  'application/json',
  'text/markdown',
];

export function readableFileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let idx = 0;
  while (bytes >= 1024 && idx < units.length - 1) {
    bytes /= 1024;
    idx++;
  }
  return `${bytes.toFixed(1)} ${units[idx]}`;
}