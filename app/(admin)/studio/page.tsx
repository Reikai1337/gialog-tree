import { User, UserInfo } from "@entities/user";

// const fetchData = async (id: string) => {
//   try {
//     const user = await fetch(
//       `https://jsonplaceholder.typicode.com/users/${id}`,
//       {
//         cache: "force-cache",
//       },
//     ).then((response) => response.json());

//     return user;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// };

const UserPage = async (props: PageProps<"/studio">) => {
  // const { id } = await props.params;

  // const query = await props.searchParams

  // const user: User | null = await fetchData("1");

  // if (!user) return <p>not fount</p>;

  return (
    <div>
      <UserInfo />
    </div>
  );
};

export default UserPage;
