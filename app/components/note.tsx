import { Form, Link } from '@remix-run/react';

interface NoteProps {
  data?: {
    note: {
      id: string;
      title: string;
      body: string;
    };
  };
}

export const Note: React.FC<NoteProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold">
        {data ? (
          <>{data?.note.title}</>
        ) : (
          <span className="text-gray-500">Note</span>
        )}
      </h3>
      <p className="py-6">
        {data ? (
          <>{data?.note.body}</>
        ) : (
          <span className="text-gray-500">Loading...</span>
        )}
      </p>
      <hr className="my-4" />
      <div className="flex items-center gap-4">
        <Link
          className="rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:bg-green-400"
          to={`/notes/${data?.note.id}/edit`}
          state={{ page: 'edit-note' }}
        >
          Edit
        </Link>
        <Form method="post">
          <button
            type="submit"
            className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            disabled={!data}
          >
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
};
