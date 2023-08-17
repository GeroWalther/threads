'use client';
import UserCard from '@/components/cards/UserCard';
import SearchUserInput from '@/components/forms/SearchUserInput';
import { useState } from 'react';
interface User {
  _id: string;
  id: string;
  __v: number;
  bio: string;
  communities: any[];
  image: string;
  name: string;
  onboarded: boolean;
  threads: any[];
  username: string;
}
interface Props {
  result: {
    users: User[];
    isNext: boolean;
  };
}

export default function SearchComp({ result }: Props) {
  const [searchedUsers, setSearchedUsers] = useState<User[]>(result.users);

  function onSubmitHandler(searchString: string) {
    const filteredUsers = searchedUsers.filter((user: User) => {
      const nameMatch = user.name.includes(searchString);
      const usernameMatch = user.username.includes(searchString);
      return nameMatch || usernameMatch;
    });

    setSearchedUsers(filteredUsers);
  }

  return (
    <>
      <SearchUserInput onSubm={onSubmitHandler} />

      <div className='mt-14 flex flex-col gap-9'>
        {searchedUsers.length === 0 ? (
          <p className='no-result'>No users found</p>
        ) : (
          <>
            {searchedUsers.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
