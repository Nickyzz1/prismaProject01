import Textarea from "@mui/joy/Textarea";
import { Button, TextField } from "@mui/material";

export default function Home() {
    return (
      <>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-100 to-red-200 ">
          <div className="flex flex-col items-center wrap outline-double  bg-red-500 h-full p-12 gap-3 w-96 outline-9 rounded-2xl outline-red-600" >
                <TextField id="filled-basic" label="Name" variant="filled" className="bg-red-100 rounded" />
                <TextField id="filled-basic" label="E-mail" variant="filled" className="bg-red-100 rounded" />
                <TextField id="filled-basic" label="Password" variant="filled" className="bg-red-100 rounded" />

                <Button variant="contained" >Cadastrar</Button>
          </div>
      </div>
      </>
    );
  }
  