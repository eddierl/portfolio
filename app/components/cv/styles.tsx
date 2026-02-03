import { StyleSheet } from "@react-pdf/renderer";
import { cvStyles } from "@/lib/cv-config";

export const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  leftColumn: {
    flex: 1,
    padding: cvStyles.spacing.pageMargin,
  },
  rightColumn: {
    width: cvStyles.spacing.sidebarWidth,
    backgroundColor: cvStyles.colors.darkSidebar,
    padding: cvStyles.spacing.pageMargin,
    paddingTop: 72,
    color: cvStyles.colors.white,
  },
  // Header
  header: {
    marginBottom: 4,
  },
  name: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  nameCapital: {
    fontSize: cvStyles.sizes.name,
    fontWeight: 700,
    fontFamily: "Oswald",
    color: cvStyles.colors.black,
  },
  nameRegular: {
    fontSize: cvStyles.sizes.name * 0.8,
    fontWeight: 700,
    fontFamily: "Oswald",
    color: cvStyles.colors.black,
    marginBottom: 2,
  },
  title: {
    fontSize: cvStyles.sizes.title,
    fontFamily: "Oswald",
    color: cvStyles.colors.gray,
    letterSpacing: 1.75,
    fontWeight: 700,
  },
  // Section headers
  sectionHeader: {
    fontSize: cvStyles.sizes.sectionHeader,
    fontWeight: 700,
    fontFamily: "Oswald",
    color: cvStyles.colors.black,
    marginTop: 2,
    marginBottom: 2,
  },
  sidebarSectionHeader: {
    fontSize: cvStyles.sizes.sidebarHeader,
    textTransform: "capitalize",
    fontWeight: 700,
    fontFamily: "Oswald",
    color: cvStyles.colors.white,
    marginTop: 12,
    marginBottom: 4,
  },
  // Profile/body text
  profileText: {
    fontSize: cvStyles.sizes.bodyText,
    fontFamily: "Lato",
    color: cvStyles.colors.black,
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: cvStyles.spacing.sectionGap,
  },
  // Job entry
  jobEntry: {
    marginBottom: cvStyles.spacing.jobGap,
    marginTop: cvStyles.spacing.jobGap,
  },
  jobTitle: {
    fontSize: cvStyles.sizes.jobTitle,
    fontWeight: 600,
    fontFamily: "Lato",
    color: cvStyles.colors.black,
    marginBottom: 2,
  },
  jobCompany: {
    fontSize: cvStyles.sizes.bodyText,
    fontWeight: 400,
    fontFamily: "Oswald",
    color: cvStyles.colors.black,
  },
  jobDateRange: {
    fontSize: cvStyles.sizes.dateText,
    fontFamily: "Oswald",
    color: cvStyles.colors.lightGray,
    letterSpacing: 1.75,
    fontWeight: 400,
    marginBottom: 1,
  },
  techStack: {
    fontSize: cvStyles.sizes.bodyText,
    fontFamily: "Oswald",
    color: cvStyles.colors.black,
    marginBottom: 1,
    fontWeight: 400,
  },
  // Bullets
  bulletList: {
    marginBottom: cvStyles.spacing.jobGap,
  },
  bulletContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 1,
    marginLeft: cvStyles.spacing.bulletIndent,
  },
  bulletPoint: {
    width: 0,
    fontSize: cvStyles.sizes.bodyText,
    fontFamily: "Lato",
    color: cvStyles.colors.black,
    marginRight: 10,
  },
  bulletItem: {
    flex: 1,
    fontSize: cvStyles.sizes.bodyText,
    fontFamily: "Lato",
    color: cvStyles.colors.black,
    lineHeight: 1.5,
  },
  // Sidebar
  sidebarText: {
    fontSize: cvStyles.sizes.sidebarText,
    fontFamily: "Lato",
    color: cvStyles.colors.white,
    lineHeight: 1.2,
    marginBottom: 2,
  },
  detailsText: {
    fontSize: cvStyles.sizes.sidebarText,
    fontFamily: "Lato",
    color: cvStyles.colors.white,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  linkText: {
    fontSize: cvStyles.sizes.sidebarText,
    fontFamily: "Lato",
    color: cvStyles.colors.white,
    lineHeight: 1.2,
    marginBottom: 4,
    textDecoration: "underline",
  },
  skillsGrid: {
    display: "flex",
    flexDirection: "column",
  },
  skillItem: {
    fontSize: cvStyles.sizes.sidebarText,
    fontFamily: "Lato",
    color: cvStyles.colors.white,
    marginBottom: 1,
  },
});
