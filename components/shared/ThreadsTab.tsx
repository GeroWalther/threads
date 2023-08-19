'use server';

import { fetchCommunityPosts } from '@/lib/actions/community.actions';
import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  communityPage: boolean;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
  communityPage,
}: Props) => {
  let result: any;

  if (accountType === 'Community') {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  const community = {
    name: result.name,
    image: result.image,
    id: result.id,
  };

  if (!result) redirect('/');
  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'User'
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={community}
          createdAt={thread.createdAt}
          comments={thread.children}
          likesCount={thread.likesCount}
          communityPage
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
