interface Theme {
  buttons: {
    color: string;
    backgroundColor: string;
    disabled: string;
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
    backgroundColorLink: string;
    color: string;
    boxShadow: string;
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
    };
  };
}

export const lightTheme: Theme = {
  buttons: {
    color: "white",
    backgroundColor: "#8000ff",
    disabled: "#E1D0E5",
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
    backgroundColorLink: "lightslategray",
    color: "darkgrey",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75);",
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
    disabled: "#E1D0E5",
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
    backgroundColorLink: "#8CA7DE",
    color: "lightslategray",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75);",
  },
  nav: {
    size: {
      ...lightTheme.nav.size,
    },
  },
};

export default Theme;
