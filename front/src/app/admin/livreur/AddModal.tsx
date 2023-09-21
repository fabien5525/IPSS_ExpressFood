import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import Livreur from "@/models/Livreur";
import { utilisateurSimple } from "@/models/Utilisateur";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

interface AddModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  fetchLivreurs: () => void;
  userThatCanBeLivreur: utilisateurSimple[];
}

const AddModal = (props: AddModalProps) => {
  const { open, setOpen, fetchLivreurs, userThatCanBeLivreur } = props;
  const { getToken } = useAuth();
  const [livreur, setLivreur] = useState<Livreur>({
    id: 0,
    localisation: "",
    status: "",
    user: 0,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();

    if (!token || livreur.user === 0) {
      return;
    }

    const payload = getPayload(token);
    console.log(payload);

    const response = await fetch(`/api/deliveryman`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(livreur),
    });

    if (response.ok) {
      setOpen(false);
      fetchLivreurs();
    } else {
      console.log(response);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter un livreur
          </Typography>
          <TextField
            label="Localisation"
            variant="outlined"
            value={livreur.localisation}
            onChange={(e) =>
              setLivreur({ ...livreur, localisation: e.target.value })
            }
          />
          <TextField
            label="Status"
            variant="outlined"
            value={livreur.status}
            onChange={(e) => setLivreur({ ...livreur, status: e.target.value })}
          />
          <div>
            <Select
              onChange={(e) =>
                setLivreur({
                  ...livreur,
                  user: parseInt(e.target.value as string),
                })
              }
            >
              <MenuItem value={0}></MenuItem>
              {userThatCanBeLivreur.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.id}>
                    {`${user.nom} ${user.prenom} - ${user.mail}`}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <button
            className="bg-green-500 text-white rounded-lg p-2 mt-4"
            type="submit"
          >
            Ajouter
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
