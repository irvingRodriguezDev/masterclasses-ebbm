import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function PaymentSuccess({ event, buyerData, onGoHome }) {
  // Datos de respaldo por si se accede directamente sin props
  const eventData = event || {
    subject: "Masterclass en Vivo",
    name: "Instructor Invitado",
    price: 300,
    time: "10:00 AM - 2:00 PM",
  };

  const client = buyerData || {
    name: "Invitado",
    email: "correo@ejemplo.com",
    phone: "5555555555",
    quantity: 1,
  };

  const total = eventData.price * client.quantity;
  const orderId = "BBM-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        py: 6,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth='sm'>
        <Card
          elevation={3}
          sx={{
            borderRadius: "24px",
            border: "1px solid #FFCBDA",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Cabecera decorativa */}
          <Box
            sx={{
              backgroundColor: "#FFD8E2",
              py: 4,
              px: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 72, color: "#3D2B2F" }} />
            <Typography
              variant='h4'
              sx={{
                color: "#3D2B2F",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              ¡Pago Exitoso!
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: "#3D2B2F", opacity: 0.85 }}
            >
              Tu lugar ha sido reservado con éxito. ¡Te esperamos!
            </Typography>
          </Box>

          {/* Contenido del Resumen */}
          <CardContent sx={{ p: 4 }}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#FAF6F8",
                p: 3,
                borderRadius: "16px",
                textAlign: "left",
                mb: 3,
                border: "1px dashed #FFCBDA",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  variant='body2'
                  sx={{ color: "#3D2B2F", opacity: 0.7 }}
                >
                  Número de Orden:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: "#3D2B2F", fontWeight: "bold" }}
                >
                  {orderId}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography
                variant='subtitle1'
                sx={{ color: "#3D2B2F", fontWeight: "bold", mb: 1 }}
              >
                {eventData.subject}
              </Typography>
              <Typography variant='body2' sx={{ color: "#3D2B2F", mb: 0.5 }}>
                <strong>Instructor:</strong> {eventData.name}
              </Typography>
              <Typography variant='body2' sx={{ color: "#3D2B2F", mb: 0.5 }}>
                <strong>Horario:</strong> {eventData.time}
              </Typography>
              <Typography variant='body2' sx={{ color: "#3D2B2F", mb: 0.5 }}>
                <strong>Asistente:</strong> {client.name}
              </Typography>
              <Typography variant='body2' sx={{ color: "#3D2B2F", mb: 2 }}>
                <strong>Correo:</strong> {client.email}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant='body1'
                  sx={{ color: "#3D2B2F", fontWeight: "bold" }}
                >
                  Total Pagado ({client.quantity} boleto
                  {client.quantity > 1 ? "s" : ""}):
                </Typography>
                <Typography
                  variant='h5'
                  sx={{ color: "#3D2B2F", fontWeight: "bold" }}
                >
                  ${total}.00 MXN
                </Typography>
              </Box>
            </Paper>

            <Typography
              variant='body2'
              sx={{ color: "#3D2B2F", opacity: 0.8, mb: 3 }}
            >
              Hemos enviado tu comprobante y pase de acceso digital a tu correo
              electrónico.
            </Typography>

            {/* Botones de Acción */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button
                variant='contained'
                startIcon={<DownloadRoundedIcon />}
                sx={{
                  backgroundColor: "#3D2B2F",
                  color: "#FFFFFF",
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#2a1d20" },
                }}
                onClick={() => alert("Simulando descarga de boleto PDF...")}
              >
                Descargar Pase de Acceso
              </Button>

              <Button
                variant='outlined'
                startIcon={<ArrowBackRoundedIcon />}
                sx={{
                  borderColor: "#3D2B2F",
                  color: "#3D2B2F",
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#3D2B2F",
                    backgroundColor: "#FFD8E2",
                  },
                }}
                onClick={onGoHome}
              >
                Regresar al Inicio
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
