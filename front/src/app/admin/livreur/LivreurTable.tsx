import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton,
  Link,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Livreur from "@/models/Livreur";
import { useState } from "react";

interface LivreurTableProps {
  livreurs: Livreur[];
  setLivreurs: (livreurs: Livreur[]) => void;
  limit: number;
  setLimit: (limit: number) => void;
  handleDelete: (email: string) => void;
}

const LivreurTable = (props: LivreurTableProps) => {
  const { livreurs, setLivreurs, limit, setLimit, handleDelete } = props;

  const [search, setSearch] = useState("");

  const filteredLivreurs = livreurs.filter((livreur) => {
    return (
      livreur.localisation.includes(search) || livreur.status.includes(search)
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={1}>Livreurs</TableCell>
            <TableCell colSpan={2}>
              <TextField
                variant="outlined"
                placeholder="Rechercher un livreur"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </TableCell>
            <TableCell colSpan={1} className="flex justify-end">
              <Select
                className="mx-2"
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value as string));
                }}
              >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="50">50</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Localisation</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLivreurs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>Aucun livreur</TableCell>
            </TableRow>
          )}
          {filteredLivreurs.map((livreur, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{livreur.id}</TableCell>
                <TableCell>{livreur.localisation}</TableCell>
                <TableCell>{livreur.status}</TableCell>
                <TableCell>
                  <Link href={`/livreur/${livreur.id}`}>
                    <IconButton>
                      <EditIcon className="text-blue-500" />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => handleDelete(livreur.id)}>
                    <DeleteIcon className="text-red-600" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LivreurTable;
