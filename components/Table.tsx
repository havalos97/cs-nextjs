import Link from 'next/link';

import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Show } from './Show';
import Spinner from './Spinner';
import React from 'react';
import { CardMedia } from '@mui/material';


type Row = Record<string, string>;

type Column = {
  name: string;
  title: string;
};

type TableProps = {
  columns: Column[];
  rows: Row[] | undefined;
}

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {
              columns.map((column) => (
                <TableCell key={column.name}>{column.title}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <Show>
            <Show.When condition={rows === undefined}>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Spinner />
                </TableCell>
              </TableRow>
            </Show.When>
            <Show.When condition={rows?.length === 0}>
              <TableRow>
                <TableCell colSpan={columns.length}>No data to display</TableCell>
              </TableRow>
            </Show.When>
            <Show.Else>
              {
                (rows ?? []).map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {
                      columns.map((column) => {
                        if (column.name === 'profileLink') {
                          return (
                            <TableCell key={row.name + '-' + column.name} className='next-link'>
                              <Link href={row.profileLink}>
                                <CardMedia
                                  component="img"
                                  sx={{ width: 64, height: 64, borderRadius: '50%' }}
                                  image={row.profilePic}
                                  alt={`${row.firstName} ${row.lastName}`}
                                />
                              </Link>
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell key={row.name + '-' + column.name}>
                            {row[column.name] ?? ''}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                ))
              }
            </Show.Else>
          </Show>
        </TableBody>
      </MUITable>
    </TableContainer>
  )
};

export default Table;
