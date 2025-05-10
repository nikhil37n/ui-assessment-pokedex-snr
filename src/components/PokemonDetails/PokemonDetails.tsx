import { useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { useGetPokemonDetails } from "../../hooks/useGetPokemonDetails";

export const PokemonDetails = () => {
  const classes = useStyles();

  // To get data from url
  const location = useLocation();

  const navigate = useNavigate();
  const data = location.state;

  // Fetching Pokemon details based on id and name
  const { pokemon, loading, error } = useGetPokemonDetails({
    id: data.id,
    name: data.name,
  });

  // To navigate back to list screen
  const closeModal = () => {
    navigate("/pokemon");
  };

  // Animation for dialog image and title
  const styleSheet = document.styleSheets[0];
  const keyframes1 = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }`;
  const keyframes2 = `
  @keyframes bounce {

            0%,20%,50%,80%,100% {
                transform: translateY(0);
            }

            40% {
                transform: translateY(-30px);
            }

            60% {
                transform: translateY(-15px);
            }
        }`;

  if (styleSheet && styleSheet.insertRule) {
    styleSheet.insertRule(keyframes1, styleSheet.cssRules.length);
    styleSheet.insertRule(keyframes2, styleSheet.cssRules.length);
  }

  // To render pokemon details
  const renderPokemonDetails = () => {
    if (!loading && pokemon) {
      return (
        <div className={classes.overlayStyles}>
          <div className={classes.dialogStyles}>
            <button
              onClick={closeModal}
              className={`${classes.closeButtonStyles} ${classes.textColor}`}
            >
              X
            </button>
            {error && <p>Error loading Pokémon details.</p>}
            <div>
              <h2 className={`${classes.textColor} ${classes.bounceAnimation}`}>
                {pokemon?.name} #{pokemon?.number}
              </h2>
              <div className={classes.flex}>
                <div>
                  <img
                    className={`${classes.img} ${classes.rotatingImageStyle}`}
                    src={pokemon?.image}
                    alt={pokemon?.name}
                  />
                </div>
                <div>
                  <p className={classes.textColor}>
                    <span className={classes.label}>Classification: </span>{" "}
                    {pokemon?.classification}
                  </p>
                  <p className={classes.textColor}>
                    <span className={classes.label}>Types: </span>
                    {pokemon?.types?.join(", ")}
                  </p>
                  <p className={classes.textColor}>
                    <span className={classes.label}>Max CP: </span>
                    {pokemon?.maxCP} |{" "}
                    <span className={classes.label}>Max HP: </span>
                    {pokemon?.maxHP}
                  </p>
                  <p className={classes.textColor}>
                    <span className={classes.label}>Height: </span>
                    {pokemon?.height?.minimum} - {pokemon?.height?.maximum}
                  </p>
                  <p className={classes.textColor}>
                    <span className={classes.label}>Weight: </span>
                    {pokemon?.weight?.minimum} - {pokemon?.weight?.maximum}
                  </p>
                  <p className={classes.textColor}>
                    <span className={classes.label}>Weaknesses: </span>
                    {pokemon?.weaknesses?.join(", ")}
                  </p>
                  <p className={classes.textColor}>
                    <span className={classes.label}>Resistant: </span>
                    {pokemon?.resistant?.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {loading && <p className={classes.loading}>Loading...</p>}
      {renderPokemonDetails()}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    flex: {
      display: "flex",
    },
    textColor: {
      color: "#333",
    },
    loading: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50px, -50px)",
      color: "#fff",
      fontSize: "20px",
      textTransform: "uppercase",
    },
    bounceAnimation: {
      webkitAnimationDuration: "1s",
      animationDuration: "1s",
      webkitAnimationFillMode: "both",
      animationFillMode: "both",
      webkitAnimationName: "bounce",
      animationName: "bounce",
    },
    label: {
      fontWeight: "bold",
      color: "#333",
      fontSize: "16px",
    },
    overlayStyles: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      letterSpacing: "1px",
      textShadow: "0px 1px 2px rgba(0, 0, 0, .4)",
      cursor: "pointer",
    },
    dialogStyles: {
      background: "#fff",
      padding: "25px 35px",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "700px",
      position: "relative",
      boxShadow:
        "rgba(0,255,255,0.5) 0px 0px 6px, rgba(0,255,255,0.5) 0px 0px 15px, rgba(0,255,255,0.5) 0px 3px 40px",
    },
    img: {
      aspectRatio: "1/1",
      width: "260px",
      textAlign: "center",
      marginRight: "40px",
    },
    rotatingImageStyle: {
      animation: "fadeIn 1s ease-in-out",
    },
    closeButtonStyles: {
      position: "absolute",
      top: "8px",
      right: "12px",
      fontSize: "18px",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      fontFamily: "revert",
    },
  },
  { name: "PokemonDetails" }
);
