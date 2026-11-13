import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Box,
  Container,
  Chip,
  CardMedia,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoBBM from "../assets/EBBM.webp";
import EventDetailModal from "../components/EventDetailModal";
import CheckoutModal from "../components/CheckoutModal";
import { useState } from "react";
import logo from "../assets/EBBM.webp";
import MasterClassCaro from "../assets/MasterClassCaro.jpeg";
import MasterClassDavid from "../assets/MasterClassDavid.jpeg";
import MasterClassJavier from "../assets/MasterClassJavier.jpeg";
import MasterClassLiz from "../assets/MasterClassLiz.jpeg";
function Home() {
  const masterClases = [
    {
      id: 1,
      name: "Javier de la Rosa",
      subject: "Maquillaje Profesional",
      price: 350,
      time: "11:00 AM - 1:00 PM",
      date: "13 de marzo 2027",
      place: "",
      quantity: 480,
      recommended: false,
      accessType: "JAVIER_DE_LA_ROSA",
      image: MasterClassJavier,
    },
    {
      id: 2,
      name: "Liz Pardo",
      subject: "Dual Forms",
      price: 350,
      time: "3:00 PM - 7:00 PM",
      date: "13 de marzo 2027",
      place: "",
      quantity: 480,
      recommended: false, // Para destacar como en la imagen
      accessType: "LIZ_PARDO",
      image: MasterClassLiz,
    },
    {
      id: 3,
      name: "David Solorio",
      subject: "AutoMaquillaje",
      price: 350,
      time: "10:00 AM - 2:00 PM",
      date: "14 de marzo 2027",
      place: "",
      quantity: 480,
      recommended: false,
      accessType: "DAVID_SOLORIO",
      image: MasterClassDavid,
    },
    {
      id: 4,
      name: "Carolina Tavera",
      subject: "Manicura Pro",
      price: 350,
      time: "3:00 PM - 7:00 PM",
      date: "14 de marzo 2027",
      place: "",
      quantity: 480,
      recommended: false,
      accessType: "CAROLINA_TAVERA",
      image: MasterClassCaro,
    },
  ];
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", minHeight: "100vh", py: 4 }}>
      <Container maxWidth='xl'>
        {/* Encabezado y Logo Centrados */}
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", textAlign: "center" }}
        >
          <Grid size={12}>
            <Box
              component='img'
              src={LogoBBM}
              alt='Logo BBM'
              sx={{ width: 250, height: "auto", objectFit: "contain", mt: -5 }}
            />
          </Grid>

          <Grid size={12} sx={{ mt: -5 }}>
            <Typography
              variant={{ xs: "h5", md: "h4" }}
              sx={{
                color: "#3D2B2F",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              ELIGE TU PASE PARA MASTERCLASS EN VIVO
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: "#3D2B2F", opacity: 0.8, mt: 0 }}
            >
              Asegura tu lugar en la capacitación más esperada de la temporada.
            </Typography>
          </Grid>

          {/* Tarjetas de Clases */}
          <Grid size={12} sx={{ mt: 2 }}>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: "center", alignItems: "stretch" }}
            >
              {masterClases.map((m) => (
                <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card
                    elevation={m.recommended ? 4 : 1}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      border: m.recommended
                        ? "2px solid #3D2B2F"
                        : "1px solid #FFCBDA",
                      transition: "transform 0.2s ease-in-out",
                      position: "relative",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    {/* Badge para opción recomendada */}
                    {m.recommended && (
                      <Chip
                        label='OPCIÓN RECOMENDADA'
                        size='small'
                        sx={{
                          position: "absolute",
                          top: -12,
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "#3D2B2F",
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          fontSize: "0.7rem",
                          zIndex: 1,
                        }}
                      />
                    )}

                    {/* Cabecera de la Tarjeta con Color de Fondo */}
                    {/* <CardHeader
                      title={m.subject}
                      subheader={`Instructor: ${m.name}`}
                      sx={{
                        backgroundColor: "#FFD8E2",
                        color: "#3D2B2F",
                        textAlign: "center",
                        py: 2.5,
                        "& .MuiCardHeader-title": {
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        },
                        "& .MuiCardHeader-subheader": {
                          color: "#3D2B2F",
                          opacity: 0.85,
                          fontSize: "0.9rem",
                          mt: 0.5,
                        },
                      }}
                    /> */}
                    <img src={m.image} width='100%' height='auto' />
                    {/* <CardMedia
                      image={m.image}
                      sx={{ height: 350, objectFit: "cover" }}
                    /> */}
                    {/* Contenido de la Tarjeta */}
                    <CardContent
                      sx={{ textAlign: "center", flexGrow: 1, pt: 2.5 }}
                    >
                      <Typography
                        variant='body2'
                        sx={{ color: "#3D2B2F", opacity: 0.7 }}
                      >
                        {m.date}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: "#3D2B2F", opacity: 0.7, mb: 2 }}
                      >
                        Horario: {m.time}
                      </Typography>

                      <Typography
                        variant='h4'
                        sx={{
                          color: "#3D2B2F",
                          fontWeight: "bold",
                          my: 1,
                        }}
                      >
                        ${m.price}.00
                      </Typography>
                    </CardContent>

                    {/* Botones de Acción estilizados como la imagen */}
                    <CardActions
                      sx={{ flexDirection: "column", gap: 1, p: 2, pt: 0 }}
                    >
                      <Button
                        fullWidth
                        variant='contained'
                        startIcon={<ConfirmationNumberIcon />}
                        onClick={() => setSelectedCheckout(m)}
                        sx={{
                          backgroundColor: "#3D2B2F",
                          color: "#FFFFFF",
                          borderRadius: "8px",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#2a1d20" },
                        }}
                      >
                        Comprar Boletos
                      </Button>
                      <Button
                        fullWidth
                        variant='outlined'
                        startIcon={<VisibilityIcon />}
                        onClick={() => setSelectedDetail(m)}
                        sx={{
                          borderColor: "#3D2B2F",
                          color: "#3D2B2F",
                          borderRadius: "8px",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#3D2B2F",
                            backgroundColor: "#FFD8E2",
                          },
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* Modales de Detalle y Compra */}
        <EventDetailModal
          open={Boolean(selectedDetail)}
          event={selectedDetail}
          onClose={() => setSelectedDetail(null)}
          onBuy={(evt) => setSelectedCheckout(evt)}
        />

        <CheckoutModal
          open={Boolean(selectedCheckout)}
          event={selectedCheckout}
          onClose={() => setSelectedCheckout(null)}
        />
      </Container>
    </Box>
  );
}

export default Home;
