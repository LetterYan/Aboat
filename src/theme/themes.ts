const primaryColor = "rgb(24, 144, 255)";

const Themes: any = {
  skyBlue: {
    primaryColor,
    fontColor: "rgba(0,0,0,0.65)",
    bgColor: "#ffffff",
    viewBgColor: "rgba(255,255,255,0.75)",
    headerBgColor: "rgba(255,255,255,0.75)",
    boxShadow: "#00000015",
    active: {
      fontColor: primaryColor,
      bgColor: "rgba(24, 144, 255,0.1)"
    }
  },
  darkMode: {
    primaryColor,
    fontColor: "rgba(255,255,255,.65)",
    bgColor: "#161819",
    headerBgColor: "rgba(0,0,0,0.4)",
    viewBgColor: "#2b2b2b",
    boxShadow: "#ffffff15",
    active: {
      fontColor: primaryColor,
      bgColor: "rgba(24, 144, 255,0.1)"
    }
  }
};

export default Themes;
