import { Form } from '@remix-run/react';

interface EditNoteProps {
  note?: {
    id: string;
    title: string;
    body: string;
  };
}

export const EditNote: React.FC<EditNoteProps> = ({ note }) => {
  return (
    <Form>
      <div className="mb-4 flex items-center gap-4">
        <label className="text-2xl font-bold">Title</label>
        <input
          type="text"
          className="rounded-md border border-gray-300 py-2 px-4"
          name="title"
          defaultValue={note?.title}
          placeholder={note ? 'Enter title' : 'loading...'}
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="text-2xl font-bold">Body</label>
        <input
          type="text"
          className="rounded-md border border-gray-300 py-2 px-4"
          name="body"
          defaultValue={note?.body}
          placeholder={note ? 'Enter body' : 'loading...'}
        />
      </div>
      <hr className="my-4" />
      <button
        type="submit"
        className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        Save
      </button>
    </Form>
  );
};
