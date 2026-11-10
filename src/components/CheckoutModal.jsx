import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import inputStyles from "../utils/inputStyles";
import { useCaptcha } from "../hooks/useCaptcha";
const steps = ["Tus Datos", "Resumen y Pago"];

export default function CheckoutModal({ open, onClose, event }) {
  const { getCaptchaToken } = useCaptcha();

  const [activeStep, setActiveStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!event) return null;

  const handleNext = () => {
    setErrorMessage("");
    if (activeStep === steps.length - 1) {
      handleProcessPayment();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setLoading(false);
    setErrorMessage("");
    setFormData({ name: "", email: "", phone: "" });
    setQuantity(1);
    onClose();
  };

  // Función que conecta con tu Backend (Lambda / Stripe)
  const handleProcessPayment = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      // Ajusta esta URL con el endpoint de tu API Gateway en AWS
      const API_URL = import.meta.env.VITE_BACKEND_URL;
      const token = await getCaptchaToken("formulario_registro");
      const payload = {
        dataForm: {
          fullname: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: "N/A",
          profile: "Asistente Masterclass",
          isMasterclass: true, // Bandera clave que acordamos
          masterclassId: event.accessType, // Nombre o ID de la masterclass
          quantity: quantity,
          captcha: token, // Cambia por tu token real de captcha si aplica
        },
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al procesar la sesión de pago.");
      }

      // Redirigir a la pasarela de pago oficial de Stripe
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo obtener la URL de pago.");
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      setErrorMessage(
        error.message || "Ocurrió un error inesperado. Intenta de nuevo.",
      );
      setLoading(false);
    }
  };

  const total = event.price * quantity;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : handleReset}
      maxWidth='sm'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(61, 43, 47, 0.15)",
            border: "1px solid #FFCBDA",
            overflow: "hidden",
          },
        },
      }}
    >
      {/* Cabecera Estilo Premium */}
      <DialogTitle
        sx={{
          backgroundColor: "#3D2B2F",
          color: "#FFFFFF",
          py: 3,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <WorkspacePremiumIcon sx={{ color: "#FFD8E2", fontSize: 28 }} />
          <Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 800, letterSpacing: 0.5, lineHeight: 1.2 }}
            >
              PASE EXCLUSIVO
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "#FFD8E2", opacity: 0.9 }}
            >
              Beauty Business Mexico 2027
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleReset}
          disabled={loading}
          sx={{ color: "#FFFFFF", opacity: 0.8, "&:hover": { opacity: 1 } }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4, backgroundColor: "#FFF9FA" }}>
        {/* Stepper Minimalista */}
        <Stepper activeStep={activeStep} sx={{ mb: 4, pt: 1 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root.Mui-active": { color: "#3D2B2F" },
                  "& .MuiStepIcon-root.Mui-completed": { color: "#3D2B2F" },
                  "& .MuiStepLabel-label.Mui-active": {
                    fontWeight: "bold",
                    color: "#3D2B2F",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {errorMessage && (
          <Alert severity='error' sx={{ mb: 3, borderRadius: "12px" }}>
            {errorMessage}
          </Alert>
        )}

        {/* Paso 1: Formulario de Datos */}
        {activeStep === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box
              sx={{
                backgroundColor: "#FFD8E2",
                p: 2,
                borderRadius: "16px",
                border: "1px dashed #3D2B2F",
              }}
            >
              <Typography
                variant='subtitle2'
                sx={{
                  color: "#3D2B2F",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                }}
              >
                Masterclass Seleccionada
              </Typography>
              <Typography
                variant='h6'
                sx={{ color: "#3D2B2F", fontWeight: 900, mt: 0.5 }}
              >
                {event.subject}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: "#3D2B2F", opacity: 0.85 }}
              >
                Instructor: <strong>{event.name}</strong> • Horario:{" "}
                {event.time}
              </Typography>
            </Box>

            <TextField
              label='Nombre Completo del Asistente'
              fullWidth
              value={formData.name}
              autoComplete='off'
              sx={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label='Correo Electrónico (para recibir tus pases)'
              type='email'
              fullWidth
              sx={inputStyles}
              value={formData.email}
              autoComplete='off'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              label='Teléfono / WhatsApp de Contacto'
              fullWidth
              sx={inputStyles}
              value={formData.phone}
              autoComplete='off'
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <TextField
              label='Cantidad de Pases'
              type='number'
              sx={inputStyles}
              slotProps={{
                input: {
                  min: 1,
                  max: 20,
                },
              }}
              autoComplete='off'
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
          </Box>
        )}

        {/* Paso 2: Resumen Elegante */}
        {activeStep === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Alert
              severity='info'
              sx={{
                backgroundColor: "#3D2B2F",
                color: "#FFFFFF",
                borderRadius: "16px",
                "& .MuiAlert-icon": { color: "#FFD8E2" },
              }}
            >
              Estás a un solo paso de asegurar tu lugar en la experiencia más
              exclusiva del evento.
            </Alert>

            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                p: 3,
                borderRadius: "16px",
                border: "1px solid #FFCBDA",
                boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant='body2'
                  sx={{ color: "#5C464A", opacity: 0.8 }}
                >
                  Asistente:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: "bold", color: "#3D2B2F" }}
                >
                  {formData.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant='body2'
                  sx={{ color: "#5C464A", opacity: 0.8 }}
                >
                  Correo:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: "bold", color: "#3D2B2F" }}
                >
                  {formData.email}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant='body2'
                  sx={{ color: "#5C464A", opacity: 0.8 }}
                >
                  WhatsApp:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: "bold", color: "#3D2B2F" }}
                >
                  {formData.phone}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant='body2'
                  sx={{ color: "#5C464A", opacity: 0.8 }}
                >
                  Cantidad:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: "bold", color: "#3D2B2F" }}
                >
                  {quantity} Pase(s)
                </Typography>
              </Box>

              <Divider sx={{ my: 2, borderColor: "#FFCBDA" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant='subtitle1'
                  sx={{ color: "#3D2B2F", fontWeight: 800 }}
                >
                  Total a Invertir:
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ color: "#3D2B2F", fontWeight: 900 }}
                >
                  ${total}.00{" "}
                  <span style={{ fontSize: "1rem", fontWeight: 600 }}>MXN</span>
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mt: 1,
                opacity: 0.7,
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 16, color: "#3D2B2F" }} />
              <Typography
                variant='caption'
                sx={{ color: "#3D2B2F", fontWeight: 600 }}
              >
                Pagos 100% seguros procesados mediante encriptación SSL de
                Stripe
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          backgroundColor: "#FFF9FA",
          borderTop: "1px solid #FFCBDA",
          justifyContent: "space-between",
        }}
      >
        {activeStep > 0 ? (
          <Button
            onClick={handleBack}
            disabled={loading}
            sx={{ color: "#3D2B2F", fontWeight: "bold", textTransform: "none" }}
          >
            Atrás
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant='contained'
          onClick={handleNext}
          disabled={
            loading ||
            (activeStep === 0 &&
              (!formData.name || !formData.email || !formData.phone))
          }
          sx={{
            backgroundColor: "#3D2B2F",
            color: "#FFFFFF",
            borderRadius: "14px",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(61, 43, 47, 0.3)",
            "&:hover": { backgroundColor: "#2a1d20" },
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
              <span>Conectando con pasarela...</span>
            </Box>
          ) : activeStep === steps.length - 1 ? (
            "Proceder al Pago Seguro"
          ) : (
            "Siguiente Paso"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
