import admin from "firebase-admin";
import fs from "fs";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "karhabtek-5df57",
    clientEmail:
      "firebase-adminsdk-j6i1q@karhabtek-5df57.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVN9hfIfSEeUD4\n3FHWuWAUhelcRRRYCNVviqSmeyxpAF0rGowjwQQt01Ox1xC7oQedNkiEdqgjNj6w\nnOF9np3liu6wobK2jCsTdFtuSDc3m78rnZc1ZWNfDD4xZgKfvZmaOYuR1v376/P/\nEjReGo5/3t9R9FKERPBXqUF+WXa8s96JISqAev376yNFsb7FXCGke3LJW3Bbt1S3\nZtX7iR0f/CjhxOtbfKfkV9xaIcJGLbgOR9EMGsF66Y6ygzFkxexetRRsvC2M6C5k\nBdrh5iOat1f2bsgY/k7eE7B/Z8rUuHu5q9czx9rpE/fw5PXG0veITV0eNl8ezVPT\njbsues4RAgMBAAECggEAEBHtmYE8pi+w0ZxYq/lW4Z7yXN+Lq1d4NQUHam6Ff+Fs\nJ0I6qXcWDiFeOB7jTHGxMjswYCOvQ+uJoNekaTT16EyoHBmt937s/LFhT2UznSeG\n1RmpuTRsGUZmREeqLK3spvFfmJtAyyrEIkpBnYjao+bKwja/1ELgZ3Bw/zx/Tx8d\nu8Z2YrYZTsX6Eum+iXmdpO+/Kg6/MW0xNX9WQVuZLLqFYVC2liF+JNTyQXmL+Ma/\nulaO3krtKUSgnOVp7NOCc9XZFx95iHZ+rxwNJ8XhHT9iTmFSVrweRBegnuZByGCu\no3tmN2aQAvnYY+IRGW+kkHYq76DOxq658YMTYtwSCQKBgQDRU8N3ivzPwi6juSiY\nJAUN/83HOG/hNogQ9E79hGKWIKn8QL2hiywtrhmLfkOGY3+x4jIVLeabbOJCmPUu\nYSvQjwkxsU3utR9isbnl/B/sllUHuoauiyIo1tuKSdPrO9zDhVpDEmLthJdeGE2m\n25p+S3mMQBzxLCX+Kf4sMNKopwKBgQC2fRpNSQsg6zMSxsscgLDXxrj7qMolAqQI\nsCPS7VOOdRE+18tMweAsN7othAbzL9aOgug01jtHDeQeanAYQpa5r5jYnRZyNGtR\n/FXQDX1Zy9scl8IP1NyeuujDPkA1PvZONwBXvyT3fhljA6oPm52GOANaROZ9kBZf\nl4iP3RryhwKBgBhSklDOnoeJeZ/egOAEt22j/oYaga16h57otFDy0/27t+SupRoj\nMLPyGdfCiRgRcaH6tXUOi1Ad+8BfQ4XrFos6Q4g5oOOOuiHeosodXJxB74lhXArl\n8ccrCAFuiKg5oXI6iX1nooUUtf3h9wvfUnlATdRFEtfXGGcK/BSoa6HbAoGBAKlI\nH6/1xCcDR1txoVSNZH6lT0/T4cC3VGbizjiKAuqxWhALqgFID6W1BDXYtYG9rLCC\natkoqdBd6HD2l4lJq/wQEh9OiVXjnnJtO0VGXjOAUX+Sn2iEMyvjgqwrAPDjuSQR\nDXZYT/httysMaSMVXej16NZB9/YeRULjlMCvgKHdAoGABbexJmc7+aQm9jxSvCO7\n178/IEFOpB9J+nGqxgR/5xGgvDx90rEF412iMuM86GE8aB6od6wdBaC682B1LHx7\nQ/9J212RJi/c/yaQhKmzIPL2M2jWAfFHerH64FnNHZdmQQZCk5qd7hEfREBhvvoN\nqLYnt3O1rOG/FdKdI/owyDE=\n-----END PRIVATE KEY-----\n",
  }),
  storageBucket: "karhabtek-5df57.appspot.com",
});

export const uploadFile = async (_path, originalname, type, deleteThose) => {
  try {
    const bucket = admin.storage().bucket(); // should be your bucket name
    try {
      const res = await bucket.upload(_path, {
        public: true,
        destination: type + "/" + originalname.replace(/ /g, "_") + ".pdf",
      });
      const url = res[0].publicUrl();
      fs.unlinkSync(_path);
      for (let i = 0; i < deleteThose.length; i++) {
        fs.unlinkSync(deleteThose[i]);
      }
      return url;
    } catch (error) {
      console.log(error);
    }
  } catch {
    throw new Error(`Unable to upload file, something went wrong`);
  }
};
