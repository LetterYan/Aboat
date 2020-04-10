const primaryColor = "#000000";
// const primaryColor = "#900001";
// const secondaryColor = "#fff200";
const secondaryColor = "#ffffff";
const opacity = "75";

const Themes: any = {
  default: {
    primaryColor,
    fontColor: secondaryColor + opacity,
    bgColor: primaryColor,
    viewBgColor: primaryColor + opacity,
    boxShadow: "#00000015",
    active: {
      fontColor: secondaryColor,
      bgColor: primaryColor,
    },
  },
};

export default Themes;
