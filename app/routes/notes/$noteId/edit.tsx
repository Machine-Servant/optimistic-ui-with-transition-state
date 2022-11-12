import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { EditNote } from '~/components/edit-note';
import { getNote } from '~/models/note.server';
import { requireUserId } from '~/session.server';

export const loader = async ({ request, params }: LoaderArgs) => {
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
};

export default function EditNoteRoute() {
  const { note } = useLoaderData<typeof loader>();

  return <EditNote note={note} />;
}
