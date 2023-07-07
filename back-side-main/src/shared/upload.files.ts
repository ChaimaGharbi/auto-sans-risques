import { BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as util from 'util';
import * as fs from 'fs';
import * as temp from 'temp';
import * as path from 'path';
import * as md5 from 'md5';
import * as imagemin from 'gulp-imagemin';
import * as gulp from 'gulp';

import * as imageminJpegtran from 'imagemin-jpegtran';
const imageminPngquant = require('imagemin-pngquant');

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const imagesFileFilter = (req, files, callback) => {
  for (const file of files) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)$/)) {
      return callback(new BadRequestException('Only image files are allowed!'), false);
    }
  }
  callback(null, true);
};

export const niemandsUploadImage = async (file, filename, ext) => {
  const name = md5(filename);
  const bucket = admin.storage().bucket();
  const remote = bucket.file(`report-images/${name}.${ext}`);

  try {
    await remote.save(file);
    await remote.makePublic();
    
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/report-images%2F${name}.${ext}?alt=media`;
    // const url = res[0].publicUrl();
    return url;
  } catch (error) {
    
  }
};

// TOD0 : this function does not return anything (wrong implementation)
export const uploadImage = file => {
  new Promise(async (resolve, reject) => {
    const bucket = admin.storage().bucket(); // should be your bucket name
    const { originalname, buffer } = file;
    const originalname_date = Date.now() + originalname.replace('+', '_');
    let data;
    temp.track();
    if (file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)$/)) {
      
      await temp.mkdir('images', async function (err, dirPath) {
        const imaginpath = path.join(dirPath, originalname);
        await fs.writeFile(dirPath + '/' + originalname, buffer, err => {
          if (err) throw err;
        });

        await new Promise((resolve, reject) => {
          gulp
            .src(`${imaginpath}`, { allowEmpty: true })
            .pipe(
              imagemin([
                imageminJpegtran(),
                imageminPngquant({
                  quality: [0.4, 0.6]
                })
              ])
            )
            .pipe(gulp.dest(`${dirPath + '/resized/'}`))
            .on('end', resolve);
        });

        data = fs.readFileSync(`${dirPath + '/resized/'}` + originalname);
        const blob = bucket.file(originalname_date.replace(/ /g, '_'));
        const blobStream = blob.createWriteStream({
          resumable: false
        });
        blobStream
          .on('finish', () => {
            const publicUrl = util.format(
              `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`
            );
            resolve(publicUrl);
          })
          .on('error', err => {
            

            reject(`Unable to upload image, something went wrong`);
          })
          .end(data);
      });
    } else {
      data = buffer;
    }
    const blob = bucket.file(originalname_date.replace(/ /g, '_'));
    const blobStream = blob.createWriteStream({
      resumable: false
    });
    blobStream
      .on('finish', () => {
        const publicUrl = util.format(
          `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`
        );
        resolve(publicUrl);
      })
      .on('error', err => {
        

        reject(`Unable to upload image, something went wrong`);
      })
      .end(data);
  });
};
