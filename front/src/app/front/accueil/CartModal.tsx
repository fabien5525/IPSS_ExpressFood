import Plat from "@/models/Plat";
import { Modal, Box, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommandeSimple } from "@/models/Commande";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import { useRouter } from "next/navigation";

interface OpenCartModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dishes: Plat[];
  setDishes: (dishes: Plat[]) => void;
}

const OpenCartModal = (props: OpenCartModalProps) => {
  const { open, setOpen, dishes, setDishes } = props;
  const { getToken } = useAuth();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (dishes.length === 0) {
      setOpen(false);
    }
  }, [dishes, setOpen]);

  const handleCommande = async () => {
    const token = getToken();

    if (!token) {
      return;
    }

    const { id } = getPayload(token);

    const commande: CommandeSimple = {
      prix_total: dishes.reduce((acc, dish) => acc + dish.prix, 0),
      etat: "Reçu",
      plats: dishes.map((dish) => dish.id),
      user: id,
    };

    const res = await fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commande),
    });

    if (!res.ok) {
      console.log(res);
      return;
    }

    setDishes([]);
    setOpen(false);
    router.push("/front/historique");
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
        {dishes.map((dish) => (
          <Paper
            key={dish.id}
            className="flex flex-row justify-around p-3 pt-5"
          >
            <div className="pt-2">{dish.nom}</div>
            <div className="pt-2">{dish.prix}</div>
            <IconButton>
              <DeleteIcon className="text-red-500" />
            </IconButton>
          </Paper>
        ))}
        <button
          className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4 w-full"
          onClick={handleCommande}
        >
          <span>Valider</span>
        </button>
      </Box>
    </Modal>
  );
};

export default OpenCartModal;
