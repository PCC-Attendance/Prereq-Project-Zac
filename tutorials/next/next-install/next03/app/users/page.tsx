import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users",
};
//need to add async for await to work
export default async function UserPage() {
  //fetching from an array of data type User from getAllUsers()
  const usersData: Promise<User[]> = getAllUsers();
  //awaiting data because fetched
  const users = await usersData;

  console.log("Hello");

  const content = (
    <section>
      <h2>
        <Link href="/">Back to Home</Link>
      </h2>
      <br />
      {users.map((user) => {
        return (
          <>
            <p key={user.id}>
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </p>
            <br />
          </>
        );
      })}
    </section>
  );

  return content;
}
