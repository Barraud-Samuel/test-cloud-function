const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage();

//const fs = require('fs-extra');
require('os').tmpdir();
const path = require('path');

const sharp = require('sharp');

exports.resizeAvatar = functions.storage.object().onFinalize(async object => {
  const bucket = gcs.bucket(object.bucket);
  const filePath = object.name;
  const fileName = filepath.split('/').pop();
  const tmpFilePath = join(tmpdir(), object.name);

  const avatarFileName = 'avatar_' + fileName;
  const tmpAvatarPath = join(tmpdir(),avatarFileName);

  if (fileName.includes('avatar_')) {
    console.log('exiting function');
    return false;    
  }

  await bucket.file(filePath).download({
    destination: tmpFilePath
  });

  await sharp(tmpFilePath).resize(100,100).toFile(tmpAvatarPath);

  return bucket.upload(tmpAvatarPath,{
    destination: join(dirname(filePath),avatarFileName)
  });
});