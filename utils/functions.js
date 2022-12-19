import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  storage,
} from "./firebase.js";

export const uploadFile = async (file, res, webappLink, title) => {
  const metadata = {
    contentType: file.mimetype,
  };
  const file_name =
    file.originalname.split(".")[0] +
    "-" +
    Date.now() +
    "." +
    file.originalname.split(".")[file.originalname.split(".").length - 1];
  const storageRef = ref(storage, `${webappLink}/${title}/` + file_name);
  const uploadTask = uploadBytesResumable(storageRef, file.buffer, metadata);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(storageRef).then((url) => {
        res.send(url);
      });
    }
  );
};
