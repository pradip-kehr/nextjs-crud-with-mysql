import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { google } from "googleapis"
import fs from "fs"
import { Readable } from "stream"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function googleAuthorize() {
  const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY,
    SCOPES
  )
  await jwtClient.authorize();
  return jwtClient;
}

export const uploadToGoogleDrive = async (file: File, fileType: string) => {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  // const buffer = new Uint8Array(arrayBuffer);
  const data = Readable.from(buffer);
  const response = await drive.files.create({
    requestBody: {
      name: '1717416540200.xlsx',
      // mimeType: fileType
    },
    media: {
      body: data,
      // mimeType: fileType
    },
  });
  return response.data;
};




