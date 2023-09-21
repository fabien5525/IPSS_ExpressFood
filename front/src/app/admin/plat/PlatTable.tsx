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
import AddIcon from "@mui/icons-material/Add";
import Plat from "@/models/Plat";
import { useState } from "react";

interface LivreurTableProps {
  plats: Plat[];
  limit: number;
  setLimit: (limit: number) => void;
  handleDelete: (id: number) => void;
  setOpenAddModal: (open: boolean) => void;
  setEditPlat: (plat: Plat | undefined) => void;
}

const PlatTable = (props: LivreurTableProps) => {
  const { plats, limit, setLimit, handleDelete, setOpenAddModal, setEditPlat } =
    props;

  const [search, setSearch] = useState("");

  const filteredLivreurs = plats.filter((plat) => {
    return (
      plat.nom.toLowerCase().includes(search.toLowerCase()) ||
      plat.prix.toString().includes(search.toLowerCase()) ||
      plat.ingredients.toString().includes(search.toLowerCase())
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={1}>Plats</TableCell>
            <TableCell colSpan={4}>
              <TextField
                variant="outlined"
                placeholder="Rechercher un plat"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </TableCell>
            <TableCell colSpan={1} className="flex justify-end">
              <IconButton onClick={() => setOpenAddModal(true)}>
                <AddIcon />
              </IconButton>
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
            <TableCell>Nom</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Dessert</TableCell>
            <TableCell>Plat du jour</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLivreurs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>Aucun plat</TableCell>
            </TableRow>
          )}
          {filteredLivreurs.map((plat, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{plat.id}</TableCell>
                <TableCell>{plat.nom}</TableCell>
                <TableCell>{plat.prix}</TableCell>
                <TableCell>{plat.dessert ? "Oui" : "Non"}</TableCell>
                <TableCell>{plat.dujour ? "Oui" : "Non"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditPlat(plat)}>
                    <EditIcon className="text-blue-500" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(plat.id)}>
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

export default PlatTable;
