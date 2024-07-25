import React from "react";

export default async function getUserPosts(userId: string) {
  //fetch caches data by default in nextjs
  //v
  // const res = await fetch (`https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  // , {cache: 'force-cache'})
  //^ this is default if fetch written without {cache: ...},
  //this is what it does
  //v revalidates data every 60 secs and fetch it
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("failed to fetch User");

  return res.json();
}
