import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

export function TableLoading() {
  return (
    <>
      <TableBody>
        {[1, 2, 3].map((row, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
