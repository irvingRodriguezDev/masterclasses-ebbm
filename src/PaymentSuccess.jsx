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
  Alert,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useParams } from "react-router-dom";

export default function PaymentSuccess({ event, buyerData, onGoHome }) {
  const { email, name, quantity, selectedLabel } = useParams();

  return (
    <Box
      sx={{
        backgroundColor: "#FFF9FA",
        minHeight: "100vh",
        py: 6,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth='sm'>
        <Card
          elevation={4}
          sx={{
            borderRadius: "24px",
            border: "1px solid #FFCBDA",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(61, 43, 47, 0.1)",
          }}
        >
          {/* Cabecera Institucional Premium */}
          <Box
            sx={{
              backgroundColor: "#3D2B2F",
              py: 4,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 216, 226, 0.15)",
                p: 2,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 56, color: "#FFD8E2" }} />
            </Box>
            <Typography
              variant='h4'
              sx={{
                color: "#FFFFFF",
                fontWeight: 900,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              ¡Pago Exitoso!
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: "#FFD8E2", opacity: 0.9, maxWidth: "400px" }}
            >
              Tu transacción se ha procesado correctamente y tu lugar se
              encuentra oficialmente asegurado.
            </Typography>
          </Box>

          {/* Contenido del Resumen */}
          <CardContent sx={{ p: 4, backgroundColor: "#FFFFFF" }}>
            {/* Aviso Importante sobre el Correo y Spam */}
            <Alert
              icon={<EmailOutlinedIcon sx={{ color: "#3D2B2F" }} />}
              sx={{
                backgroundColor: "#FFD8E2",
                color: "#3D2B2F",
                borderRadius: "16px",
                mb: 3,
                alignItems: "center",
                "& .MuiAlert-message": { fontSize: "0.9rem" },
              }}
            >
              Tus boletos digitales han sido enviados a <strong>{email}</strong>
              .
              <br />
              <span
                style={{ fontSize: "0.8rem", opacity: 0.85, fontWeight: 600 }}
              >
                ⚠️ Importante: Si no lo visualizas en tu bandeja principal, por
                favor revisa tu carpeta de{" "}
                <strong>correo no deseado (Spam)</strong>.
              </span>
            </Alert>

            {/* Recibo / Resumen de la Orden */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#FFF9FA",
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
                  sx={{ color: "#5C464A", opacity: 0.7 }}
                >
                  Masterclass:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: "#3D2B2F",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  {selectedLabel}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2, borderColor: "#FFCBDA" }} />

              <Typography variant='body2' sx={{ color: "#5C464A", mb: 0.5 }}>
                <strong>Asistente:</strong> {name}
              </Typography>
            </Paper>

            {/* Botón de Regreso al Inicio */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button
                variant='contained'
                startIcon={<ArrowBackRoundedIcon />}
                sx={{
                  backgroundColor: "#3D2B2F",
                  color: "#FFFFFF",
                  py: 1.5,
                  borderRadius: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(61, 43, 47, 0.2)",
                  "&:hover": {
                    backgroundColor: "#2a1d20",
                  },
                }}
                onClick={onGoHome}
              >
                Regresar al Inicio de la Expo
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
