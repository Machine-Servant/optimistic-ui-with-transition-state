import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { Note } from '~/components/note';

import { deleteNote, getNote } from '~/models/note.server';
import { requireUserId } from '~/session.server';

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.noteId, 'noteId not found');

  const note = await getNote({ userId, id: params.noteId });
  if (!note) {
    throw new Response('Not Found', { status: 404 });
  }

  const slowDown = new Promise<typeof note>((resolve) =>
    setTimeout(() => resolve(note), 2000)
  );

  return json({ note: await slowDown });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.noteId, 'noteId not found');

  await deleteNote({ userId, id: params.noteId });

  return redirect('/notes');
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return <Note data={data} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
