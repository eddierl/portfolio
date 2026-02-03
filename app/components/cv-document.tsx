import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { cvContent, cvStyles } from "@/lib/cv-config";

Font.register({
  family: "Oswald",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUE.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUE.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Lato",

  fonts: [
    { src: "https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHvxk.ttf" },
    {
      src: "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh50Xew8.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  list: { display: "flex", flexDirection: "column" },
  listItem: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  text: { fontSize: 12, flex: 1 },
  /*

*/
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
    fontSize: cvStyles.sizes.name,
    fontWeight: 700,
    fontFamily: "Oswald",
    color: cvStyles.colors.black,
    marginBottom: 4,
  },
  title: {
    fontSize: cvStyles.sizes.title,
    fontFamily: "Oswald",
    color: cvStyles.colors.gray,
    letterSpacing: 1.5,
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
    lineHeight: 1.2,
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
    fontWeight: 400,
    fontFamily: "Oswald",
    color: cvStyles.colors.black,
    marginBottom: 0,
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
    letterSpacing: 0.5,
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
    lineHeight: 1.2,
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
  sidebarLabel: {
    fontSize: cvStyles.sizes.sidebarHeader,
    fontWeight: 700,
    fontFamily: "Oswald",
    color: cvStyles.colors.white,
    marginTop: cvStyles.spacing.sectionGap,
    marginBottom: 6,
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

function renderWithBold(text: string) {
  const parts = text.split(/(<b>.*?<\/b>)/g);

  return parts.map((part, i) => {
    const m = part.match(/^<b>(.*)<\/b>$/);
    if (m)
      return (
        <Text key={i} style={{ fontWeight: 700 }}>
          {m[1]}
        </Text>
      );
    return <Text key={i}>{part}</Text>;
  });
}

export function CVDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{cvContent.personal.name}</Text>
            <Text style={styles.title}>{cvContent.personal.title}</Text>
          </View>

          {/* Profile Section */}
          <View>
            <Text style={styles.sectionHeader}>Profile</Text>
            <Text style={styles.profileText}>
              {renderWithBold(cvContent.profile)}
            </Text>
          </View>

          {/* Education Section */}
          <View>
            <Text style={styles.sectionHeader}>Education</Text>
            {cvContent.education.map((edu, index) => (
              <View key={index} style={styles.jobEntry}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.jobDateRange}>{edu.dateRange}</Text>
              </View>
            ))}
          </View>

          {/* Employment History Section */}
          <View>
            <Text style={styles.sectionHeader}>Employment History</Text>
            {cvContent.employment.map((job, index) => (
              <View key={index} style={styles.jobEntry}>
                <Text style={styles.jobTitle}>
                  {[job.title, job.company].join(", ")}
                </Text>
                <Text style={styles.jobCompany}>{}</Text>
                <Text style={styles.jobDateRange}>{job.dateRange}</Text>
                <Text style={styles.techStack}>
                  Tech stack: {job.techStack}
                </Text>
                <View style={styles.bulletList}>
                  {job.achievements.map((achievement, achIndex) => (
                    <View key={achIndex} style={styles.bulletContainer}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletItem}>
                        {renderWithBold(achievement)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Right Sidebar */}
        <View style={styles.rightColumn}>
          {Object.entries(cvContent)
            .filter(([header]) =>
              ["details", "links", "skills", "languages"].includes(header),
            )
            .map(([header, content]) => {
              return (
                <View key={header}>
                  <Text style={styles.sidebarSectionHeader}>{header}</Text>
                  {Array.isArray(content) ? (
                    content.map((c) =>
                      typeof c === "object" && c !== null && "url" in c ? (
                        <Link
                          key={header + c.label}
                          src={c.url}
                          style={styles.linkText}
                        >
                          {c.label}
                        </Link>
                      ) : (
                        <Text
                          key={header + String(c)}
                          style={styles.detailsText}
                        >
                          {String(c)}
                        </Text>
                      ),
                    )
                  ) : Object.values(content) ? (
                    Object.values(content).map((c) => (
                      <Text key={String(c)} style={styles.detailsText}>
                        {String(c)}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.detailsText}>fds</Text>
                  )}
                </View>
              );
            })}
        </View>
      </Page>
    </Document>
  );
}
