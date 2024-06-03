import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Posts",
};

export default function RootLayout({
  children,
  auth2,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth2: React.ReactNode;
  auth: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className} /* onContextMenuCapture={() => false} */ >
        <ToastContainer />
        {children}
        {/* <Link href={'/other/login'}>Login link</Link><br />
        <Link href={'/login2'}>Login link2</Link><br /> */}
        {auth2}
        {auth}
      </body>
    </html>
  );
}
