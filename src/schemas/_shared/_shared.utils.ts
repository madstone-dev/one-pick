import AWS from "aws-sdk";
import { FileUpload } from "graphql-upload";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET as string,
  },
});

export const uploadToS3 = async (
  file: FileUpload,
  userId: number,
  folderName: string
) => {
  try {
    const { filename, createReadStream } = await file;
    const newFileName = encodeURI(`${userId}-${Date.now()}-${filename}`);
    const readStream = createReadStream();
    const uploadResult = await new AWS.S3()
      .upload({
        Bucket: `${process.env.AWS_BUCKET}/${folderName}`,
        Key: newFileName,
        ACL: "public-read",
        Body: readStream,
      })
      .promise();
    return {
      ok: true,
      data: uploadResult,
    };
  } catch (error) {
    return {
      error: "파일 업로드에 실패했습니다.",
    };
  }
};

export const deleteSingleFromS3 = async (Bucket: string, Key: string) => {
  try {
    const deleteResult = await new AWS.S3()
      .deleteObject({
        Bucket,
        Key,
      })
      .promise();
    return {
      ok: true,
      data: deleteResult,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "파일 삭제에 실패했습니다.",
    };
  }
};

export const validateFileExtensions = async (
  extensions: string[],
  file: FileUpload
): Promise<boolean> => {
  const { filename } = await file;
  const extension = filename.split(".").pop()?.toLowerCase();
  if (extension && extensions.indexOf(extension) >= 0) {
    return true;
  } else {
    return false;
  }
};
