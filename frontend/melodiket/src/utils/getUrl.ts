export const getBlurDataUrl = (): string => {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/p8BAzAOZUEAMf0SZ24GauoAAAAASUVORK5CYII=';
};

export const getS3Url = (filename: string | null) => {
  if (filename === '' || filename === null) {
    return '';
  }

  const baseUrl = process.env.NEXT_PUBLIC_S3_URL;
  return `${baseUrl}/${filename}`;
};

export const getCidUrl = (filename: string) => {
  if (filename === '') {
    return '';
  }

  const baseUrl = process.env.NEXT_PUBLIC_IPFS_URL;
  return `${baseUrl}/${filename}`;
};
