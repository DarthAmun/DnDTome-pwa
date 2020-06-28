interface Theme {
  buttons: {
    color: string;
    backgroundColor: string;
    size: {
      small: string;
      medium: string;
      large: string;
    };
  };
  main: {
    backgroundColor: string;
    color: string;
    highlight: string;
  };
  tile: {
    backgroundColor: string;
    color: string;
    boxShadow: string;
    size: {
      small: {
        width: string;
        height: string;
      };
      medium: {
        width: string;
        height: string;
      };
      large: {
        width: string;
        height: string;
      };
    };
  };
}

export const lightTheme: Theme = {
  buttons: {
    color: "white",
    backgroundColor: "#8000ff",
    size: {
      small: "1em",
      medium: "2em",
      large: "3em",
    },
  },
  main: {
    backgroundColor: "rgb(248, 248, 248)",
    color: "",
    highlight: "#8000ff",
  },
  tile: {
    backgroundColor: "white",
    color: "darkgrey",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75);",
    size: {
      small: {
        width: "100%",
        height: "15em",
      },
      medium: {
        width: "15em",
        height: "15em",
      },
      large: {
        width: "15em",
        height: "15em",
      },
    },
  },
};

export const darkTheme: Theme = {
  buttons: {
    color: "#cfc8d8",
    backgroundColor: "#522a82",
    size: {
      ...lightTheme.buttons.size,
    },
  },
  main: {
    backgroundColor: "#1f2532",
    color: "",
    highlight: "#8000ff",
  },
  tile: {
    backgroundColor: "#333d51",
    color: "lightslategray",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75);",
    size: {
      ...lightTheme.tile.size,
    },
  },
};

export default Theme;
