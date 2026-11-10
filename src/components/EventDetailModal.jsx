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
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function EventDetailModal({ open, onClose, event, onBuy }) {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
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
        Detalles de la Masterclass
        <IconButton onClick={onClose} sx={{ color: "#3D2B2F" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant='h5'
              sx={{ color: "#3D2B2F", fontWeight: "bold" }}
            >
              {event.subject}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{ color: "#3D2B2F", opacity: 0.8, mb: 2 }}
            >
              Impartido por: <strong>{event.name}</strong>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarTodayIcon sx={{ color: "#3D2B2F" }} />
            <Typography variant='body2' sx={{ color: "#3D2B2F" }}>
              13 de Marzo de 2027
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ color: "#3D2B2F" }} />
            <Typography variant='body2' sx={{ color: "#3D2B2F" }}>
              {event.time}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant='h6'
          sx={{ color: "#3D2B2F", mt: 2, fontWeight: "bold" }}
        >
          ¿Qué aprenderás?
        </Typography>
        <List size='small'>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleOutlinedIcon sx={{ color: "#3D2B2F" }} />
            </ListItemIcon>
            <ListItemText primary='Técnicas avanzadas y tendencias actuales.' />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleOutlinedIcon sx={{ color: "#3D2B2F" }} />
            </ListItemIcon>
            <ListItemText primary='Preparación de piel / estructura perfecta.' />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleOutlinedIcon sx={{ color: "#3D2B2F" }} />
            </ListItemIcon>
            <ListItemText primary='Diploma de participación digital e insumos incluidos.' />
          </ListItem>
        </List>

        <Box
          sx={{
            backgroundColor: "#FFD8E2",
            p: 2,
            borderRadius: 2,
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{ color: "#3D2B2F", fontWeight: "bold" }}
          >
            Precio de Acceso:
          </Typography>
          <Typography
            variant='h5'
            sx={{ color: "#3D2B2F", fontWeight: "bold" }}
          >
            ${event.price}.00 MXN
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} sx={{ color: "#3D2B2F" }}>
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
            borderRadius: "12px",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#2a1d20" },
          }}
        >
          Comprar Boleto
        </Button>
      </DialogActions>
    </Dialog>
  );
}
