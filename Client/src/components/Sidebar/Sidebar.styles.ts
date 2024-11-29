import { colors } from './../../utils/colors';
import { CSSProperties } from "react";
export const styles: { [key: string]: CSSProperties } = {
  h1: {
    padding: "16px",
    textAlign: "center",
    color: "white",  // Changed the color to black for better contrast against light background
    backgroundColor: colors.seaBlue,  // Light gray background to match the sidebar
  }
};
