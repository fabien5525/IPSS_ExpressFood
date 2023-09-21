import { PlatToAdd } from "@/app/api/dish/route";
import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import { Modal, Box, Typography, TextField, Switch } from "@mui/material";
import { useState } from "react";

interface AddModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  fetchDishes: () => void;
}

const AddModal = (props: AddModalProps) => {
  const { open, setOpen, fetchDishes } = props;
  const { getToken } = useAuth();
  const [plat, setPlat] = useState<PlatToAdd>({
    nom: "",
    prix: 0,
    ingredients: "",
    dujour: true,
    dessert: false,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      return;
    }

    const payload = getPayload(token);
    console.log(payload);

    const response = await fetch(`/api/dish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plat),
    });

    if (response.ok) {
      setOpen(false);
      fetchDishes();
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
            Ajouter un plat
          </Typography>
          <TextField
            variant="outlined"
            label="Nom"
            value={plat.nom}
            onChange={(e) => setPlat({ ...plat, nom: e.target.value })}
          />
          <TextField
            variant="outlined"
            label="Prix"
            value={plat.prix}
            onChange={(e) =>
              setPlat({ ...plat, prix: parseInt(e.target.value) })
            }
          />
          <TextField
            variant="outlined"
            label="Ingrédients"
            value={plat.ingredients}
            onChange={(e) => setPlat({ ...plat, ingredients: e.target.value })}
          />
          <div>
            <Switch
              checked={plat.dujour}
              onChange={(e) => setPlat({ ...plat, dujour: e.target.checked })}
            />
            <span className="mx-2">Plat du jour</span>
          </div>
          <div>
            <Switch
              checked={plat.dessert}
              onChange={(e) => setPlat({ ...plat, dessert: e.target.checked })}
            />
            <span className="mx-2">Dessert</span>
          </div>
          <button className="bg-green-500 text-white rounded-lg p-2 mt-4">
            Ajouter
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
