import { getActivity, fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const activity = await getActivity(userInfo._id);
  console.log(activity);
  return (
    <section>
      <h1 className='head-text mb-10'>Activity</h1>

      <section className=' mt-10 flex flex-col gap-5 '>
        {activity.length > 0 ? (
          <>
            {activity.map((act) => (
              <Link key={act._id} href={`/thread/${act.parentId}`}>
                <article className='activity-card'>
                  <Image
                    src={act.author.image}
                    alt='Profile Picture'
                    width={20}
                    height={20}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular text-light-1 '>
                    <span className='mr-1 text-primary-500'>
                      {act.author.name}
                    </span>{' '}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No activity yet.</p>
        )}
      </section>
    </section>
  );
}