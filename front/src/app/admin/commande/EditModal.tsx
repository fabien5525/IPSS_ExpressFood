import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import { CommandeComplet } from "@/models/Commande";
import { utilisateurSimple } from "@/models/Utilisateur";
import { Modal, Box, Typography } from "@mui/material";

interface EditModalProps {
  commande: CommandeComplet | undefined;
  setCommande: (v: CommandeComplet | undefined) => void;
  fetchCommandes: () => void;
  userThatCanBeLivreur: utilisateurSimple[];
}

const EditModal = (props: EditModalProps) => {
  const { commande, setCommande, fetchCommandes, userThatCanBeLivreur } = props;
  const { getToken } = useAuth();

  const handleClose = () => {
    setCommande(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();

    if (!token || !commande) {
      return;
    }

    const payload = getPayload(token);

    const response = await fetch(`/api/order/${commande.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commande),
    });

    if (response.ok) {
      handleClose();
      fetchCommandes();
    } else {
    }
  };

  return (
    <Modal
      open={commande !== undefined}
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
        {commande !== undefined && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editer un commande
            </Typography>

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
