function formatBytes(bytes: number, decimals = 2, k = 1024) {
  if (bytes === 0) return [null, ""];

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
}

export default formatBytes;
