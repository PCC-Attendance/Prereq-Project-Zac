import React from "react";
import styles from "./styles.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Page',
  description: 'Description',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head/>
      <nav>About NavBar</nav>
      <main className={styles.main}>{children}</main>
    </>
  );
}
