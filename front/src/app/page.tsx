import { InputAdornment, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeLayout from "@/components/AppLayout";

export default function Home() {
  return (
    <HomeLayout>
      <main
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #f2ca2f, #f3ca2e, #f5ca2d, #f6c92d, #f8c92c)",
        }}
        className="h-[92dvh] px-4 flex flex-col"
      >
        <p className="text-3xl font-bold py-8">
          Vos plats préférés, directement à votre porte
        </p>
        <TextField
          className="mb-4 p-4 rounded bg-white"
          placeholder="Saissier adresse de livraison"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon className="text-black" />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <button className="bg-black text-white font-bold p-4 rounded">
          Livrer Maintenant
        </button>
      </main>
    </HomeLayout>
  );
}
