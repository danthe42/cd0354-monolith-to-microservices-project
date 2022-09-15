import AWS = require('aws-sdk');
import {config} from './config/config';

// Configure AWS
const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: {Bucket: config.aws_media_bucket},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds: number = 60 * 5;
  const url2ret: string = s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  console.debug("getGetSignedUrl() Bucket: " + config.aws_media_bucket + " Key: " + key + " Retval: " + url2ret);
  return url2ret;
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds: number = 60 * 5;

  const url2ret: string = s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  console.debug("getPutSignedUrl() Profile: " + config.aws_profile + " Region: " + config.aws_region + " Bucket: " + config.aws_media_bucket + " Key: " + key + " Retval: " + url2ret);
  return url2ret;
}
