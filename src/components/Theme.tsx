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
  },
};

export default Theme;
