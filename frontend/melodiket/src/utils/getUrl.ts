export const getBlurDataUrl = (): string => {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/p8BAzAOZUEAMf0SZ24GauoAAAAASUVORK5CYII=';
};

export const getS3Url = (filename: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_S3_URL;
  return `${baseUrl}/${filename}`;
};

export const getCidUrl = (filename: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_CID_URL;
  return `${baseUrl}/${filename}`;
};
