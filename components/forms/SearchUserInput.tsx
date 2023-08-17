'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { CommentValidation } from '@/lib/validations/thread';

interface Props {
  onSubm: (a: string) => void;
}
export default function SearchUserInput({ onSubm }: Props) {
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  });

  function onSubmit(values: z.infer<typeof CommentValidation>) {
    onSubm(values.thread);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  placeholder='Search a user...'
                  className='no-focus  outline-none text-light-1'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>
          Search
        </Button>
      </form>
    </Form>
  );
}
