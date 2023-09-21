import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import { utilisateurSimple } from "@/models/Utilisateur";
import { Modal, Box, Typography, TextField, Switch } from "@mui/material";

interface EditModalProps {
  user: utilisateurSimple | undefined;
  setUser: (user: utilisateurSimple | undefined) => void;
  fetchUsers: () => void;
}

const EditModal = (props: EditModalProps) => {
  const { user, setUser, fetchUsers } = props;
  const { getToken } = useAuth();

  const handleClose = () => {
    setUser(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      return;
    }

    const payload = getPayload(token);
    console.log(payload);

    const response = await fetch(`/api/user/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      handleClose();
      fetchUsers();
    } else {
    }
  };

  return (
    <Modal
      open={user !== undefined}
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
        {user !== undefined && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editer un utilisateur
            </Typography>
            <TextField
              variant="outlined"
              label="Nom"
              value={user.nom}
              onChange={(e) => setUser({ ...user, nom: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="Prénom"
              value={user.prenom}
              onChange={(e) => setUser({ ...user, prenom: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="Téléphone"
              value={user.tel}
              onChange={(e) => setUser({ ...user, tel: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="Adresse"
              value={user.adresse}
              onChange={(e) => setUser({ ...user, adresse: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="Email"
              value={user.mail}
              onChange={(e) => setUser({ ...user, mail: e.target.value })}
            />
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
