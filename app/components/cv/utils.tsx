import { Text } from "@react-pdf/renderer";

/**
 * Parse text with <b>...</b> markers and render bold sections.
 * Example: "text with <b>bold</b> part" renders with "bold" in fontWeight 700.
 */
export function renderWithBold(text: string): any[] {
  return text.split(/(<b>.*?<\/b>)/g).map((part, i) => {
    const match = part.match(/^<b>(.*)<\/b>$/);
    if (match) {
      return (
        <Text key={i} style={{ fontWeight: 700 }}>
          {match[1]}
        </Text>
      );
    }
    return <Text key={i}>{part}</Text>;
  });
}
