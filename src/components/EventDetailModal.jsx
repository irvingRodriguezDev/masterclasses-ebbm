import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function EventDetailModal({ open, onClose, event, onBuy }) {
  if (!event) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
              DETALLES DE LA MASTERCLASS
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
          onClick={onClose}
          sx={{ color: "#FFFFFF", opacity: 0.8, "&:hover": { opacity: 1 } }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4, backgroundColor: "#FFF9FA" }}>
        {/* Información Principal del Instructor / Tema */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='h5'
            sx={{ color: "#3D2B2F", fontWeight: 900, mb: 0.5 }}
          >
            {event.subject}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{ color: "#5C464A", opacity: 0.85, fontWeight: 600 }}
          >
            Impartido por:{" "}
            <span style={{ color: "#3D2B2F" }}>{event.name}</span>
          </Typography>
        </Box>

        {/* Tarjeta de Fecha y Horario */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#FFFFFF",
            p: 2.5,
            borderRadius: "16px",
            border: "1px solid #FFCBDA",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CalendarTodayIcon sx={{ color: "#3D2B2F" }} />
            <Box>
              <Typography
                variant='caption'
                sx={{ color: "#5C464A", opacity: 0.7, display: "block" }}
              >
                Fecha
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: "#3D2B2F", fontWeight: "bold" }}
              >
                13 de Marzo, 2027
              </Typography>
            </Box>
          </Box>
          <Divider
            orientation='vertical'
            flexItem
            sx={{ borderColor: "#FFCBDA" }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AccessTimeIcon sx={{ color: "#3D2B2F" }} />
            <Box>
              <Typography
                variant='caption'
                sx={{ color: "#5C464A", opacity: 0.7, display: "block" }}
              >
                Horario
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: "#3D2B2F", fontWeight: "bold" }}
              >
                {event.time}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Sección de Temario / Aprendizaje */}
        <Typography
          variant='subtitle2'
          sx={{
            color: "#3D2B2F",
            mb: 1.5,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          ¿Qué incluye esta capacitación?
        </Typography>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            p: 2,
            borderRadius: "16px",
            border: "1px solid #FFCBDA",
            mb: 3,
          }}
        >
          <List dense>
            <ListItem disablePadding sx={{ py: 0.75 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutlinedIcon sx={{ color: "#3D2B2F" }} />
              </ListItemIcon>
              <ListItemText
                primary='Técnicas avanzadas y tendencias actuales de la industria.'
                slotProps={{
                  primary: {
                    sx: {
                      color: "#3D2B2F",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    },
                  },
                }}
              />
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.75 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutlinedIcon sx={{ color: "#3D2B2F" }} />
              </ListItemIcon>
              <ListItemText
                primary='Práctica guiada paso a paso / estructura perfecta.'
                slotProps={{
                  primary: {
                    sx: {
                      color: "#3D2B2F",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    },
                  },
                }}
              />
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.75 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutlinedIcon sx={{ color: "#3D2B2F" }} />
              </ListItemIcon>
              <ListItemText
                primary='Diploma de participación digital e insumos incluidos.'
                slotProps={{
                  primary: {
                    sx: {
                      color: "#3D2B2F",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    },
                  },
                }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Caja de Precio Destacada */}
        <Box
          sx={{
            backgroundColor: "#FFD8E2",
            p: 2.5,
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px dashed #3D2B2F",
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{ color: "#3D2B2F", fontWeight: 800 }}
          >
            Inversión por Acceso:
          </Typography>
          <Typography variant='h4' sx={{ color: "#3D2B2F", fontWeight: 900 }}>
            ${event.price}.00{" "}
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>MXN</span>
          </Typography>
        </Box>
      </DialogContent>

      {/* Botones de Acción */}
      <DialogActions
        sx={{
          p: 3,
          backgroundColor: "#FFF9FA",
          borderTop: "1px solid #FFCBDA",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onClose}
          sx={{ color: "#3D2B2F", fontWeight: "bold", textTransform: "none" }}
        >
          Cerrar
        </Button>
        <Button
          variant='contained'
          startIcon={<ConfirmationNumberIcon />}
          onClick={() => {
            onClose();
            onBuy(event);
          }}
          sx={{
            backgroundColor: "#3D2B2F",
            borderRadius: "14px",
            color: "#FFFFFF",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(61, 43, 47, 0.3)",
            "&:hover": { backgroundColor: "#2a1d20" },
          }}
        >
          Comprar Boleto Ahora
        </Button>
      </DialogActions>
    </Dialog>
  );
}
