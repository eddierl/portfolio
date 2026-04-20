import { Document, Font, Link, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "@/app/components/cv/styles";
import { renderWithBold } from "@/app/components/cv/utils";
import { cvContent } from "@/lib/cv-config";

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

Font.registerHyphenationCallback((word) => [word]);

export function CVDocument() {
  return (
    <Document
      title="Senior Software Engineer"
      author="Eddie Erlich"
      subject="CV"
      keywords="Eddie Erlich Edward Erlich Senior Software Engineer Full Australian Working Rights Perth-based Remote-ready TypeScript React Go AI Agents MCP Playwright Microservices System Migrations"
      language="English"
    >
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.name}>
              {cvContent.personal.name
                .match(/[A-Z]|[^A-Z]+/g)
                ?.map((text, i) => {
                  return (
                    <Text
                      key={i}
                      style={
                        /[A-Z]+/.test(text)
                          ? styles.nameCapital
                          : styles.nameRegular
                      }
                    >
                      {text}
                    </Text>
                  );
                })}
            </View>
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
                  {job.title}, {job.company}
                </Text>
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
