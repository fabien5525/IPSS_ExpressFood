import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import Plat from "@/models/Plat";
import { Modal, Box, Typography, TextField, Switch } from "@mui/material";

interface EditModalProps {
  plat: Plat | undefined;
  setPlat: (plat: Plat | undefined) => void;
  fetchDishes: () => void;
}

const EditModal = (props: EditModalProps) => {
  const { plat, setPlat, fetchDishes } = props;
  const { getToken } = useAuth();

  const handleClose = () => {
    setPlat(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();

    if (!token || !plat) {
      return;
    }

    const payload = getPayload(token);

    const response = await fetch(`/api/dish/${plat.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plat),
    });

    if (response.ok) {
      handleClose();
      fetchDishes();
    } else {
    }
  };

  return (
    <Modal
      open={plat !== undefined}
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
        {plat !== undefined && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editer un utilisateur
            </Typography>
            <TextField
              label="Nom"
              variant="outlined"
              value={plat.nom}
              onChange={(e) => {
                setPlat({ ...plat, nom: e.target.value });
              }}
            />
            <TextField
              label="Prix"
              variant="outlined"
              value={plat.prix}
              onChange={(e) => {
                setPlat({ ...plat, prix: parseInt(e.target.value) });
              }}
            />
            <div>
              <Switch
                checked={plat.dessert}
                onChange={(e) => {
                  setPlat({ ...plat, dessert: e.target.checked });
                }}
              />
              <span>Dessert ?</span>
            </div>
            <div>
              <Switch
                checked={plat.dujour}
                onChange={(e) => {
                  setPlat({ ...plat, dujour: e.target.checked });
                }}
              />
              <span>Plat du jour ?</span>
            </div>

            <button
              className="bg-green-500 text-white rounded-lg p-2 mt-4"
              type="submit"
            >
              Editer
            </button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default EditModal;
