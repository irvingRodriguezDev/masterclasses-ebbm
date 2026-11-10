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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import inputStyles from "../utils/inputStyles";
const steps = ["Tus Datos", "Pago y Confirmación"];

export default function CheckoutModal({ open, onClose, event }) {
  const [activeStep, setActiveStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isFinished, setIsFinished] = useState(false);

  if (!event) return null;

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setIsFinished(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
    setIsFinished(false);
    onClose();
  };

  const total = event.price * quantity;

  return (
    <Dialog open={open} onClose={handleReset} maxWidth='sm' fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#FFD8E2",
          color: "#3D2B2F",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Proceso de Compra
        <IconButton onClick={handleReset} sx={{ color: "#3D2B2F" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {!isFinished ? (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepIcon-root.Mui-active": { color: "#3D2B2F" },
                      "& .MuiStepIcon-root.Mui-completed": { color: "#3D2B2F" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Paso 1: Formulario */}
            {activeStep === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: "bold", color: "#3D2B2F" }}
                >
                  Boleto para: {event.subject}
                </Typography>
                <TextField
                  label='Nombre Completo'
                  fullWidth
                  value={formData.name}
                  autoComplete='off'
                  sx={inputStyles}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <TextField
                  label='Correo Electrónico'
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
                  label='Teléfono / WhatsApp'
                  fullWidth
                  sx={inputStyles}
                  value={formData.phone}
                  autoComplete='off'
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <TextField
                  label='Cantidad de boletos'
                  type='number'
                  sx={inputStyles}
                  inputProps={{ min: 1, max: 50 }}
                  autoComplete='off'
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
              </Box>
            )}

            {/* Paso 2: Resumen de Compra */}
            {activeStep === 1 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Alert
                  severity='info'
                  sx={{
                    backgroundColor: "#EE6F97",
                    color: "#fff",
                    borderRadius: "12px",
                  }}
                >
                  Revisa los datos de tu orden antes de confirmar.
                </Alert>
                <Typography variant='body1'>
                  <strong>Nombre:</strong> {formData.name || "No especificado"}
                </Typography>
                <Typography variant='body1'>
                  <strong>Correo:</strong> {formData.email || "No especificado"}
                </Typography>
                <Typography variant='body1'>
                  <strong>Clase:</strong> {event.subject} ({event.name})
                </Typography>
                <Typography variant='body1'>
                  <strong>Cantidad:</strong> {quantity} boleto(s)
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant='h5'
                  sx={{ color: "#3D2B2F", fontWeight: "bold" }}
                >
                  Total a pagar: ${total}.00 MXN
                </Typography>
              </Box>
            )}
          </>
        ) : (
          /* Estado Final Exitoso */
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
            <Typography
              variant='h5'
              sx={{ fontWeight: "bold", color: "#3D2B2F" }}
            >
              ¡Reserva Confirmada!
            </Typography>
            <Typography variant='body1' sx={{ mt: 1, color: "#3D2B2F" }}>
              Hemos enviado los detalles de tus boletos a{" "}
              <strong>{formData.email}</strong>.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        {!isFinished ? (
          <>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ color: "#3D2B2F" }}>
                Atrás
              </Button>
            )}
            <Button
              variant='contained'
              onClick={handleNext}
              disabled={
                activeStep === 0 &&
                (!formData.name || !formData.email || !formData.phone)
              }
              sx={{
                backgroundColor: "#3D2B2F",
                color: "#FFFFFF",
                borderRadius: "12px",
                "&:hover": { backgroundColor: "#2a1d20" },
              }}
            >
              {activeStep === steps.length - 1
                ? "Proceder al Pago"
                : "Siguiente"}
            </Button>
          </>
        ) : (
          <Button
            variant='contained'
            onClick={handleReset}
            sx={{
              backgroundColor: "#3D2B2F",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#2a1d20" },
            }}
          >
            Aceptar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
