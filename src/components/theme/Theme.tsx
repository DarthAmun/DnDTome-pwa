interface Theme {
  buttons: {
    color: string;
    backgroundColor: string;
    disabled: string;
    hoverColor: string;
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
  header: {
    backgroundColor: string;
    color: string;
    highlight: string;
  };
  tile: {
    backgroundColor: string;
    backgroundColorLink: string;
    color: string;
    headerColor: string;
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
    backgroundColor: "#F55C5C",
    disabled: "#E1D0E5",
    hoverColor: "darkgrey",
    height: "20px",
  },
  input: {
    color: "inherit",
    backgroundColor: "white",
  },
  main: {
    backgroundColor: "#F3F5F8",
    color: "",
    highlight: "#F55C5C",
  },
  header: {
    color: "white",
    backgroundColor: "#F55C5C",
    highlight: "#8000ff",
  },
  tile: {
    backgroundColor: "white",
    backgroundColorLink: "lightslategray",
    color: "darkgrey",
    headerColor: "black",
    boxShadow: "",
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
    color: "#fff",
    backgroundColor: "#F55C5C",
    disabled: "#E1D0E5",
    hoverColor: "#191D38",
    height: "20px",
  },
  input: {
    color: "lightgrey",
    backgroundColor: "#1A1F3B",
  },
  main: {
    backgroundColor: "#191D38",
    color: "",
    highlight: "#F55C5C",
  },
  header: {
    color: "white",
    backgroundColor: "#191D38",
    highlight: "#8000ff",
  },
  tile: {
    backgroundColor: "#272c4a",
    backgroundColorLink: "#E45D68",
    headerColor: "#CACBDB",
    color: "lightslategray",
    boxShadow: "",
  },
  nav: {
    size: {
      ...lightTheme.nav.size,
    },
  },
};

export default Theme;
