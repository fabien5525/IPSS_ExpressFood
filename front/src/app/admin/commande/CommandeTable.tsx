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
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommandeComplet, CommandeSimple } from "@/models/Commande";
import { useState } from "react";

interface CommandeTableProps {
  commandes: CommandeComplet[];
  limit: number;
  setLimit: (limit: number) => void;
  handleDelete: (id: number) => void;
  setEditCommande: (commande: CommandeComplet) => void;
}

const CommandeTable = (props: CommandeTableProps) => {
  const { commandes, limit, setLimit, handleDelete, setEditCommande } = props;

  const [search, setSearch] = useState("");

  const filteredCommandes = commandes.filter((commande) => {
    return commande.prix_total.toString().includes(search);
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={1}>Commandes</TableCell>
            <TableCell colSpan={1}>
              <TextField
                variant="outlined"
                placeholder="Rechercher un commande"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </TableCell>
            <TableCell colSpan={1} className="flex justify-end">
              {/* <IconButton onClick={() => setOpenAddModal(true)}>
                <AddIcon />
              </IconButton> */}

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
            <TableCell></TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCommandes.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>Aucun commande</TableCell>
            </TableRow>
          )}
          {filteredCommandes.map((commande, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{commande.id}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditCommande(commande)}>
                    <EditIcon className="text-blue-500" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(commande.id)}>
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

export default CommandeTable;
