import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import Livreur from "@/models/Livreur";
import { utilisateurSimple } from "@/models/Utilisateur";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

interface EditModalProps {
  livreur: Livreur | undefined;
  setLivreur: (v: Livreur | undefined) => void;
  fetchLivreurs: () => void;
  userThatCanBeLivreur: utilisateurSimple[];
}

const EditModal = (props: EditModalProps) => {
  const { livreur, setLivreur, fetchLivreurs, userThatCanBeLivreur } = props;
  const { getToken } = useAuth();

  const handleClose = () => {
    setLivreur(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();

    if (!token || !livreur) {
      return;
    }

    const payload = getPayload(token);

    const response = await fetch(`/api/dish/${livreur.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(livreur),
    });

    if (response.ok) {
      handleClose();
      fetchLivreurs();
    } else {
    }
  };

  return (
    <Modal
      open={livreur !== undefined}
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
        {livreur !== undefined && (
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
              onChange={(e) =>
                setLivreur({ ...livreur, status: e.target.value })
              }
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
        )}
      </Box>
    </Modal>
  );
};

export default EditModal;
