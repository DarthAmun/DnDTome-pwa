interface Theme {
  buttons: {
    color: string;
    backgroundColor: string;
    height: string;
  };
  input: {
    color: string;
    backgroundColor: string;
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
  nav: {
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
    }
  }
}

export const lightTheme: Theme = {
  buttons: {
    color: "white",
    backgroundColor: "#8000ff",
    height: "20px",
  },
  input: {
    color: "inherit",
    backgroundColor: "white",
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
  nav: {
    size: {
      small: {
        width: "15em",
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
    height: "20px",
  },
  input: {
    color: "lightgrey",
    backgroundColor: "#475062",
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
  nav: {
    size: {
      ...lightTheme.nav.size
    }
  }
};

export default Theme;
