import React from "react";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Suspense } from "react";
//using suspense is important so that one important element can still be displayed while waiting for the next one to load
import UserPosts from "./components/UserPosts";
import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  //the getUser function to request data in generateMetadata
  //and UserPage will not become two request
  //next js will de duplicate the two requests to one
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;
  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: Params) {
  //side note: if promise, must await somewhere
  //if you don't use await key word for the two gets below, that means you are getting in the data in parallel
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  // const [user, userPosts] = await Promise.all([userData, userPostsData])
  //^ one approach to parallel loading
  // another approach to parallel loading is using <Suspense>

  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* with suspense can parallely render
            with userData and incrementally render the Post array
            loading will only be for each section and not the whole page */}

        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

//v function generates static parameters
//telling next js what possible params the userId route will be
//no default here
export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;
  // providing params in advance for SSG
  // next will know the possible params and generate pages in advance
  return users.map(user =>
    //params always need to be string to provide url in advance for  but user.id is a number
    ({ userId: user.id.toString() })
  );
}
