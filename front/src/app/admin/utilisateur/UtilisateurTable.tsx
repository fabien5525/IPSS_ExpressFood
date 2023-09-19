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
import Utilisateur from "@/models/Utilisateur";
import { useState } from "react";

interface UtilisateurTableProps {
  utilisateurs: Utilisateur[];
  setUtilisateurs: (utilisateurs: Utilisateur[]) => void;
  limit: number;
  setLimit: (limit: number) => void;
  handleDelete: (email: string) => void;
}

const UtilisateurTable = (props: UtilisateurTableProps) => {
  const { utilisateurs, setUtilisateurs, limit, setLimit, handleDelete } =
    props;

  const [search, setSearch] = useState("");

  const filteredUtilisateurs = utilisateurs.filter((utilisateur) => {
    return (
      utilisateur.nom.includes(search) ||
      utilisateur.prenom.includes(search) ||
      utilisateur.email.includes(search) ||
      utilisateur.telephone.includes(search) ||
      utilisateur.adresse.includes(search)
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Utilisateurs</TableCell>
            <TableCell colSpan={3}>
              <TextField
                variant="outlined"
                placeholder="Rechercher un utilisateur"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </TableCell>
            <TableCell colSpan={2} className="flex justify-end">
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
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>e-mail</TableCell>
            <TableCell>téléphone</TableCell>
            <TableCell>adresse</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUtilisateurs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>Aucun utilisateur</TableCell>
            </TableRow>
          )}
          {filteredUtilisateurs.map((utilisateur, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{utilisateur.nom}</TableCell>
                <TableCell>{utilisateur.prenom}</TableCell>
                <TableCell>{utilisateur.email}</TableCell>
                <TableCell>{utilisateur.telephone}</TableCell>
                <TableCell>{utilisateur.adresse}</TableCell>
                <TableCell>
                  <Link href={`/utilisateur/${utilisateur.email}`}>
                    <IconButton>
                      <EditIcon className="text-blue-500" />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => handleDelete(utilisateur.email)}>
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

export default UtilisateurTable;
