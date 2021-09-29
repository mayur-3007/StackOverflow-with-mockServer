import Link from '@mui/material/Link';

export const columns = [
  {
    field: 'author',
    headerName: 'Author',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
  {
    field: 'title',
    headerName: 'Title',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
  {
    field: 'question_link',
    headerName: 'Question Link',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    renderCell: (params) => (
      <Link href={params.value}>Link for the StackOverflow</Link>
    ),
  },
  {
    field: 'creation_date',
    headerName: 'Creation date',
    flex: 1,
    headerClassName: 'super-app-theme--header',
  },
];
