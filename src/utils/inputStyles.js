const brandPink = "#ee6f97ff"; // Rosa pastel claro
const deepText = "#3D2B2F"; // Texto oscuro cálido
const lightBg = "#FFD9E2"; // Fondo crema rosado
const inputStyles = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    backgroundColor: "#FFFFFF",
    transition: "all 0.3s ease-in-out",

    "& fieldset": {
      borderColor: "rgba(255, 183, 206, 0.4)", // Borde Rosa sutil
      borderWidth: "1px",
      borderRadius: 3,
    },

    "&:hover fieldset": {
      borderColor: `${brandPink} !important`,
      borderRadius: 3,
    },

    "&.Mui-focused fieldset": {
      borderColor: `${brandPink} !important`,
      borderWidth: "2px",
      boxShadow: `0 0 20px rgba(255, 183, 206, 0.15)`,
      borderRadius: 3,
    },
  },

  "& .MuiInputBase-input": {
    color: deepText,
    padding: "18px 20px",
    fontSize: "15px",
    fontWeight: 500,
    "&::placeholder": {
      color: "rgba(61, 43, 47, 0.4)",
    },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(61, 43, 47, 0.6)",
    fontWeight: "800",
    fontSize: "13px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: brandPink,
    opacity: 1,
  },

  "& .MuiFormHelperText-root": {
    fontSize: "12px",
    color: brandPink,
    fontWeight: 600,
    letterSpacing: "0.02em",
  },

  "& .MuiSelect-icon": {
    color: brandPink,
  },
};

export default inputStyles;
